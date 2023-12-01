import { Entity } from 'typeorm';
import { ObjectType } from 'type-graphql';
import { Field } from 'type-graphql';
import { PrimaryGeneratedColumn } from 'typeorm';
import { Column } from 'typeorm';

export enum RoleName {
  ADMIN = 'ADMIN',
  MANAGER = 'MANAGER',
  USER = 'USER',
}

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

  @Field(() => [String])
  @Column('text', { array: true, default: '{}' })
  roles: string[];
}

export default User;
