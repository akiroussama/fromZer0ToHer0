import { ObjectType, Field } from 'type-graphql';
import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';
import { ManyToOne } from 'typeorm';
import Skill from './Skill';
import Wilder from './Wilder';
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

  @ManyToOne(() => Skill, (skill) => skill.grades)
  skill: Skill;

  @ManyToOne(() => Wilder, (wilder) => wilder.grades)
  wilder: Wilder;
}

export default Grade;
