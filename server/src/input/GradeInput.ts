import { InputType, Field } from 'type-graphql';
import { MaxLength, MinLength } from 'class-validator';

@InputType()
export class GradeInput {
  @Field()
  votes: string;

  @Field()
  skillId: string;

  @Field()
  wilderId: string;
}
