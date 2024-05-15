import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { NotFoundException } from '@nestjs/common';

describe('ProductsService', () => {
    let service: ProductsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [ProductsService],
        }).compile();

        service = module.get<ProductsService>(ProductsService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('create', () => {
        it('should create a product', () => {
            const createProductDto = { name: 'Product A', price: 100 };
            const product = service.create(createProductDto);
            expect(product).toMatchObject(createProductDto);
            expect(product).toHaveProperty('id');
        });
    });

    describe('findAll', () => {
        it('should return an array of products', () => {
            const products = service.findAll();
            expect(Array.isArray(products)).toBe(true);
        });
    });

    describe('findOne', () => {
        it('should find a product by id', () => {
            const createProductDto = { name: 'Product A', price: 100 };
            const product = service.create(createProductDto);
            const foundProduct = service.findOne(product.id);
            expect(foundProduct).toEqual(product);
        });

        it('should throw NotFoundException if product is not found', () => {
            expect(() => service.findOne(999)).toThrow(NotFoundException);
        });
    });

    describe('update', () => {
        it('should update a product', () => {
            const createProductDto = { name: 'Product A', price: 100 };
            const product = service.create(createProductDto);
            const updateProductDto = { name: 'Product B', price: 150 };
            const updatedProduct = service.update(product.id, updateProductDto);
            expect(updatedProduct).toMatchObject(updateProductDto);
        });

        it('should throw NotFoundException if product is not found', () => {
            expect(() => service.update(999, { name: 'Product B', price: 150 })).toThrow(NotFoundException);
        });
    });

    describe('remove', () => {
        it('should remove a product', () => {
            const createProductDto = { name: 'Product A', price: 100 };
            const product = service.create(createProductDto);
            const removedProduct = service.remove(product.id);
            expect(removedProduct).toEqual([product]);
        });

        it('should throw NotFoundException if product is not found', () => {
            expect(() => service.remove(999)).toThrow(NotFoundException);
        });
    });
});
