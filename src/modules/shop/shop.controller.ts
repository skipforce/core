import {
    Controller, Get, HttpCode, Param,
    ParseIntPipe, Patch, Body, UseGuards
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { ShopService } from './shop.service';
import { CustomResponse } from '../../interfaces/Response.interface';
import { Shop } from './shop.entity';

@ApiTags('shop')
@Controller('shop')
export class ShopController {
    constructor(private readonly _shopService: ShopService) { }

    @Get(':id')
    @HttpCode(200)
    async getShop(@Param('id', ParseIntPipe) id: number): Promise<CustomResponse> {
        const shop = await this._shopService.get(id)
        return { ok: true, data: shop }
    }

    @Get()
    @HttpCode(200)
    async getAllShops(): Promise<CustomResponse> {
        const shops = await this._shopService.getAll()
        return { ok: true, data: shops }
    }

    @UseGuards(AuthGuard('UserStrategy'))
    @Patch(':id')
    @HttpCode(200)
    async updateShop(@Param('id', ParseIntPipe) id: number, @Body() body: Shop): Promise<CustomResponse> {
        await this._shopService.update(id, body)
        return { ok: true, data: 'updated' }
    }
}
