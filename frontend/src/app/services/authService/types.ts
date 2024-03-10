export interface ISignupPayload {
    name: string;
    email: string;
    password: string;
}

export interface ISignupResponse {
    accessToken: string;
}

export interface ISigninPayload {
    email: string;
    password: string;
}

export interface ISigninResponse {
    accessToken: string;
}
