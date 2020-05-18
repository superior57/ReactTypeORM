/**
 * @author jpcapelo
 * @email jhonnathanp27@gmail.com
 * @create date 2020-05-17 18:26:40
 * @modify date 2020-05-17 18:26:40
 * @desc [description]
 */
// import "reflect-metadata";
// import {createConnection} from "typeorm";
// import {User} from "./entity/User";

// createConnection().then(async connection => {

//     console.log("Inserting a new user into the database...");
//     const user = new User();
//     user.firstName = "Timber";
//     user.lastName = "Saw";
//     user.age = 25;
//     await connection.manager.save(user);
//     console.log("Saved a new user with id: " + user.id);

//     console.log("Loading users from the database...");
//     const users = await connection.manager.find(User);
//     console.log("Loaded users: ", users);

//     console.log("Here you can setup and run express/koa/any other framework.");

// }).catch(error => console.log(error));

import 'reflect-metadata';
import { createConnection } from 'typeorm';
import express from 'express';
import helmet from 'helmet';
import { ApolloServer } from 'apollo-server-express';

import { typeDefs } from './typeDefs/typeDefs';
import { resolvers } from './resolvers/resolvers';
import morgan from 'morgan';
import cors from 'cors';
import misRutas from './routes/index.routes';

const startServer = async () => {
  const server = new ApolloServer({ typeDefs, resolvers });
  await createConnection();

  const app = express();

  //midlewars
  server.applyMiddleware({ app });
  app.use(cors());
  app.use(helmet());
  app.use(morgan('dev'));
  app.use(express.json());

  // routes
  app.use('/', misRutas);

  app.listen(
    {
      port: 4000,
    },
    () => console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
  );
};

startServer();
