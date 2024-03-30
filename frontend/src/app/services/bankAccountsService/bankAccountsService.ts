import httpClient from '../httpClient';
import {
    ICreateAccountPayload,
    IUpdateBankAccountPayload,
    TGetAllAccountsResponse,
} from './types';

const create = async (payload: ICreateAccountPayload) => {
    const { data } = await httpClient.post('/bank-accounts', payload);
    return data;
};

const getAll = async () => {
    const { data } =
        await httpClient.get<TGetAllAccountsResponse>('/bank-accounts');
    return data;
};

const update = async ({ id, ...params }: IUpdateBankAccountPayload) => {
    const { data } = await httpClient.put(`/bank-accounts/${id}`, params);

    return data;
};

const remove = async (bankAccountId: string) => {
    const { data } = await httpClient.delete(`/bank-accounts/${bankAccountId}`);

    return data;
};

export const bankAccountsService = { create, getAll, update, remove };
