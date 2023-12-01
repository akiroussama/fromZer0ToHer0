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
import UserResolver from './resolver/UserResolver';

interface MyContext {
  token?: String;
}
async function start(): Promise<void> {
  await datasource.initialize();

  const typeGraphQLgeneratedSchema = await buildSchema({
    resolvers: [UserResolver, WilderResolver, SkillResolver, GradeResolver],
    //  une fonction qui vérifie si un utilisateur est authentifié ou non.
    authChecker: ({ context }) => {
      console.log('context from authchecker', context);
      if (context.email !== undefined) {
        return true;
      } else {
        return false;
      }
    },
  });
  const server = new ApolloServer<MyContext>({
    schema: typeGraphQLgeneratedSchema,
    /*
    La fonction context vérifie si l'en-tête authorization est défini et n'est pas vide.
    Si c'est le cas, elle vérifie le token JWT en utilisant la bibliothèque jsonwebtoken
    et la clé secrète (supersecretkey).
    Si le token est valide, le payload du token (qui contient les informations de l'utilisateur) 
    est renvoyé et est accessible dans tous les résolveurs. Sinon, un objet vide est retourné.
    */
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
  console.log(`🚀  Server ready at ${url}`);
}

void start();
