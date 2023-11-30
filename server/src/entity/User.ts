import { Entity } from 'typeorm';
import { ObjectType } from 'type-graphql';
import { Field } from 'type-graphql';
import { PrimaryGeneratedColumn } from 'typeorm';
import { Column } from 'typeorm';
@ObjectType()
@Entity()
class User {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ unique: true })
  email: string;

  @Field()
  @Column({ nullable: true })
  hashedPassword?: string;
}

export default User;
