import { IsString, IsInt, IsOptional } from 'class-validator';

export class UpdateOrderDto {
    @IsString()
    @IsOptional()
    readonly product?: string;

    @IsInt()
    @IsOptional()
    readonly quantity?: number;
}
