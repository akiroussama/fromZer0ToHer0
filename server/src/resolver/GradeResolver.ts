import { Resolver } from 'type-graphql';
import Grade from '../entity/Grade';
import { Query } from 'type-graphql';
import { datasource } from '../db';
import { Mutation } from 'type-graphql';
import { Arg } from 'type-graphql';
import { GradeInput } from '../input/GradeInput';
@Resolver(Grade)
class GradeResolver {
  // list all grades
  @Query(() => [Grade])
  async grades(): Promise<Grade[]> {
    return await datasource.getRepository(Grade).find();
  }

  // add a grade to a wilder and skill
  @Mutation(() => Boolean)
  async addGrade(
    @Arg('wilderId') wilderId: number,
    @Arg('skillId') skillId: number
  ): Promise<boolean> {
    const grade = await datasource.getRepository(Grade).save({
      wilderId,
      skillId,
      votes: 0,
    });
    return grade ? true : false;
  }

  @Mutation(() => Boolean)
  async addVoteToGrade(@Arg('data') input: GradeInput): Promise<boolean> {
    const grade = await datasource.getRepository(Grade).save({
      wilderId: input.wilderId,
      skillId: input.skillId,
      votes: input.votes,
    });
    return grade ? true : false;
  }
}

export default GradeResolver;
