import "reflect-metadata";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { buildSchema } from "type-graphql";
import { AdResolver } from "./resolvers/Ads";
import { dataSource } from "./datasource";

const port = 5000;

async function start() {
  const schema = await buildSchema({
    resolvers: [AdResolver],
  });

  const server = new ApolloServer({ schema });

  await dataSource.initialize();

  const { url } = await startStandaloneServer(server, {
    listen: { port },
  });

  console.log(`🚀  Server ready at: ${url}`);
}

start();
