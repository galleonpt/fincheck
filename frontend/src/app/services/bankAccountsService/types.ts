export interface ICreateAccountPayload {
    name: string;
    initialBalance: number;
    color: string;
    type: 'CHECKING' | 'INVESTMENT' | 'CASH';
}
