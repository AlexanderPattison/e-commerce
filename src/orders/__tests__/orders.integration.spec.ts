import { Test, TestingModule } from '@nestjs/testing';
import { OrdersService } from '../orders.service';
import { UsersService } from '../../users/users.service';
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

    // Additional test cases...
});
