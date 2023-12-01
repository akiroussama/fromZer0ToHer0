import { Arg, Authorized, Int, Mutation, Query, Resolver } from 'type-graphql';
import Wilder from '../entity/Wilder';
import { WilderInput } from '../input/WilderInput';
import { datasource } from '../db';
import { IContext } from '../auth';
import { Ctx } from 'type-graphql';

@Resolver(Wilder)
export class WilderResolver {
  // get all wilders
  @Authorized()
  @Query(() => [Wilder])
  async wilders(@Ctx() context: IContext): Promise<Wilder[]> {
    console.log('###wilders### context', context);
    return await datasource.getRepository(Wilder).find();
  }

  // get one wilder
  @Authorized()
  @Query(() => Wilder)
  async getWilderById(
    @Ctx() context: IContext,
    @Arg('id', () => Int) idWilder: number
  ): Promise<Wilder> {
    const wilder = await datasource.getRepository(Wilder).findOneBy({
      id: idWilder,
    });
    if (!wilder) {
      throw new Error('Wilder not found');
    }
    return wilder;
  }

  // create a wilder
  @Authorized()
  @Mutation(() => Wilder)
  async createWilder(@Arg('data') data: WilderInput): Promise<Wilder> {
    return await datasource.getRepository(Wilder).save(data);
  }

  // delete a wilder
  @Authorized()
  @Mutation(() => Boolean)
  async deleteWilder(@Arg('id', () => Int) idWilder: number): Promise<Boolean> {
    const result = await datasource.getRepository(Wilder).delete(idWilder);
    console.log(result);
    return true;
  }
}
