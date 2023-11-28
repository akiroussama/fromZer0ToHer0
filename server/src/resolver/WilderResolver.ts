import { Arg, Int, Mutation, Query, Resolver } from 'type-graphql';
import Wilder from '../entity/Wilder';
import { WilderInput } from '../input/WilderInput';
import { datasource } from '../db';

@Resolver(Wilder)
export class WilderResolver {
  // get all wilders
  @Query(() => [Wilder])
  async wilders(): Promise<Wilder[]> {
    return await datasource.getRepository(Wilder).find();
  }

  // get one wilder
  @Query(() => Wilder)
  async getWilderById(@Arg('id', () => Int) idWilder: number): Promise<Wilder> {
    const wilder = await datasource.getRepository(Wilder).findOneBy({
      id: idWilder,
    });
    if (!wilder) {
      throw new Error('Wilder not found');
    }
    return wilder;
  }

  // create a wilder
  @Mutation(() => Wilder)
  async createWilder(@Arg('data') data: WilderInput): Promise<Wilder> {
    return await datasource.getRepository(Wilder).save(data);
  }

  // delete a wilder
  @Mutation(() => Boolean)
  async deleteWilder(@Arg('id', () => Int) idWilder: number): Promise<Boolean> {
    const result = await datasource.getRepository(Wilder).delete(idWilder);
    console.log(result);
    return true;
  }
}
