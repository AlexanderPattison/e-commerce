import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from './orders.service';
import { NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

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

    it('should create an order', () => {
        const createOrderDto: CreateOrderDto = { product: 'Product A', quantity: 2, userId: 1 };
        const result = service.create(createOrderDto);
        expect(result).toHaveProperty('id');
        expect(result).toMatchObject(createOrderDto);
    });

    it('should find an order', () => {
        const createOrderDto: CreateOrderDto = { product: 'Product A', quantity: 2, userId: 1 };
        const order = service.create(createOrderDto);
        const foundOrder = service.findOne(order.id);
        expect(foundOrder).toEqual(order);
    });

    it('should throw NotFoundException if order is not found', () => {
        expect(() => service.findOne(999)).toThrow(NotFoundException);
    });

    it('should update an order', () => {
        const createOrderDto: CreateOrderDto = { product: 'Product A', quantity: 2, userId: 1 };
        const order = service.create(createOrderDto);
        const updateOrderDto: UpdateOrderDto = { product: 'Product B', quantity: 3 };
        const updatedOrder = service.update(order.id, updateOrderDto);
        expect(updatedOrder.product).toEqual(updateOrderDto.product);
        expect(updatedOrder.quantity).toEqual(updateOrderDto.quantity);
    });

    it('should throw NotFoundException if order is not found for update', () => {
        const updateOrderDto: UpdateOrderDto = { product: 'Product B', quantity: 3 };
        expect(() => service.update(999, updateOrderDto)).toThrow(NotFoundException);
    });

    it('should remove an order', () => {
        const createOrderDto: CreateOrderDto = { product: 'Product A', quantity: 2, userId: 1 };
        const order = service.create(createOrderDto);
        const removedOrder = service.remove(order.id);
        expect(removedOrder).toEqual(order);
    });

    it('should throw NotFoundException if order is not found for remove', () => {
        expect(() => service.remove(999)).toThrow(NotFoundException);
    });
});
