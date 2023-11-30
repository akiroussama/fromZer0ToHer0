import { InputType, Field } from 'type-graphql';
import { IsEmail, Matches, MinLength } from 'class-validator';

@InputType()
export class UserInput {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @MinLength(8)
  @Matches(/(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/)
  password: string;
}
