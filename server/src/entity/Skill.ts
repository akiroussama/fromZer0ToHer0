import { Entity, PrimaryGeneratedColumn, Column, BaseEntity } from 'typeorm';
import { Field, ObjectType } from 'type-graphql';
import { OneToMany } from 'typeorm';
import Grade from './Grade';
@Entity()
@ObjectType()
class Skill {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ length: 100 })
  name: string;

  @OneToMany(() => Grade, (grade) => grade.skill)
  grades: Grade[];
}

export default Skill;
