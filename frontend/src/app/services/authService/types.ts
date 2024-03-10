export interface ISignupPayload {
    name: string;
    email: string;
    password: string;
}

export interface ISignupResponse {
    accessToken: string;
}
