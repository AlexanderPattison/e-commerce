import { Controller, Get } from '@nestjs/common';
import { ItemsService } from './items.service';
import { Item } from './item.entity';

@Controller('items')
export class ItemsController {
    constructor(private readonly itemsService: ItemsService) { }

    @Get()
    async findAll(): Promise<Item[]> {
        return this.itemsService.findAll();
    }
}