import { Arg, Int, Mutation, Query, Resolver } from 'type-graphql';
import Skill from '../entity/Skill';
import { datasource } from '../db';
import { SkillInput } from '../input/SkillInput';
@Resolver(Skill)
export class SkillResolver {
  @Query(() => [Skill])
  async skills(): Promise<Skill[]> {
    return await datasource.getRepository(Skill).find();
  }

  @Mutation(() => Skill)
  async createSkill(@Arg('data') data: SkillInput): Promise<Skill> {
    return await datasource.getRepository(Skill).save(data);
  }
}
