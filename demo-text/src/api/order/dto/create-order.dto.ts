import {
    IsArray,
    IsNotEmpty,
    IsString,
    IsBoolean,
    IsEmpty,
} from 'class-validator';
export class CreateOrderDto {
    name: string;
    @IsNotEmpty()
    image: string;
    @IsNotEmpty()
    numbers: number[]
    // numbers: string
    content: string
    @IsNotEmpty()
    file: any

}
