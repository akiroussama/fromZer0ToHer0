import jwt from 'jsonwebtoken';
import { AuthChecker } from 'type-graphql';
import User from './entity/User';
import { datasource } from './db';
import env from './environement';
const repository = datasource.getRepository(User);

export interface IContext {
  token?: string | null;
  me?: User;
  roles?: string[];
}

export const authChecker: AuthChecker<IContext> = async (
  { root, args, context, info },
  roles
) => {
  console.log('###authChecker### context', context);
  // here we can read the user from context
  // and check his permission in the db against the `roles` argument
  // that comes from the `@Authorized` decorator, eg. ["ADMIN", "MODERATOR"]
  console.log('###authChecker### roles', roles);
  console.log('###authChecker### root', root);
  console.log('###authChecker### args', args);
  const token = context.token;
  console.log('###authChecker### token', token);
  if (token === null) {
    return false;
  }

  try {
    if (env.JWT_PRIVATE_KEY === undefined) {
      return false;
    }
    if (token === undefined) {
      return false;
    }
    const decodedToken: { userId: string } = jwt.verify(
      token,
      env.JWT_PRIVATE_KEY
    ) as any;
    const userId = parseInt(decodedToken.userId);
    const user = await repository.findOne({ where: { id: userId } });
    console.log('###authChecker### user', user);
    if (user != null) {
      context.me = user;
      context.roles = user.roles;
      console.log('###authChecker### OKOKOKOK', context);
      // grant access if the roles overlap
      return (
        roles.length == 0 || user.roles.some((role) => roles.includes(role))
      );
    } else {
      console.log('###authChecker### KOOOOOOOO', context);
      return false;
    }
  } catch {
    return false;
  }
};
