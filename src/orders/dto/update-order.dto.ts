export class UpdateOrderDto {
    readonly product: string;
    readonly quantity: number;
    readonly userId?: number; // If userId is optional
}
