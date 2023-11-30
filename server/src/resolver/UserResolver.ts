import { Resolver } from 'type-graphql';
import User from '../entity/User';
import { datasource } from '../db';
import { hash, verify } from 'argon2';
import UserInput from '../input/UserInput';
import { Arg, Mutation } from 'type-graphql';
import { Query } from 'type-graphql';
import jwt from 'jsonwebtoken';
import env from '../environement';
@Resolver(User)
class UserResolver {
  @Query(() => [User])
  async users(): Promise<User[]> {
    return await datasource.getRepository(User).find();
  }

  // method send if user exist or not by his email
  @Query(() => Boolean)
  async isUserExist(@Arg('email') email: string): Promise<boolean> {
    const user = await datasource
      .getRepository(User)
      .findOne({ where: { email } });
    if (user === null || user === undefined) return false;
    return true;
  }
  // createuser et login resolver
  @Mutation(() => User)
  async createUser(@Arg('data') data: UserInput): Promise<User> {
    const existingUser = await datasource
      .getRepository(User)
      .findOne({ where: { email: data.email } });
    if (existingUser) throw new Error('User already exists');
    const hashedPassword = await hash(data.password);
    return await datasource
      .getRepository(User)
      .save({ email: data.email, hashedPassword });
  }

  @Query(() => String)
  async login(@Arg('data') data: UserInput): Promise<string> {
    const email = data.email;
    const user = await datasource
      .getRepository(User)
      .findOne({ where: { email } });
    if (user === null || user === undefined) throw new Error('User not found');
    if (user.hashedPassword === undefined) throw new Error('Password not good');
    //const valid = (await hash(data.password)) === user.hashedPassword;
    const valid = await verify(user.hashedPassword, data.password);
    if (!valid) throw new Error('Invalid password');

    const token = jwt.sign({ userId: user.id }, env.JWT_PRIVATE_KEY);
    console.log('token', token);
    return token;
  }
}

export default UserResolver;
