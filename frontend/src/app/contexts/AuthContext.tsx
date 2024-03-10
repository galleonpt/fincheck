import { FC, PropsWithChildren, createContext } from 'react';

interface IAuthContextData {
    signedIn: boolean;
}

export const AuthContext = createContext({} as IAuthContextData);

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
    return (
        <AuthContext.Provider value={{ signedIn: false }}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
