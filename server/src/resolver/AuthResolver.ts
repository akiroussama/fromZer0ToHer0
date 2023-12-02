import { Resolver, Query, Authorized, Mutation } from 'type-graphql';
import AuthObj from '../entity/AuthObj';

@Resolver(AuthObj)
export class AuthResolver {
  @Query()
  publicQuery(): AuthObj {
    return {
      publicField: 'Some public data',
      authorizedField: 'Data for logged users only',
      adminField: 'Top secret info for admin',
    };
  }

  @Authorized()
  @Query()
  authedQuery(): string {
    return 'Authorized users only!';
  }

  @Authorized('ADMIN')
  @Mutation()
  adminMutation(): string {
    return 'You are an admin/moderator, you can safely drop the database ;)';
  }
}
