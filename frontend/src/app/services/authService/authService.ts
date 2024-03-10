import httpClient from '../httpClient';
import {
    ISigninPayload,
    ISigninResponse,
    ISignupPayload,
    ISignupResponse,
} from './types';

const signup = async (payload: ISignupPayload) => {
    const { data } = await httpClient.post<ISignupResponse>(
        '/auth/signup',
        payload,
    );
    return data;
};

const signin = async (payload: ISigninPayload) => {
    const { data } = await httpClient.post<ISigninResponse>(
        '/auth/signin',
        payload,
    );
    return data;
};

export const authService = { signup, signin };
