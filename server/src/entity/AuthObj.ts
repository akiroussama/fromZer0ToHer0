import { Authorized, Field } from 'type-graphql';
import { ObjectType } from 'type-graphql';

@ObjectType()
class AuthObj {
  @Field()
  publicField: string;

  @Authorized()
  @Field()
  authorizedField: string;

  @Authorized(['ADMIN'])
  @Field()
  adminField: string;
}

export default AuthObj;
