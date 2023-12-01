import 'reflect-metadata';
import { ApolloServer } from '@apollo/server';
import { buildSchema } from 'type-graphql';
import { startStandaloneServer } from '@apollo/server/standalone';
import { WilderResolver } from './resolver/WilderResolver';
import { datasource } from './db';
import Skill from './entity/Skill';
import SkillResolver from './resolver/SkillResolver';
import Grade from './entity/Grade';
import GradeResolver from './resolver/GradeResolver';
import jwt from 'jsonwebtoken';
import User from './entity/User';
import UserResolver from './resolver/UserResolver';
import { authChecker } from './auth';
import { IContext } from './auth';
import env from './environement';
import AuthResolver from './resolver/AuthResolver';
async function start(): Promise<void> {
  await datasource.initialize();

  const schema = await buildSchema({
    resolvers: [
      WilderResolver,
      SkillResolver,
      GradeResolver,
      UserResolver,
      AuthResolver,
    ],
    authChecker,
  });

  const server = new ApolloServer<IContext>({
    schema,
  });

  const { url } = await startStandaloneServer(server, {
    context: async ({ req }) => {
      const authorization = req?.headers?.authorization;
      console.log('##startStandaloneServer## req', authorization);
      if (!authorization) {
        return { token: null };
      }
      if (authorization !== undefined && authorization !== '') {
        const payload = jwt.verify(
          authorization.split('Bearer ')[1],
          env.JWT_PRIVATE_KEY
        );
        console.log('##startStandaloneServer## payload', payload);
        const token = authorization.split(' ').pop();
        const tokenBis = authorization.split('Bearer ')[1];
        console.log('##startStandaloneServer## token', token);
        console.log('##startStandaloneServer## tokenBis', tokenBis);
        return { token };
      }
      return {};
    },
    listen: { port: 4000 },
  });
  console.log(`🚀  Server ready at: ${url}`);
}

start();
