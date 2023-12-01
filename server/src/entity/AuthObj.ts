import { Field, ObjectType } from 'type-graphql';
import { Authorized } from 'type-graphql';

@ObjectType()
class AuthObj {
  @Field()
  publicField: string;

  @Authorized()
  @Field()
  authorizedField: string;

  @Authorized('ADMIN')
  @Field()
  adminField: string;

  @Authorized(['ADMIN', 'MODERATOR'])
  @Field({ nullable: true })
  hiddenField?: string;
}

export default AuthObj;
