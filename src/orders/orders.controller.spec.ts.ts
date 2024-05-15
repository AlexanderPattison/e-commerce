import { Test, TestingModule } from '@nestjs/testing';
import { OrdersController } from './orders.controller';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { NotFoundException } from '@nestjs/common';

describe('OrdersController', () => {
    let controller: OrdersController;
    let service: OrdersService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            controllers: [OrdersController],
            providers: [OrdersService],
        }).compile();

        controller = module.get<OrdersController>(OrdersController);
        service = module.get<OrdersService>(OrdersService);
    });

    it('should be defined', () => {
        expect(controller).toBeDefined();
    });

    describe('create', () => {
        it('should create an order', () => {
            const createOrderDto: CreateOrderDto = { product: 'Product A', quantity: 2 };
            jest.spyOn(service, 'create').mockImplementation(() => ({ id: 1, ...createOrderDto }));

            expect(controller.create(createOrderDto)).toEqual({ id: 1, ...createOrderDto });
        });
    });

    describe('findAll', () => {
        it('should return an array of orders', () => {
            const result = [{ id: 1, product: 'Product A', quantity: 2 }];
            jest.spyOn(service, 'findAll').mockImplementation(() => result);

            expect(controller.findAll()).toBe(result);
        });
    });

    describe('findOne', () => {
        it('should return a single order', () => {
            const result = { id: 1, product: 'Product A', quantity: 2 };
            jest.spyOn(service, 'findOne').mockImplementation(() => result);

            expect(controller.findOne('1')).toBe(result);
        });

        it('should throw NotFoundException if order is not found', () => {
            jest.spyOn(service, 'findOne').mockImplementation(() => {
                throw new NotFoundException();
            });

            expect(() => controller.findOne('999')).toThrow(NotFoundException);
        });
    });

    describe('update', () => {
        it('should update an order', () => {
            const updateOrderDto: UpdateOrderDto = { product: 'Product B', quantity: 3 };
            const result = { id: 1, ...updateOrderDto };
            jest.spyOn(service, 'update').mockImplementation(() => result);

            expect(controller.update('1', updateOrderDto)).toBe(result);
        });

        it('should throw NotFoundException if order is not found', () => {
            jest.spyOn(service, 'update').mockImplementation(() => {
                throw new NotFoundException();
            });

            expect(() => controller.update('999', { product: 'Product B', quantity: 3 })).toThrow(NotFoundException);
        });
    });

    describe('remove', () => {
        it('should remove an order', () => {
            const result = [{ id: 1, product: 'Product A', quantity: 2 }];
            jest.spyOn(service, 'remove').mockImplementation(() => result);

            expect(controller.remove('1')).toBe(result);
        });

        it('should throw NotFoundException if order is not found', () => {
            jest.spyOn(service, 'remove').mockImplementation(() => {
                throw new NotFoundException();
            });

            expect(() => controller.remove('999')).toThrow(NotFoundException);
        });
    });
});
