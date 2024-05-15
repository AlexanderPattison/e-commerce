import { IsString, IsInt, IsNotEmpty } from 'class-validator';

export class CreateProductDto {
    @IsString()
    @IsNotEmpty()
    readonly name!: string;  // Add non-null assertion operator

    @IsInt()
    @IsNotEmpty()
    readonly price!: number;  // Add non-null assertion operator
}
