import mongoose, { Schema, Document } from 'mongoose';

export interface IFollowUp {
  templateId: string;
  condition: 'if_no_response' | 'always';
  delay: number;
  delayUnit: 'minutes' | 'hours' | 'days' | 'weeks' | 'months';
  order: number;
}

export interface ICampaign extends Document {
  name: string;
  listId: mongoose.Types.ObjectId;
  templateId: string;
  templateVariables: Record<string, string>;
  status: 'draft' | 'scheduled' | 'sending' | 'sent' | 'failed' | 'cancelled';
  scheduledAt?: Date;
  sentAt?: Date;
  cancelledAt?: Date;
  followUps: IFollowUp[];
  createdAt: Date;
  updatedAt: Date;
}

const CampaignSchema = new Schema<ICampaign>({
  name: {
    type: String,
    required: true
  },
  listId: {
    type: Schema.Types.ObjectId,
    ref: 'ContactList',
    required: true
  },
  templateId: {
    type: String,
    required: true
  },
  templateVariables: {
    type: Map,
    of: String,
    default: {}
  },
  status: {
    type: String,
    enum: ['draft', 'scheduled', 'sending', 'sent', 'failed', 'cancelled'],
    default: 'draft'
  },
  scheduledAt: Date,
  sentAt: Date,
  cancelledAt: Date,
  followUps: [{
    templateId: { type: String, required: true },
    condition: {
      type: String,
      enum: ['if_no_response', 'always'],
      required: true
    },
    delay: { type: Number, required: true },
    delayUnit: {
      type: String,
      enum: ['minutes', 'hours', 'days', 'weeks', 'months'],
      required: true
    },
    order: { type: Number, required: true }
  }]
}, { timestamps: true });

CampaignSchema.index({ status: 1 });
CampaignSchema.index({ scheduledAt: 1 });

export default mongoose.model<ICampaign>('Campaign', CampaignSchema);

