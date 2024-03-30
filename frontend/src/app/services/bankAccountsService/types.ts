import { BankAccount } from '../../entities/BankAccount';

export interface ICreateAccountPayload {
    name: string;
    initialBalance: number;
    color: string;
    type: 'CHECKING' | 'INVESTMENT' | 'CASH';
}

export type TGetAllAccountsResponse = BankAccount[];

export interface IUpdateBankAccountPayload {
    id: string;
    name: string;
    initialBalance: number;
    color: string;
    type: 'CHECKING' | 'INVESTMENT' | 'CASH';
}
