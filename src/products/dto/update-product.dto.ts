import { IsString, IsInt, IsOptional } from 'class-validator';

export class UpdateProductDto {
    @IsString()
    @IsOptional()
    readonly name?: string;

    @IsInt()
    @IsOptional()
    readonly price?: number;
}
