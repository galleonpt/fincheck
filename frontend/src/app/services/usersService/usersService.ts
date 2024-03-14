import httpClient from '../httpClient';
import { IMeResponse } from './types';

const me = async () => {
    const { data } = await httpClient.get<IMeResponse>('/users/me');
    return data;
};

export const usersService = { me };
