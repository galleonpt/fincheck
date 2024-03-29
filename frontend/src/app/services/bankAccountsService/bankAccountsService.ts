import httpClient from '../httpClient';
import { ICreateAccountPayload } from './types';

const create = async (payload: ICreateAccountPayload) => {
    const { data } = await httpClient.post('/bank-accounts', payload);
    return data;
};

export const bankAccountsService = { create };
