import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

interface Order {
    id: number;
    product: string;
    quantity: number;
    userId: number;
}

@Injectable()
export class OrdersService {
    private orders: Order[] = [];

    create(createOrderDto: CreateOrderDto): Order {
        const newOrder: Order = { id: Date.now(), ...createOrderDto };
        this.orders.push(newOrder);
        return newOrder;
    }

    findOne(id: number): Order {
        const order = this.orders.find(order => order.id === id);
        if (!order) {
            throw new NotFoundException(`Order with ID ${id} not found`);
        }
        return order;
    }

    update(id: number, updateOrderDto: UpdateOrderDto): Order {
        const orderIndex = this.orders.findIndex(order => order.id === id);
        if (orderIndex === -1) {
            throw new NotFoundException(`Order with ID ${id} not found`);
        }
        const updatedOrder = { ...this.orders[orderIndex], ...updateOrderDto };
        this.orders[orderIndex] = updatedOrder;
        return updatedOrder;
    }

    remove(id: number): Order {
        const orderIndex = this.orders.findIndex(order => order.id === id);
        if (orderIndex === -1) {
            throw new NotFoundException(`Order with ID ${id} not found`);
        }
        const [removedOrder] = this.orders.splice(orderIndex, 1);
        return removedOrder;
    }

    findAll(): Order[] {
        return this.orders;
    }
}
