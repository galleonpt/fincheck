import httpClient from '../httpClient';
import { ICreateAccountPayload, TGetAllAccountsResponse } from './types';

const create = async (payload: ICreateAccountPayload) => {
    const { data } = await httpClient.post('/bank-accounts', payload);
    return data;
};

const getAll = async () => {
    const { data } =
        await httpClient.get<TGetAllAccountsResponse>('/bank-accounts');
    return data;
};

export const bankAccountsService = { create, getAll };
