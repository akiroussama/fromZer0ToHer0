import { Field, InputType } from 'type-graphql';
@InputType()
export class SkillInput {
  @Field()
  name: string;
}
