import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from '../orders.service';
import { UsersService } from '../../users/users.service';
import { NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from '../dto/create-order.dto';

describe('OrdersService Integration', () => {
    let service: OrdersService;
    let usersService: UsersService;

    const mockUser = { id: 1, name: 'User A', email: 'user@example.com' };

    beforeEach(async () => {
        const testingModule: TestingModule = await Test.createTestingModule({
            providers: [
                OrdersService,
                {
                    provide: UsersService,
                    useValue: {
                        findOne: jest.fn().mockResolvedValue(mockUser),
                    },
                },
            ],
        }).compile();

        service = testingModule.get<OrdersService>(OrdersService);
        usersService = testingModule.get<UsersService>(UsersService);

        // Clear the orders array before each test
        service['orders'] = [];
    });

    it('should be defined', () => {
        expect(service).toBeDefined();
        expect(usersService).toBeDefined();
    });

    it('should create an order', async () => {
        const createOrderDto: CreateOrderDto = { product: 'Product A', quantity: 2, userId: 1 };
        const result = await service.create(createOrderDto);
        expect(result).toHaveProperty('id');
        expect(result).toMatchObject(createOrderDto);
    });

    it('should throw NotFoundException if order is not found', async () => {
        await expect(service.findOne(999)).rejects.toThrow(NotFoundException);
    });

    it('should throw NotFoundException if order is not found for update', async () => {
        await expect(service.update(999, { product: 'Product B', quantity: 3 })).rejects.toThrow(NotFoundException);
    });

    it('should throw NotFoundException if order is not found for remove', async () => {
        await expect(service.remove(999)).rejects.toThrow(NotFoundException);
    });

    // Additional test cases...
});
