import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from './orders.service';
import { NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';

describe('OrdersService', () => {
    let service: OrdersService;

    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            providers: [OrdersService],
        }).compile();

        service = module.get<OrdersService>(OrdersService);
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
    });

    describe('create', () => {
        it('should create an order', () => {
            const createOrderDto: CreateOrderDto = { product: 'Product A', quantity: 2, userId: 1 };
            const order = service.create(createOrderDto);
            expect(order).toMatchObject(createOrderDto);
            expect(order).toHaveProperty('id');
        });
    });

    describe('findAll', () => {
        it('should return an array of orders', () => {
            const orders = service.findAll();
            expect(Array.isArray(orders)).toBe(true);
        });
    });

    describe('findOne', () => {
        it('should find an order by id', () => {
            const createOrderDto: CreateOrderDto = { product: 'Product A', quantity: 2, userId: 1 };
            const order = service.create(createOrderDto);
            const foundOrder = service.findOne(order.id);
            expect(foundOrder).toEqual(order);
        });

        it('should throw NotFoundException if order is not found', () => {
            expect(() => service.findOne(999)).toThrow(NotFoundException);
        });
    });

    describe('update', () => {
        it('should update an order', () => {
            const createOrderDto: CreateOrderDto = { product: 'Product A', quantity: 2, userId: 1 };
            const order = service.create(createOrderDto);
            const updateOrderDto = { product: 'Product B', quantity: 3 };
            const updatedOrder = service.update(order.id, updateOrderDto);
            expect(updatedOrder).toMatchObject(updateOrderDto);
        });

        it('should throw NotFoundException if order is not found', () => {
            expect(() => service.update(999, { product: 'Product B', quantity: 3 })).toThrow(NotFoundException);
        });
    });

    describe('remove', () => {
        it('should remove an order', () => {
            const createOrderDto: CreateOrderDto = { product: 'Product A', quantity: 2, userId: 1 };
            const order = service.create(createOrderDto);
            const removedOrder = service.remove(order.id);
            expect(removedOrder).toEqual([order]);
        });

        it('should throw NotFoundException if order is not found', () => {
            expect(() => service.remove(999)).toThrow(NotFoundException);
        });
    });
});
