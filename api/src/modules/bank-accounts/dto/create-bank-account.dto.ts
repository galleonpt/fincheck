import {
    IsEnum,
    IsHexColor,
    IsNotEmpty,
    IsNumber,
    IsString,
} from 'class-validator';
import { EBankAccountType } from '../entities/BankAccount';

export class CreateBankAccountDto {
    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNumber()
    @IsNotEmpty()
    initialBalance: number;

    @IsNotEmpty()
    @IsEnum(EBankAccountType)
    type: EBankAccountType;

    @IsString()
    @IsNotEmpty()
    @IsHexColor()
    color: string;
}
