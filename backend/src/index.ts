import "reflect-metadata";
import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { buildSchema } from "type-graphql";
import { dataSource } from "./datasource";
import { AdResolver } from "./resolvers/Ads";
import { TagResolver } from "./resolvers/Tags";
import { CategoryResolver } from "./resolvers/Categories";

const port = 5000;

async function start() {
  const schema = await buildSchema({
    resolvers: [AdResolver, TagResolver, CategoryResolver],
  });

  const server = new ApolloServer({ schema });

  await dataSource.initialize();

  const { url } = await startStandaloneServer(server, {
    listen: { port },
  });

  console.log(`🚀  Server ready at: ${url}`);
}

start();
