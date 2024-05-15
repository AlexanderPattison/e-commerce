import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
    private readonly products: any[] = [];

    create(createProductDto: CreateProductDto) {
        const newProduct = { id: Date.now(), ...createProductDto };
        this.products.push(newProduct);
        return newProduct;
    }

    findAll() {
        return this.products;
    }

    findOne(id: number) {
        const product = this.products.find(product => product.id === id);
        if (!product) {
            throw new NotFoundException(`Product with ID ${id} not found`);
        }
        return product;
    }

    update(id: number, updateProductDto: UpdateProductDto) {
        const productIndex = this.products.findIndex(product => product.id === id);
        if (productIndex === -1) {
            throw new NotFoundException(`Product with ID ${id} not found`);
        }
        const updatedProduct = { ...this.products[productIndex], ...updateProductDto };
        this.products[productIndex] = updatedProduct;
        return updatedProduct;
    }

    remove(id: number) {
        const productIndex = this.products.findIndex(product => product.id === id);
        if (productIndex === -1) {
            throw new NotFoundException(`Product with ID ${id} not found`);
        }
        const removedProduct = this.products.splice(productIndex, 1);
        return removedProduct;
    }
}
