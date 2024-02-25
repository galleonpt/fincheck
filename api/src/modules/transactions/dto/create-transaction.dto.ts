import {
    IsDateString,
    IsEnum,
    IsNotEmpty,
    IsNumber,
    IsPositive,
    IsString,
    IsUUID,
} from 'class-validator';
import { ETransactionType } from '../entities/Transaction';

export class CreateTransactionDto {
    @IsString()
    @IsNotEmpty()
    @IsUUID()
    bankAccountId: string;

    @IsString()
    @IsNotEmpty()
    @IsUUID()
    categoryId: string;

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNumber()
    @IsNotEmpty()
    @IsPositive()
    value: number;

    @IsDateString()
    @IsNotEmpty()
    date: string;

    @IsNotEmpty()
    @IsEnum(ETransactionType)
    type: ETransactionType;
}
