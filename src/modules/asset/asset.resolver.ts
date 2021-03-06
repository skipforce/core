import { Resolver, Args, Query, Int, Mutation } from '@nestjs/graphql'
import { UseGuards } from '@nestjs/common'
import { AssetService } from './asset.service'
import { Asset } from './asset.entity'
import { MutationResult } from '../../graphql/interfaces/result.interface'
import { UserAuthGuard } from '../auth/guards/graph.guard'

@UseGuards(UserAuthGuard)
@Resolver(of => Asset)
export class AssetResolver {
    constructor(private readonly _assetService: AssetService) { }

    @Query(returns => Asset)
    async getAsset(
        @Args('id', { type: () => Int }) id: number
    ): Promise<Asset> {
        return await this._assetService.get(id)
    }

    @Query(returns => [Asset])
    async getAllAssets(
        @Args('gallery_id', { type: () => Int }) gallery_id: number
    ): Promise<Asset[]> {
        return await this._assetService.getAll(gallery_id)
    }

    @Mutation(returns => MutationResult)
    async deleteAsset(
        @Args('id', { type: () => Int }) id: number
    ): Promise<MutationResult> {
        await this._assetService.delete(id)
        return { success: true }
    }

}