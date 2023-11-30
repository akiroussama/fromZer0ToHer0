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
import env from './environment';
import User from './entity/User';
import { UserResolver } from './resolver/UserResolver';
async function start(): Promise<void> {
  await datasource.initialize();

  const schema = await buildSchema({
    resolvers: [WilderResolver, SkillResolver, GradeResolver, UserResolver],
    authChecker: async ({ context }) => {
      console.log('authChecker context', context);
      console.log('context from authchecker', context);
      if (context.email !== undefined) {
        return true;
      } else {
        return false;
      }
      //   try {
      //     let decoded;
      //     // https://www.npmjs.com/package/jsonwebtoken#jwtverifytoken-secretorpublickey-options-callback
      //     if (token) decoded = jwt.verify(token, env.JWT_PRIVATE_KEY);
      //     if (typeof decoded === 'object') context.jwtPayload = decoded;
      //   } catch (err) {}

      //   let user;
      //   if (context.jwtPayload)
      //     user = await datasource
      //       .getRepository(User)
      //       .findOne({ where: { id: context.jwtPayload.userId } });

      //   if (user !== null) context.currentUser = user;

      //   if (!context.currentUser) return false;
      //   return roles.length === 0 || roles.includes(context.currentUser.role);
    },
  });
  interface ContextType {
    token?: String;
  }
  const server = new ApolloServer<ContextType>({
    schema,
  });

  const { url } = await startStandaloneServer(server, {
    context: async ({ req }) => {
      console.log('req', req.headers.authorization);
      if (
        req.headers.authorization !== undefined &&
        req.headers.authorization !== ''
      ) {
        const payload = jwt.verify(
          req.headers.authorization.split('Bearer ')[1],
          'supersecretkey'
        );
        console.log('payload', payload);
        return payload;
      }
      return {};
    },
    listen: { port: 4000 },
  });
  console.log(`🚀  Server ready at: ${url}`);
}

start().catch(console.error);
