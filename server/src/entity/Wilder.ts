import { Field, ObjectType } from 'type-graphql';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { OneToMany } from 'typeorm';
import Grade from './Grade';
@Entity()
@ObjectType()
class Wilder {
  @Field()
  @PrimaryGeneratedColumn()
  id: number;

  @Field()
  @Column({ length: 100 })
  name?: string;

  @OneToMany(() => Grade, (grade) => grade.wilder)
  grades: Grade[];
}

export default Wilder;
