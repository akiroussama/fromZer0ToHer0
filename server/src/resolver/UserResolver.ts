import { Arg, Authorized, Ctx, Mutation, Query, Resolver } from 'type-graphql';
import { datasource } from '../db';
import { UserInput } from '../input/UserInput';
import User from '../entity/User';
import jwt from 'jsonwebtoken';
import env from '../environment';
import ContextType from '../utils/ContextType';
import { hash, verify } from 'argon2';
@Resolver(User)
export class UserResolver {
  @Mutation(() => User)
  async createUser(@Arg('data') data: UserInput): Promise<User> {
    const exisitingUser = await datasource
      .getRepository(User)
      .findOne({ where: { email: data.email } });

    if (exisitingUser) throw new Error('EMAIL_ALREADY_EXISTS');

    const hashedPassword = await hash(data.password);
    return await datasource
      .getRepository(User)
      .save({ ...data, hashedPassword });
  }

  @Query(() => String)
  async login(
    @Arg('data') { email, password }: UserInput,
    @Ctx() ctx: ContextType
  ): Promise<string> {
    console.log('login started, email', email, 'password', password);
    const user = await datasource
      .getRepository(User)
      .findOne({ where: { email } });
    console.log('user', user);
    if (
      user === null ||
      !user.hashedPassword ||
      !(await verify(password, user.hashedPassword))
    )
      throw new Error('invalid credentials');

    // https://www.npmjs.com/package/jsonwebtoken
    const token = jwt.sign({ userId: user.id }, env.JWT_PRIVATE_KEY);
    console.log('token', token);
    return token;
  }

  @Mutation(() => String)
  async logout(@Ctx() ctx: ContextType) {
    return 'OK';
  }
}
