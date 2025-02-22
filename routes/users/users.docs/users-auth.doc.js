const { OK } = require("../../../constants/http-codes");

module.exports = {
  "/users/signup": {
    post: {
      summary: "Creates a new user",
      description: "Creates a new user with login and password",
      tags: ["Users"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                login: {
                  type: "string",
                  description: "User login (username)",
                  example: "rick.grimes",
                },
                password: {
                  type: "string",
                  description: "User password",
                  example: "password123",
                  minLength: 6,
                  maxLength: 20,
                },
              },
              required: ["login", "password"], // Marking login and password as required
            },
          },
        },
      },
      responses: {
        [OK]: {
          description: "Success message",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    description: "Success message",
                    example: "signup success",
                  }
                },
              },
            },
          },
        },
      },
    },
  },

  "/users/login": {
    post: {
      summary: "User login",
      description: "Authorizes user and saves Bearer token in headers",
      tags: ["Users"],
      requestBody: {
        required: true,
        content: {
          "application/json": {
            schema: {
              type: "object",
              properties: {
                login: {
                  type: "string",
                  description: "User login (username)",
                  example: "rick.grimes",
                },
                password: {
                  type: "string",
                  description: "User password",
                  example: "password123",
                  minLength: 6,
                  maxLength: 20,
                },
              },
              required: ["login", "password"], // Marking login and password as required
            },
          },
        },
      },
      responses: {
        [OK]: {
          description: "Success message",
          content: {
            "application/json": {
              schema: {
                type: "object",
                properties: {
                  message: {
                    type: "string",
                    description: "Success message",
                    example: "login success",
                  }
                },
              },
            },
          },
        },
      },
    },
  },
};