import { Authorized, Query, Resolver } from 'type-graphql';
import AuthObj from '../entity/AuthObj';
import { Mutation } from 'type-graphql';
import { RoleName } from '../entity/User';

@Resolver()
class AuthResolver {
  @Query()
  publicQuery(): AuthObj {
    return {
      publicField: 'public',
      authorizedField: 'authorized',
      adminField: 'admin',
    };
  }

  @Authorized([RoleName.ADMIN, RoleName.USER])
  @Query()
  authorizedQuery(): string {
    return 'authorized users only';
  }

  @Authorized([RoleName.ADMIN])
  @Mutation()
  adminMutation(): string {
    return 'your are admin, you can drop the database';
  }
}

export default AuthResolver;
