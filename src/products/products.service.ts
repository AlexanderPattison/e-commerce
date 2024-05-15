import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';

@Injectable()
export class ProductsService {
    constructor(
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
    ) { }

    getAllProducts() {
        return this.productRepository.find();
    }

    getProductById(id: number) {
        return this.productRepository.findOne(id);
    }

    createProduct(product: any) {
        return this.productRepository.save(product);
    }

    updateProduct(id: number, product: any) {
        return this.productRepository.update(id, product);
    }

    deleteProduct(id: number) {
        return this.productRepository.delete(id);
    }
}
