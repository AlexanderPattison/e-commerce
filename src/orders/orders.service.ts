import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';

@Injectable()
export class OrdersService {
    private readonly orders: any[] = [];

    create(createOrderDto: CreateOrderDto) {
        const newOrder = { id: Date.now(), ...createOrderDto };
        this.orders.push(newOrder);
        return newOrder;
    }

    findAll() {
        return this.orders;
    }

    findOne(id: number) {
        const order = this.orders.find(order => order.id === id);
        if (!order) {
            throw new NotFoundException(`Order with ID ${id} not found`);
        }
        return order;
    }

    update(id: number, updateOrderDto: UpdateOrderDto) {
        const orderIndex = this.orders.findIndex(order => order.id === id);
        if (orderIndex === -1) {
            throw new NotFoundException(`Order with ID ${id} not found`);
        }
        const updatedOrder = { ...this.orders[orderIndex], ...updateOrderDto };
        this.orders[orderIndex] = updatedOrder;
        return updatedOrder;
    }

    remove(id: number) {
        const orderIndex = this.orders.findIndex(order => order.id === id);
        if (orderIndex === -1) {
            throw new NotFoundException(`Order with ID ${id} not found`);
        }
        const removedOrder = this.orders.splice(orderIndex, 1);
        return removedOrder;
    }
}
