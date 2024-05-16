import { Injectable, NotFoundException } from '@nestjs/common';

export interface User {
    id: number;
    name: string;
    email: string;
}

@Injectable()
export class UsersService {
    private readonly users: User[] = [];

    create(createUserDto: any): User {
        const newUser = { id: Date.now(), ...createUserDto };
        this.users.push(newUser);
        return newUser;
    }

    findAll(): User[] {
        return this.users;
    }

    findOne(id: number): User {
        const user = this.users.find(user => user.id === id);
        if (!user) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        return user;
    }

    update(id: number, updateUserDto: any): User {
        const userIndex = this.users.findIndex(user => user.id === id);
        if (userIndex === -1) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        const updatedUser = { ...this.users[userIndex], ...updateUserDto };
        this.users[userIndex] = updatedUser;
        return updatedUser;
    }

    remove(id: number): User[] {
        const userIndex = this.users.findIndex(user => user.id === id);
        if (userIndex === -1) {
            throw new NotFoundException(`User with ID ${id} not found`);
        }
        const removedUser = this.users.splice(userIndex, 1);
        return removedUser;
    }
}
