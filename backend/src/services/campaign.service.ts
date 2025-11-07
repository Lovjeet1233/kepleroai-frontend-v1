import Campaign from '../models/Campaign';
import CampaignRecipient from '../models/CampaignRecipient';
import ContactListMember from '../models/ContactListMember';
import Customer from '../models/Customer';
import { AppError } from '../middleware/error.middleware';
import { campaignQueue } from '../queues/campaign.queue';

export class CampaignService {
  async findAll(filters: any = {}, page = 1, limit = 20) {
    const query: any = {};

    if (filters.status) {
      query.status = filters.status;
    }

    const skip = (page - 1) * limit;
    const total = await Campaign.countDocuments(query);

    const campaigns = await Campaign.find(query)
      .populate('listId', 'name')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .lean();

    // Get stats for each campaign
    const campaignsWithStats = await Promise.all(
      campaigns.map(async (campaign: any) => {
        const stats = await this.getCampaignStats(campaign._id);
        return {
          ...campaign,
          stats
        };
      })
    );

    return {
      items: campaignsWithStats,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasNext: page * limit < total,
        hasPrev: page > 1
      }
    };
  }

  async findById(campaignId: string) {
    const campaign = await Campaign.findById(campaignId)
      .populate('listId', 'name')
      .lean();

    if (!campaign) {
      throw new AppError(404, 'NOT_FOUND', 'Campaign not found');
    }

    const stats = await this.getCampaignStats(campaignId);

    return {
      ...campaign,
      stats
    };
  }

  async create(campaignData: any) {
    const campaign = await Campaign.create({
      ...campaignData,
      status: campaignData.scheduledAt ? 'scheduled' : 'draft'
    });

    // Schedule campaign if scheduledAt is provided
    if (campaignData.scheduledAt) {
      await this.scheduleCampaign((campaign._id as any).toString(), campaignData.scheduledAt);
    }

    return campaign;
  }

  async update(campaignId: string, campaignData: any) {
    const campaign = await Campaign.findById(campaignId);

    if (!campaign) {
      throw new AppError(404, 'NOT_FOUND', 'Campaign not found');
    }

    // Can only update draft or scheduled campaigns
    if (!['draft', 'scheduled'].includes(campaign.status)) {
      throw new AppError(400, 'VALIDATION_ERROR', 'Cannot update campaign in current status');
    }

    Object.assign(campaign, campaignData);
    await campaign.save();

    return campaign;
  }

  async delete(campaignId: string) {
    const campaign = await Campaign.findById(campaignId);

    if (!campaign) {
      throw new AppError(404, 'NOT_FOUND', 'Campaign not found');
    }

    // Can only delete draft campaigns
    if (campaign.status !== 'draft') {
      throw new AppError(400, 'VALIDATION_ERROR', 'Can only delete draft campaigns');
    }

    await campaign.deleteOne();
    await CampaignRecipient.deleteMany({ campaignId });

    return { message: 'Campaign deleted successfully' };
  }

  async cancel(campaignId: string) {
    const campaign = await Campaign.findById(campaignId);

    if (!campaign) {
      throw new AppError(404, 'NOT_FOUND', 'Campaign not found');
    }

    if (campaign.status !== 'scheduled') {
      throw new AppError(400, 'VALIDATION_ERROR', 'Can only cancel scheduled campaigns');
    }

    campaign.status = 'cancelled';
    campaign.cancelledAt = new Date();
    await campaign.save();

    // Remove from queue
    // TODO: Implement queue job removal by searching for job with campaignId

    return campaign;
  }

  async getAnalytics(campaignId: string) {
    const campaign = await Campaign.findById(campaignId);

    if (!campaign) {
      throw new AppError(404, 'NOT_FOUND', 'Campaign not found');
    }

    const recipients = await CampaignRecipient.find({ campaignId }).lean();

    const stats = {
      sent: recipients.filter(r => r.status !== 'pending' && r.status !== 'failed').length,
      delivered: recipients.filter(r => r.deliveredAt).length,
      failed: recipients.filter(r => r.status === 'failed').length,
      opened: recipients.filter(r => r.openedAt).length,
      clicked: recipients.filter(r => r.clickedAt).length,
      replied: recipients.filter(r => r.repliedAt).length,
      openRate: 0,
      clickRate: 0,
      replyRate: 0
    };

    if (stats.delivered > 0) {
      stats.openRate = (stats.opened / stats.delivered) * 100;
      stats.clickRate = (stats.clicked / stats.delivered) * 100;
      stats.replyRate = (stats.replied / stats.delivered) * 100;
    }

    // Get timeline
    const timeline = await CampaignRecipient.aggregate([
      { $match: { campaignId: campaign._id } },
      {
        $group: {
          _id: {
            $dateToString: {
              format: '%Y-%m-%d %H:00',
              date: '$sentAt'
            }
          },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    return {
      campaignId,
      stats,
      timeline
    };
  }

  private async getCampaignStats(campaignId: any) {
    const recipients = await CampaignRecipient.find({ campaignId }).lean();

    return {
      sent: recipients.filter(r => r.status !== 'pending' && r.status !== 'failed').length,
      delivered: recipients.filter(r => r.deliveredAt).length,
      failed: recipients.filter(r => r.status === 'failed').length,
      opened: recipients.filter(r => r.openedAt).length,
      clicked: recipients.filter(r => r.clickedAt).length,
      replied: recipients.filter(r => r.repliedAt).length
    };
  }

  private async scheduleCampaign(campaignId: string, scheduledAt: Date) {
    if (!campaignQueue) {
      throw new AppError(503, 'SERVICE_UNAVAILABLE', 'Campaign queue is not available. Redis must be running to schedule campaigns.');
    }

    const delay = scheduledAt.getTime() - Date.now();

    if (delay <= 0) {
      // Send immediately
      await campaignQueue.add('send-campaign', { campaignId });
    } else {
      // Schedule for later
      await campaignQueue.add('send-campaign', { campaignId }, { delay });
    }
  }

  async getTemplates() {
    // Return mock templates or fetch from WhatsApp API
    return [
      {
        id: 'template_1',
        name: 'order_confirmation',
        language: 'en',
        status: 'approved',
        category: 'transactional',
        components: [
          {
            type: 'HEADER',
            format: 'TEXT',
            text: 'Order Confirmation'
          },
          {
            type: 'BODY',
            text: 'Hi {{1}}, your order {{2}} has been confirmed.'
          }
        ],
        variables: ['customer_name', 'order_number']
      },
      {
        id: 'template_2',
        name: 'welcome_message',
        language: 'en',
        status: 'approved',
        category: 'marketing',
        components: [
          {
            type: 'HEADER',
            format: 'TEXT',
            text: 'Welcome!'
          },
          {
            type: 'BODY',
            text: 'Hi {{1}}, welcome to our platform. We are excited to have you!'
          }
        ],
        variables: ['customer_name']
      },
      {
        id: 'template_3',
        name: 'promotional_offer',
        language: 'en',
        status: 'approved',
        category: 'marketing',
        components: [
          {
            type: 'HEADER',
            format: 'TEXT',
            text: 'Special Offer!'
          },
          {
            type: 'BODY',
            text: 'Hi {{1}}, get {{2}}% off on your next purchase. Valid until {{3}}.'
          }
        ],
        variables: ['customer_name', 'discount_percentage', 'expiry_date']
      }
    ];
  }
}

export const campaignService = new CampaignService();

