import { IsString, IsInt, IsNotEmpty } from 'class-validator';

export class CreateOrderDto {
    @IsString()
    @IsNotEmpty()
    readonly product: string;

    @IsInt()
    readonly quantity: number;
}
