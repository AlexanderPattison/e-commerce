import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
    constructor(private readonly productsService: ProductsService) { }

    @Get()
    getAllProducts() {
        return this.productsService.getAllProducts();
    }

    @Get(':id')
    getProductById(@Param('id') id: number) {
        return this.productsService.getProductById(id);
    }

    @Post()
    createProduct(@Body() product: any) {
        return this.productsService.createProduct(product);
    }

    @Put(':id')
    updateProduct(@Param('id') id: number, @Body() product: any) {
        return this.productsService.updateProduct(id, product);
    }

    @Delete(':id')
    deleteProduct(@Param('id') id: number) {
        return this.productsService.deleteProduct(id);
    }
}
