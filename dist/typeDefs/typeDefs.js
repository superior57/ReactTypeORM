"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const apollo_server_express_1 = require("apollo-server-express");
exports.typeDefs = apollo_server_express_1.gql `
  type Query {
    getUser(id: Int!): User
  }
  type Mutation {
    addUser(username: String!, lastName: String, age: Int!): Boolean!
  }
  type User {
    id: Int!
    username: String!
    lastName: String!
    age: Int!
  }
`;
//# sourceMappingURL=typeDefs.js.map