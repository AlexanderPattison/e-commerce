import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { NotFoundException } from '@nestjs/common';

describe('ProductsController', () => {
    let controller: ProductsController;
    let service: ProductsService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [ProductsController],
            providers: [ProductsService],
        }).compile();

        controller = module.get<ProductsController>(ProductsController);
        service = module.get<ProductsService>(ProductsService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('create', () => {
        it('should create a product', () => {
            const createProductDto: CreateProductDto = { name: 'Product A', price: 100 };
            jest.spyOn(service, 'create').mockImplementation(() => ({ id: 1, ...createProductDto }));

            expect(controller.create(createProductDto)).toEqual({ id: 1, ...createProductDto });
        });
    });

    describe('findAll', () => {
        it('should return an array of products', () => {
            const result = [{ id: 1, name: 'Product A', price: 100 }];
            jest.spyOn(service, 'findAll').mockImplementation(() => result);

            expect(controller.findAll()).toBe(result);
        });
    });

    describe('findOne', () => {
        it('should return a single product', () => {
            const result = { id: 1, name: 'Product A', price: 100 };
            jest.spyOn(service, 'findOne').mockImplementation(() => result);

            expect(controller.findOne('1')).toBe(result);
        });

        it('should throw NotFoundException if product is not found', () => {
            jest.spyOn(service, 'findOne').mockImplementation(() => {
                throw new NotFoundException();
            });

            expect(() => controller.findOne('999')).toThrow(NotFoundException);
        });
    });

    describe('update', () => {
        it('should update a product', () => {
            const updateProductDto: UpdateProductDto = { name: 'Product B', price: 150 };
            const result = { id: 1, ...updateProductDto };
            jest.spyOn(service, 'update').mockImplementation(() => result);

            expect(controller.update('1', updateProductDto)).toBe(result);
        });

        it('should throw NotFoundException if product is not found', () => {
            jest.spyOn(service, 'update').mockImplementation(() => {
                throw new NotFoundException();
            });

            expect(() => controller.update('999', { name: 'Product B', price: 150 })).toThrow(NotFoundException);
        });
    });

    describe('remove', () => {
        it('should remove a product', () => {
            const result = [{ id: 1, name: 'Product A', price: 100 }];
            jest.spyOn(service, 'remove').mockImplementation(() => result);

            expect(controller.remove('1')).toBe(result);
        });

        it('should throw NotFoundException if product is not found', () => {
            jest.spyOn(service, 'remove').mockImplementation(() => {
                throw new NotFoundException();
            });

            expect(() => controller.remove('999')).toThrow(NotFoundException);
        });
    });
});
