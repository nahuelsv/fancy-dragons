export default {
    type: "object",
    properties: {
        "email_address": { type: 'string' },
        "password": { type: 'string' }
    },
    required: ["email_address", "password"]
  } as const;