import { InputType, Field } from 'type-graphql';
import { IsEmail, Matches, MinLength } from 'class-validator';
@InputType()
class UserInput {
  @Field()
  @IsEmail()
  email: string;

  @Field()
  @MinLength(8)
  @Matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/)
  password: string;
}

export default UserInput;
