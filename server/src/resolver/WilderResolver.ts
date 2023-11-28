import { Arg, Int, Mutation, Query, Resolver } from 'type-graphql';
import Wilder from '../entity/Wilder';
import { WilderInput } from '../input/WilderInput';
import { datasource } from '../index';

@Resolver(Wilder)
export class WilderResolver {
  @Query(() => [Wilder])
  async wilders(): Promise<Wilder[]> {
    const wilders = await datasource.getRepository(Wilder);
    return wilders.find();
  }

  @Mutation(() => Wilder)
  async createWilder(@Arg('data') data: WilderInput): Promise<Wilder> {
    return await datasource.getRepository(Wilder).save(data);
  }
}
