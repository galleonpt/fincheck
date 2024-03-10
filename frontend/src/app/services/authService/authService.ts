import httpClient from '../httpClient';
import { ISignupPayload, ISignupResponse } from './types';

const signup = async (payload: ISignupPayload) => {
    const { data } = await httpClient.post<ISignupResponse>(
        '/auth/signup',
        payload,
    );
    return data;
};

export const authService = { signup };
