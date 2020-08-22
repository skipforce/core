import {
    Controller, Get, HttpCode,
    Param, ParseIntPipe, Post,
    UsePipes, ValidationPipe,
    Delete, UseInterceptors, UploadedFile, UseGuards
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';
import { FileInterceptor } from '@nestjs/platform-express'
import { AssetService } from './asset.service';
import { CustomResponse } from '../../interfaces/Response.interface';
import { multerOptions } from '../../shared/multer.storage'


@ApiTags('asset')
@UseGuards(AuthGuard())
@Controller('asset')
export class AssetController {
    constructor(private readonly _assetService: AssetService) { }

    @Get(':id')
    @HttpCode(200)
    async getAsset(@Param('id', ParseIntPipe) id: number): Promise<CustomResponse> {
        const asset = await this._assetService.get(id)
        return { ok: true, data: asset }
    }

    @Get('/all/:id')
    @HttpCode(200)
    async getAllProducts(@Param('id', ParseIntPipe) id: number): Promise<CustomResponse> {
        const assets = await this._assetService.getAll(id)
        return { ok: true, data: assets }
    }

    @Post(':id')
    @UseInterceptors(FileInterceptor('file', multerOptions))
    @UsePipes(ValidationPipe)
    @HttpCode(201)
    async createProduct(
        @Param('id', ParseIntPipe) id: number,
        @UploadedFile() file
    ): Promise<CustomResponse> {
        const asset = await this._assetService.create(id, file.path)
        return { ok: true, data: asset }
    }

    @Delete(':id')
    @HttpCode(200)
    async deleteProduct(@Param('id', ParseIntPipe) id: number): Promise<CustomResponse> {
        await this._assetService.delete(id)
        return { ok: true, data: 'deleted' }
    }
}
