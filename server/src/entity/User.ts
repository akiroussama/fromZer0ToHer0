import { IsEmail, Matches, Min, MinLength } from 'class-validator';
import { Field, InputType, ObjectType } from 'type-graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
export type Role = 'visitor' | 'admin';

@Entity()
@ObjectType()
class User {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ nullable: true })
  email: string;

  @Column({ nullable: true })
  hashedPassword?: string;
}

export default User;
