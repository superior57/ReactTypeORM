/**
 * @author jpcapelo
 * @email jhonnathanp27@gmail.com
 * @create date 2020-05-17 18:26:02
 * @modify date 2020-05-17 18:26:02
 * @desc [description]
 */
import { gql } from "apollo-server-express";

export const typeDefs = gql`
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