import { datasource } from '../db';
import { Arg, Authorized, Mutation, Resolver } from 'type-graphql';
import Skill from '../entity/Skill';

@Resolver(Skill)
class SkillResolver {
  @Authorized()
  @Mutation(() => Skill)
  async createSkill(@Arg('name') name: string): Promise<Skill> {
    return await datasource.getRepository(Skill).save({ name });
  }
}

export default SkillResolver;
