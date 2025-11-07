import Automation from '../models/Automation';
import AutomationExecution from '../models/AutomationExecution';
import { WhatsAppService } from './whatsapp.service';
import { AppError } from '../middleware/error.middleware';

interface TriggerHandler {
  validate(config: any, data: any): Promise<boolean>;
}

interface ActionHandler {
  execute(config: any, triggerData: any): Promise<any>;
}

export class AutomationEngine {
  private triggers: Map<string, TriggerHandler>;
  private actions: Map<string, ActionHandler>;
  private whatsappService: WhatsAppService;

  constructor() {
    this.triggers = new Map();
    this.actions = new Map();
    this.whatsappService = new WhatsAppService();
    
    this.registerHandlers();
  }

  private registerHandlers() {
    // Register trigger handlers
    this.triggers.set('facebook_lead', {
      validate: async (config, data) => {
        return data.pageId === config.pageId && data.formId === config.formId;
      }
    });

    this.triggers.set('shopify_order', {
      validate: async (config, data) => {
        return data.storeId === config.storeId;
      }
    });

    this.triggers.set('cart_abandoned', {
      validate: async (config, data) => {
        const abandonedMinutes = (Date.now() - data.abandonedAt) / (1000 * 60);
        return abandonedMinutes >= config.timeThreshold;
      }
    });

    this.triggers.set('webhook', {
      validate: async (config, data) => {
        return data.webhookId === config.webhookId;
      }
    });

    // Register action handlers
    this.actions.set('send_whatsapp', {
      execute: async (config, triggerData) => {
        const { templateId, delay, delayUnit } = config;
        const { phoneNumber, variables } = triggerData;

        if (delay && delay > 0) {
          await this.delay(delay, delayUnit);
        }

        const result = await this.whatsappService.sendTemplate(
          phoneNumber,
          templateId,
          'en',
          variables
        );

        return result;
      }
    });

    this.actions.set('send_email', {
      execute: async (config, triggerData) => {
        // TODO: Implement email sending
        return { sent: true, email: triggerData.email };
      }
    });

    this.actions.set('save_to_crm', {
      execute: async (config, triggerData) => {
        // TODO: Implement CRM integration
        return { saved: true };
      }
    });

    this.actions.set('add_tag', {
      execute: async (config, triggerData) => {
        const Customer = (await import('../models/Customer')).default;
        const contact = await Customer.findById(triggerData.contactId);
        if (contact) {
          contact.tags.push(config.tag);
          await contact.save();
          return { added: true, tag: config.tag };
        }
        return { added: false };
      }
    });

    this.actions.set('add_to_list', {
      execute: async (config, triggerData) => {
        const ContactListMember = (await import('../models/ContactListMember')).default;
        await ContactListMember.create({
          contactId: triggerData.contactId,
          listId: config.listId
        }).catch(() => {});
        return { added: true, listId: config.listId };
      }
    });
  }

  async executeAutomation(automationId: string, triggerData: any) {
    const automation = await Automation.findById(automationId);

    if (!automation || !automation.isActive) {
      throw new AppError(400, 'VALIDATION_ERROR', 'Automation not found or inactive');
    }

    const execution = await AutomationExecution.create({
      automationId,
      status: 'pending',
      triggerData
    });

    try {
      // Sort nodes by position
      const sortedNodes = automation.nodes.sort((a, b) => a.position - b.position);

      // Get trigger node
      const triggerNode = sortedNodes.find(n => n.type === 'trigger');
      if (!triggerNode) {
        throw new Error('No trigger node found');
      }

      // Validate trigger
      const triggerHandler = this.triggers.get(triggerNode.service);
      if (!triggerHandler) {
        throw new Error(`Trigger handler not found: ${triggerNode.service}`);
      }

      const isValid = await triggerHandler.validate(triggerNode.config, triggerData);
      if (!isValid) {
        execution.status = 'failed';
        execution.errorMessage = 'Trigger validation failed';
        await execution.save();
        return;
      }

      // Execute delay nodes and action nodes in sequence
      for (const node of sortedNodes) {
        if (node.type === 'delay') {
          await this.delay(node.config.delay, node.config.delayUnit);
        } else if (node.type === 'action') {
          const actionHandler = this.actions.get(node.service);
          if (!actionHandler) {
            throw new Error(`Action handler not found: ${node.service}`);
          }

          const actionResult = await actionHandler.execute(node.config, triggerData);
          execution.actionData = actionResult;
        }
      }

      // Update execution as success
      execution.status = 'success';
      await execution.save();

      // Update automation stats
      automation.executionCount += 1;
      automation.lastExecutedAt = new Date();
      await automation.save();

    } catch (error: any) {
      execution.status = 'failed';
      execution.errorMessage = error.message;
      await execution.save();
      throw error;
    }
  }

  private delay(amount: number, unit: string): Promise<void> {
    const multipliers: Record<string, number> = {
      minutes: 60 * 1000,
      hours: 60 * 60 * 1000,
      days: 24 * 60 * 60 * 1000
    };

    const ms = amount * (multipliers[unit] || 1000);
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async testAutomation(automationId: string, testData: any) {
    const automation = await Automation.findById(automationId);

    if (!automation) {
      throw new AppError(404, 'NOT_FOUND', 'Automation not found');
    }

    try {
      await this.executeAutomation(automationId, testData);
      return {
        testId: 'test_' + Date.now(),
        status: 'success',
        result: {
          triggered: true,
          actionExecuted: true,
          message: 'Test completed successfully'
        }
      };
    } catch (error: any) {
      return {
        testId: 'test_' + Date.now(),
        status: 'failed',
        result: {
          triggered: false,
          actionExecuted: false,
          message: error.message
        }
      };
    }
  }
}

export const automationEngine = new AutomationEngine();

