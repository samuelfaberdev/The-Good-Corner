import "reflect-metadata";
import "dotenv/config";
import { ApolloServer } from "@apollo/server";
import { buildSchema } from "type-graphql";
import { dataSource } from "./datasource";
import { AdResolver } from "./resolvers/Ads";
import { TagResolver } from "./resolvers/Tags";
import { CategoryResolver } from "./resolvers/Categories";
import { UserResolver } from "./resolvers/Users";
import { ContextType, customAuthChecker } from "./auth";
import { expressMiddleware } from "@apollo/server/express4";
import { ApolloServerPluginDrainHttpServer } from "@apollo/server/plugin/drainHttpServer";
import cors from "cors";
import express from "express";
import http from "http";

const port = 5000;

async function start() {
  const app = express();

  const httpServer = http.createServer(app);

  const schema = await buildSchema({
    resolvers: [AdResolver, TagResolver, CategoryResolver, UserResolver],
    authChecker: customAuthChecker,
  });

  const server = new ApolloServer<ContextType>({
    schema,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await dataSource.initialize();

  await server.start();

  app.use(
    "/",
    cors<cors.CorsRequest>({
      origin: process.env.FRONT_URL,
      credentials: true,
    }),
    express.json({ limit: "50mb" }),
    expressMiddleware(server, {
      context: async ({ req, res }) => ({
        req,
        res,
      }),
    })
  );

  await new Promise<void>((resolve) => httpServer.listen({ port }, resolve));
  console.log(`🚀🚀🚀 Server ready at http://localhost:${port}/ 🚀🚀🚀`);
  console.log(`Frontend is running at : ${process.env.FRONT_URL}`);
}

start();
