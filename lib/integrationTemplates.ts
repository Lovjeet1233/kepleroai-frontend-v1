import { ToolProperty } from '@/services/integration.service';

export interface IntegrationTemplate {
  tool_name: string;
  tool_type: string;
  description: string;
  properties: ToolProperty[];
  icon: string;
}

export const INTEGRATION_TEMPLATES: IntegrationTemplate[] = [
  {
    tool_name: 'send_email',
    tool_type: 'email',
    description: 'Send an email to recipients with optional CC and BCC',
    icon: '📧',
    properties: [
      {
        name: 'to',
        type: 'email',
        description: 'Recipient email address',
        required: true,
        value: '',
      },
      {
        name: 'cc',
        type: 'email',
        description: 'CC email address (optional)',
        required: false,
        value: '',
      },
      {
        name: 'subject',
        type: 'string',
        description: 'Email subject line',
        required: true,
        value: '',
      },
      {
        name: 'body',
        type: 'textarea',
        description: 'Email body content. You can use {{name}}, {{email}} to insert dynamic values',
        required: true,
        value: '',
      },
    ],
  },
  {
    tool_name: 'send_sms',
    tool_type: 'sms',
    description: 'Send an SMS message to a phone number',
    icon: '💬',
    properties: [
      {
        name: 'to',
        type: 'string',
        description: 'Recipient phone number (E.164 format)',
        required: true,
        value: '',
      },
      {
        name: 'message',
        type: 'textarea',
        description: 'SMS message content. You can use {{name}}, {{phone}} to insert dynamic values',
        required: true,
        value: '',
      },
    ],
  },
  {
    tool_name: 'webhook_post',
    tool_type: 'webhook',
    description: 'Send a POST request to a webhook URL',
    icon: '🪝',
    properties: [
      {
        name: 'url',
        type: 'url',
        description: 'Webhook endpoint URL',
        required: true,
        value: '',
      },
      {
        name: 'payload',
        type: 'textarea',
        description: 'JSON payload to send (e.g., {"event": "{{event}}", "data": "{{data}}"})',
        required: true,
        value: '{}',
      },
      {
        name: 'headers',
        type: 'textarea',
        description: 'Custom headers in JSON format (optional)',
        required: false,
        value: '{}',
      },
    ],
  },
  {
    tool_name: 'api_call',
    tool_type: 'api_call',
    description: 'Make a custom API call to an external service',
    icon: '🔌',
    properties: [
      {
        name: 'endpoint',
        type: 'url',
        description: 'API endpoint URL',
        required: true,
        value: '',
      },
      {
        name: 'method',
        type: 'string',
        description: 'HTTP method (GET, POST, PUT, DELETE)',
        required: true,
        value: 'POST',
      },
      {
        name: 'headers',
        type: 'textarea',
        description: 'Request headers in JSON format',
        required: false,
        value: '{"Content-Type": "application/json"}',
      },
      {
        name: 'body',
        type: 'textarea',
        description: 'Request body (for POST/PUT requests)',
        required: false,
        value: '',
      },
    ],
  },
  {
    tool_name: 'slack_notification',
    tool_type: 'notification',
    description: 'Send a notification to a Slack channel',
    icon: '🔔',
    properties: [
      {
        name: 'webhook_url',
        type: 'url',
        description: 'Slack webhook URL',
        required: true,
        value: '',
      },
      {
        name: 'channel',
        type: 'string',
        description: 'Slack channel name (e.g., #general)',
        required: false,
        value: '',
      },
      {
        name: 'message',
        type: 'textarea',
        description: 'Message to send. You can use {{variable}} for dynamic values',
        required: true,
        value: '',
      },
      {
        name: 'username',
        type: 'string',
        description: 'Bot username (optional)',
        required: false,
        value: 'KepleroAI Bot',
      },
    ],
  },
  {
    tool_name: 'database_insert',
    tool_type: 'database',
    description: 'Insert data into a database table',
    icon: '🗄️',
    properties: [
      {
        name: 'table',
        type: 'string',
        description: 'Database table name',
        required: true,
        value: '',
      },
      {
        name: 'data',
        type: 'textarea',
        description: 'Data to insert in JSON format',
        required: true,
        value: '{}',
      },
    ],
  },
];

/**
 * Get template by tool type
 */
export function getTemplateByType(toolType: string): IntegrationTemplate | undefined {
  return INTEGRATION_TEMPLATES.find(t => t.tool_type === toolType);
}

/**
 * Get template by tool name
 */
export function getTemplateByName(toolName: string): IntegrationTemplate | undefined {
  return INTEGRATION_TEMPLATES.find(t => t.tool_name === toolName);
}

