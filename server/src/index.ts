import 'reflect-metadata';
import { ApolloServer } from '@apollo/server';
import { buildSchema } from 'type-graphql';
import { startStandaloneServer } from '@apollo/server/standalone';
import { WilderResolver } from './resolver/WilderResolver';
import { datasource } from './db';
import { GradeResolver } from './resolver/GradeResolver';
import Skill from './entity/Skill';
import { SkillResolver } from './resolver/SkillResolver';

async function start(): Promise<void> {
  await datasource.initialize();

  const schema = await buildSchema({
    resolvers: [WilderResolver, GradeResolver, SkillResolver],
  });

  const server = new ApolloServer({
    schema,
  });

  const { url } = await startStandaloneServer(server, {
    listen: { port: 4000 },
  });
  console.log(`🚀  Server ready at: ${url}`);
}

start().catch(console.error);
