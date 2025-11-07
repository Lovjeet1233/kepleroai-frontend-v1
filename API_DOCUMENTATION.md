# API Documentation

Base URL: `http://localhost:5001/api/v1`

---

## Authentication

### POST /auth/login
```json
// Request
{
  "email": "admin@test.com",
  "password": "admin123"
}

// Response (201)
{
  "success": true,
  "message": "Login successful",
  "data": {
    "user": {
      "id": "507f1f77bcf86cd799439011",
      "email": "admin@test.com",
      "name": "Admin User",
      "role": "admin",
      "organizationId": "507f1f77bcf86cd799439012",
      "status": "active",
      "createdAt": "2024-01-01T00:00:00.000Z"
    },
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  },
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### POST /auth/refresh
```json
// Request
{
  "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}

// Response (200)
{
  "success": true,
  "data": {
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
    "refreshToken": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
  }
}
```

### POST /auth/logout
```json
// Request
Headers: { "Authorization": "Bearer <token>" }

// Response (200)
{
  "success": true,
  "message": "Logged out successfully"
}
```

### GET /auth/me
```json
// Request
Headers: { "Authorization": "Bearer <token>" }

// Response (200)
{
  "success": true,
  "data": {
    "id": "507f1f77bcf86cd799439011",
    "email": "admin@test.com",
    "name": "Admin User",
    "role": "admin",
    "organizationId": "507f1f77bcf86cd799439012",
    "status": "active",
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

---

## Contacts

### GET /contacts
```json
// Request
Query: {
  "page": 1,
  "limit": 20,
  "search": "john",
  "listId": "507f1f77bcf86cd799439011",
  "tags": "vip,customer"
}
Headers: { "Authorization": "Bearer <token>" }

// Response (200)
{
  "success": true,
  "data": {
    "items": [
      {
        "_id": "507f1f77bcf86cd799439011",
        "name": "John Doe",
        "email": "john@example.com",
        "phone": "+1234567890",
        "tags": ["vip", "customer"],
        "customProperties": {},
        "lists": [],
        "conversationsCount": 5,
        "createdAt": "2024-01-01T00:00:00.000Z",
        "updatedAt": "2024-01-01T00:00:00.000Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 100,
      "totalPages": 5,
      "hasNext": true,
      "hasPrev": false
    }
  }
}
```

### GET /contacts/:contactId
```json
// Request
Headers: { "Authorization": "Bearer <token>" }

// Response (200)
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "tags": ["vip"],
    "customProperties": {},
    "lists": [],
    "conversationsCount": 5,
    "lastConversation": {
      "id": "507f1f77bcf86cd799439012",
      "date": "2024-01-01T00:00:00.000Z",
      "status": "active"
    },
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### POST /contacts
```json
// Request
Headers: { "Authorization": "Bearer <token>" }
{
  "name": "John Doe",
  "email": "john@example.com",
  "phone": "+1234567890",
  "tags": ["vip"],
  "customProperties": {},
  "lists": ["507f1f77bcf86cd799439011"]
}

// Response (201)
{
  "success": true,
  "message": "Contact created",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Doe",
    "email": "john@example.com",
    "phone": "+1234567890",
    "tags": ["vip"],
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### PATCH /contacts/:contactId
```json
// Request
Headers: { "Authorization": "Bearer <token>" }
{
  "name": "John Smith",
  "tags": ["vip", "premium"]
}

// Response (200)
{
  "success": true,
  "message": "Contact updated",
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "name": "John Smith",
    "email": "john@example.com",
    "tags": ["vip", "premium"],
    "updatedAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### DELETE /contacts/:contactId
```json
// Request
Headers: { "Authorization": "Bearer <token>" }

// Response (200)
{
  "success": true,
  "message": "Contact deleted"
}
```

### POST /contacts/bulk-delete
```json
// Request
Headers: { "Authorization": "Bearer <token>" }
{
  "contactIds": ["507f1f77bcf86cd799439011", "507f1f77bcf86cd799439012"]
}

// Response (200)
{
  "success": true,
  "message": "Contacts deleted",
  "data": {
    "deletedCount": 2
  }
}
```

### GET /contacts/lists/all
```json
// Request
Headers: { "Authorization": "Bearer <token>" }

// Response (200)
{
  "success": true,
  "data": {
    "lists": [
      {
        "id": "507f1f77bcf86cd799439011",
        "name": "VIP Customers",
        "description": "High value customers",
        "contactCount": 45,
        "createdAt": "2024-01-01T00:00:00.000Z"
      }
    ]
  }
}
```

### POST /contacts/lists
```json
// Request
Headers: { "Authorization": "Bearer <token>" }
{
  "name": "VIP Customers",
  "description": "High value customers"
}

// Response (201)
{
  "success": true,
  "data": {
    "list": {
      "id": "507f1f77bcf86cd799439011",
      "name": "VIP Customers",
      "description": "High value customers",
      "contactCount": 0,
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  }
}
```

### POST /contacts/lists/:listId/import
```json
// Request
Headers: { 
  "Authorization": "Bearer <token>",
  "Content-Type": "multipart/form-data"
}
FormData: {
  "file": <CSV File>
}

// Response (200)
{
  "success": true,
  "message": "Contacts imported",
  "data": {
    "imported": 50,
    "failed": 2,
    "errors": []
  }
}
```

### GET /contacts/custom-properties/all
```json
// Request
Headers: { "Authorization": "Bearer <token>" }

// Response (200)
{
  "success": true,
  "data": {
    "properties": [
      {
        "id": "507f1f77bcf86cd799439011",
        "name": "Company Size",
        "type": "select",
        "options": ["1-10", "11-50", "51-200", "200+"]
      }
    ]
  }
}
```

---

## Knowledge Base

### GET /training/knowledge-bases
```json
// Request
Headers: { "Authorization": "Bearer <token>" }

// Response (200)
{
  "success": true,
  "data": {
    "knowledgeBases": [
      {
        "_id": "507f1f77bcf86cd799439011",
        "name": "Customer Support KB",
        "faqCount": 25,
        "websiteCount": 3,
        "fileCount": 10,
        "createdAt": "2024-01-01T00:00:00.000Z"
      }
    ]
  }
}
```

### POST /training/knowledge-bases
```json
// Request
Headers: { "Authorization": "Bearer <token>" }
{
  "name": "Product Knowledge Base",
  "description": "Product documentation and FAQs"
}

// Response (201)
{
  "success": true,
  "data": {
    "knowledgeBase": {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Product Knowledge Base",
      "description": "Product documentation and FAQs",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  }
}
```

### GET /training/knowledge-bases/:kbId/faqs
```json
// Request
Headers: { "Authorization": "Bearer <token>" }

// Response (200)
{
  "success": true,
  "data": {
    "faqs": [
      {
        "_id": "507f1f77bcf86cd799439011",
        "question": "What are your business hours?",
        "answer": "We are open 9 AM to 5 PM EST",
        "category": "General",
        "tags": ["hours", "support"],
        "createdAt": "2024-01-01T00:00:00.000Z"
      }
    ]
  }
}
```

### POST /training/knowledge-bases/:kbId/faqs
```json
// Request
Headers: { "Authorization": "Bearer <token>" }
{
  "question": "How do I reset my password?",
  "answer": "Click on 'Forgot Password' on the login page",
  "category": "Account",
  "tags": ["password", "account"]
}

// Response (201)
{
  "success": true,
  "message": "FAQ created",
  "data": {
    "faq": {
      "_id": "507f1f77bcf86cd799439011",
      "question": "How do I reset my password?",
      "answer": "Click on 'Forgot Password' on the login page",
      "category": "Account",
      "tags": ["password", "account"],
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  }
}
```

### PATCH /training/knowledge-bases/:kbId/faqs/:faqId
```json
// Request
Headers: { "Authorization": "Bearer <token>" }
{
  "question": "How do I reset my password?",
  "answer": "Click 'Forgot Password' and check your email"
}

// Response (200)
{
  "success": true,
  "message": "FAQ updated",
  "data": {
    "faq": {
      "_id": "507f1f77bcf86cd799439011",
      "question": "How do I reset my password?",
      "answer": "Click 'Forgot Password' and check your email",
      "updatedAt": "2024-01-01T00:00:00.000Z"
    }
  }
}
```

### DELETE /training/knowledge-bases/:kbId/faqs/:faqId
```json
// Request
Headers: { "Authorization": "Bearer <token>" }

// Response (200)
{
  "success": true,
  "message": "FAQ deleted"
}
```

### GET /training/knowledge-bases/:kbId/websites
```json
// Request
Headers: { "Authorization": "Bearer <token>" }

// Response (200)
{
  "success": true,
  "data": {
    "websites": [
      {
        "_id": "507f1f77bcf86cd799439011",
        "domain": "example.com",
        "pages": [
          {
            "url": "https://example.com/about",
            "title": "About Us",
            "content": "...",
            "status": "scraped"
          }
        ],
        "pagesCount": 10,
        "createdAt": "2024-01-01T00:00:00.000Z"
      }
    ]
  }
}
```

### POST /training/knowledge-bases/:kbId/websites
```json
// Request
Headers: { "Authorization": "Bearer <token>" }
{
  "url": "https://example.com",
  "maxPages": 50
}

// Response (201)
{
  "success": true,
  "message": "Website added",
  "data": {
    "website": {
      "_id": "507f1f77bcf86cd799439011",
      "domain": "example.com",
      "pagesCount": 0,
      "status": "pending",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  }
}
```

### DELETE /training/knowledge-bases/:kbId/websites/:websiteId
```json
// Request
Headers: { "Authorization": "Bearer <token>" }

// Response (200)
{
  "success": true,
  "message": "Website deleted"
}
```

### GET /training/knowledge-bases/:kbId/files
```json
// Request
Headers: { "Authorization": "Bearer <token>" }

// Response (200)
{
  "success": true,
  "data": {
    "files": [
      {
        "_id": "507f1f77bcf86cd799439011",
        "name": "product-guide.pdf",
        "size": 1048576,
        "type": "application/pdf",
        "url": "https://s3.amazonaws.com/...",
        "status": "processed",
        "createdAt": "2024-01-01T00:00:00.000Z"
      }
    ]
  }
}
```

### POST /training/knowledge-bases/:kbId/files
```json
// Request
Headers: { 
  "Authorization": "Bearer <token>",
  "Content-Type": "multipart/form-data"
}
FormData: {
  "file": <File>
}

// Response (201)
{
  "success": true,
  "message": "File uploaded",
  "data": {
    "file": {
      "_id": "507f1f77bcf86cd799439011",
      "name": "product-guide.pdf",
      "size": 1048576,
      "type": "application/pdf",
      "status": "processing",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  }
}
```

### DELETE /training/knowledge-bases/:kbId/files/:fileId
```json
// Request
Headers: { "Authorization": "Bearer <token>" }

// Response (200)
{
  "success": true,
  "message": "File deleted"
}
```

---

## Prompts

### GET /training/prompts/:type
```json
// Request
Params: { "type": "chatbot" | "voice" }
Headers: { "Authorization": "Bearer <token>" }

// Response (200)
{
  "success": true,
  "data": {
    "prompt": {
      "_id": "507f1f77bcf86cd799439011",
      "type": "chatbot",
      "userInstructions": "Be helpful and friendly",
      "systemPrompt": "You are a helpful assistant...",
      "version": 3,
      "createdAt": "2024-01-01T00:00:00.000Z",
      "previousVersions": []
    }
  }
}
```

### PATCH /training/prompts/:type
```json
// Request
Params: { "type": "chatbot" | "voice" }
Headers: { "Authorization": "Bearer <token>" }
{
  "userInstructions": "Be helpful, friendly, and concise"
}

// Response (200)
{
  "success": true,
  "message": "Prompt updated",
  "data": {
    "prompt": {
      "_id": "507f1f77bcf86cd799439012",
      "type": "chatbot",
      "userInstructions": "Be helpful, friendly, and concise",
      "systemPrompt": "You are a helpful assistant...",
      "version": 4,
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  }
}
```

### POST /training/prompts/:type/revert
```json
// Request
Params: { "type": "chatbot" | "voice" }
Headers: { "Authorization": "Bearer <token>" }
{
  "version": 2
}

// Response (200)
{
  "success": true,
  "message": "Prompt reverted",
  "data": {
    "prompt": {
      "_id": "507f1f77bcf86cd799439013",
      "type": "chatbot",
      "userInstructions": "Be helpful and friendly",
      "systemPrompt": "You are a helpful assistant...",
      "version": 5,
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  }
}
```

---

## Conversations

### GET /conversations
```json
// Request
Query: {
  "page": 1,
  "limit": 20,
  "status": "active",
  "folderId": "507f1f77bcf86cd799439011"
}
Headers: { "Authorization": "Bearer <token>" }

// Response (200)
{
  "success": true,
  "data": {
    "items": [
      {
        "_id": "507f1f77bcf86cd799439011",
        "customerId": "507f1f77bcf86cd799439012",
        "status": "active",
        "channel": "whatsapp",
        "lastMessage": "Hello, how can I help?",
        "unreadCount": 2,
        "assignedTo": null,
        "labels": [],
        "createdAt": "2024-01-01T00:00:00.000Z",
        "updatedAt": "2024-01-01T00:00:00.000Z"
      }
    ],
    "pagination": {
      "page": 1,
      "limit": 20,
      "total": 50,
      "totalPages": 3,
      "hasNext": true,
      "hasPrev": false
    }
  }
}
```

### GET /conversations/:conversationId
```json
// Request
Headers: { "Authorization": "Bearer <token>" }

// Response (200)
{
  "success": true,
  "data": {
    "_id": "507f1f77bcf86cd799439011",
    "customerId": "507f1f77bcf86cd799439012",
    "status": "active",
    "channel": "whatsapp",
    "messages": [
      {
        "_id": "507f1f77bcf86cd799439013",
        "sender": "customer",
        "content": "Hello",
        "timestamp": "2024-01-01T00:00:00.000Z"
      }
    ],
    "createdAt": "2024-01-01T00:00:00.000Z"
  }
}
```

### POST /conversations/:conversationId/messages
```json
// Request
Headers: { "Authorization": "Bearer <token>" }
{
  "content": "How can I help you?",
  "sender": "agent"
}

// Response (201)
{
  "success": true,
  "data": {
    "message": {
      "_id": "507f1f77bcf86cd799439013",
      "conversationId": "507f1f77bcf86cd799439011",
      "content": "How can I help you?",
      "sender": "agent",
      "timestamp": "2024-01-01T00:00:00.000Z"
    }
  }
}
```

---

## Campaigns

### GET /campaigns
```json
// Request
Headers: { "Authorization": "Bearer <token>" }

// Response (200)
{
  "success": true,
  "data": {
    "campaigns": [
      {
        "_id": "507f1f77bcf86cd799439011",
        "name": "Summer Sale",
        "type": "broadcast",
        "status": "scheduled",
        "channel": "whatsapp",
        "scheduledAt": "2024-06-01T09:00:00.000Z",
        "targetListId": "507f1f77bcf86cd799439012",
        "message": "Check out our summer sale!",
        "stats": {
          "sent": 0,
          "delivered": 0,
          "read": 0,
          "replied": 0
        },
        "createdAt": "2024-01-01T00:00:00.000Z"
      }
    ]
  }
}
```

### POST /campaigns
```json
// Request
Headers: { "Authorization": "Bearer <token>" }
{
  "name": "Summer Sale",
  "type": "broadcast",
  "channel": "whatsapp",
  "scheduledAt": "2024-06-01T09:00:00.000Z",
  "targetListId": "507f1f77bcf86cd799439012",
  "message": "Check out our summer sale!"
}

// Response (201)
{
  "success": true,
  "message": "Campaign created",
  "data": {
    "campaign": {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Summer Sale",
      "status": "scheduled",
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  }
}
```

---

## Automations

### GET /automations
```json
// Request
Headers: { "Authorization": "Bearer <token>" }

// Response (200)
{
  "success": true,
  "data": {
    "automations": [
      {
        "_id": "507f1f77bcf86cd799439011",
        "name": "Welcome Message",
        "trigger": {
          "type": "new_conversation",
          "conditions": []
        },
        "actions": [
          {
            "type": "send_message",
            "data": {
              "message": "Welcome! How can I help you?"
            }
          }
        ],
        "isActive": true,
        "createdAt": "2024-01-01T00:00:00.000Z"
      }
    ]
  }
}
```

### POST /automations
```json
// Request
Headers: { "Authorization": "Bearer <token>" }
{
  "name": "Welcome Message",
  "trigger": {
    "type": "new_conversation",
    "conditions": []
  },
  "actions": [
    {
      "type": "send_message",
      "data": {
        "message": "Welcome! How can I help you?"
      }
    }
  ],
  "isActive": true
}

// Response (201)
{
  "success": true,
  "message": "Automation created",
  "data": {
    "automation": {
      "_id": "507f1f77bcf86cd799439011",
      "name": "Welcome Message",
      "isActive": true,
      "createdAt": "2024-01-01T00:00:00.000Z"
    }
  }
}
```

---

## Analytics

### GET /analytics/dashboard
```json
// Request
Query: {
  "startDate": "2024-01-01",
  "endDate": "2024-01-31"
}
Headers: { "Authorization": "Bearer <token>" }

// Response (200)
{
  "success": true,
  "data": {
    "totalConversations": 1250,
    "activeConversations": 45,
    "avgResponseTime": 120,
    "satisfactionRate": 4.5,
    "conversationsByChannel": {
      "whatsapp": 800,
      "messenger": 300,
      "webchat": 150
    },
    "conversationsByDay": [
      {
        "date": "2024-01-01",
        "count": 45
      }
    ]
  }
}
```

---

## Error Responses

### 400 Bad Request
```json
{
  "success": false,
  "error": {
    "code": "VALIDATION_ERROR",
    "message": "Invalid input data",
    "details": {
      "email": "Invalid email format"
    }
  },
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### 401 Unauthorized
```json
{
  "success": false,
  "error": {
    "code": "UNAUTHORIZED",
    "message": "Invalid or expired token"
  },
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### 404 Not Found
```json
{
  "success": false,
  "error": {
    "code": "NOT_FOUND",
    "message": "Resource not found"
  },
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### 409 Conflict
```json
{
  "success": false,
  "error": {
    "code": "DUPLICATE",
    "message": "Contact with this email already exists"
  },
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

### 500 Internal Server Error
```json
{
  "success": false,
  "error": {
    "code": "INTERNAL_ERROR",
    "message": "An unexpected error occurred"
  },
  "timestamp": "2024-01-01T00:00:00.000Z"
}
```

