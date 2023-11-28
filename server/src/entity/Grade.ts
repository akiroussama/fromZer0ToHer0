import { ObjectType, Field } from 'type-graphql';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ManyToOne } from 'typeorm';
import Wilder from './Wilder';
import Skill from './Skill';
@Entity()
@ObjectType()
class Grade {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column()
  votes: number;

  @Field()
  @Column()
  skillId: number;

  @Field()
  @Column()
  wilderId: number;

  @ManyToOne(() => Wilder, (wilder) => wilder.grades)
  wilder: Wilder;

  @ManyToOne(() => Skill, (skill) => skill.grades)
  skill: Skill;
}

export default Grade;
