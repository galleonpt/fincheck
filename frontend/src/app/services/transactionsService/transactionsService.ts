import httpClient from '../httpClient';
import {
    ICreateTransactionPayload,
    IUpdateTransactionPayload,
    TGetAllTransactionsResponse,
    ITransactionsFilters,
} from './types';

const create = async (payload: ICreateTransactionPayload) => {
    const { data } = await httpClient.post('/transactions', payload);
    return data;
};

const getAll = async (filters: ITransactionsFilters) => {
    const { data } = await httpClient.get<TGetAllTransactionsResponse>(
        '/transactions',
        {
            params: filters,
        },
    );
    return data;
};

const update = async ({ id, ...params }: IUpdateTransactionPayload) => {
    const { data } = await httpClient.put(`/transactions/${id}`, params);

    return data;
};

const remove = async (transactionId: string) => {
    const { data } = await httpClient.delete(`/transactions/${transactionId}`);

    return data;
};

export const transactionsService = { create, getAll, update, remove };
