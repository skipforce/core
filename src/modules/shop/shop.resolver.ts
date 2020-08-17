import { Resolver, Args, Query, Int, Mutation } from '@nestjs/graphql'
import { Shop } from './shop.entity'
import { ShopDto } from './dto/shop.dto'
import { ShopService } from './shop.service'
import { MutationResult } from '../../graphql/interfaces/result.interface'

@Resolver(of => Shop)
export class ShopResolver {
    constructor(private readonly _shopService: ShopService) { }

    @Query(returns => Shop)
    async getShop(@Args('id', { type: () => Int }) id: number): Promise<Shop> {
        return await this._shopService.get(id)
    }

    @Query(returns => [Shop])
    async getAllShops(): Promise<Shop[]> {
        return await this._shopService.getAll()
    }

    @Mutation(returns => MutationResult)
    async updateShop(
        @Args('id', { type: () => Int }) id: number,
        @Args('shopData') shopData: ShopDto
    ): Promise<MutationResult> {
        await this._shopService.update(id, shopData)
        return { success: true }
    }

}