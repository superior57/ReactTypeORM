"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const typeorm_1 = require("typeorm");
const express_1 = __importDefault(require("express"));
const helmet_1 = __importDefault(require("helmet"));
const apollo_server_express_1 = require("apollo-server-express");
const typeDefs_1 = require("./typeDefs/typeDefs");
const resolvers_1 = require("./resolvers/resolvers");
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const index_routes_1 = __importDefault(require("./routes/index.routes"));
const startServer = () => __awaiter(this, void 0, void 0, function* () {
    const server = new apollo_server_express_1.ApolloServer({ typeDefs: typeDefs_1.typeDefs, resolvers: resolvers_1.resolvers });
    yield typeorm_1.createConnection();
    const app = express_1.default();
    server.applyMiddleware({ app });
    app.use(cors_1.default());
    app.use(helmet_1.default());
    app.use(morgan_1.default("dev"));
    app.use(express_1.default.json());
    app.use("/", index_routes_1.default);
    app.listen({
        port: 4000
    }, () => console.log(`🚀 Server ready at http://localhost:4000/${server.graphqlPath}`));
});
startServer();
//# sourceMappingURL=index.js.map