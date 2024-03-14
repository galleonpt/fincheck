import {
    FC,
    PropsWithChildren,
    createContext,
    useCallback,
    useState,
} from 'react';
import { LOCAL_STORAGE_ACCESS_TOKEN_KEY } from '../config/localStorageKeys';

interface IAuthContextData {
    signedIn: boolean;
    signin: (accessToken: string) => void;
    logout: () => void;
}

export const AuthContext = createContext({} as IAuthContextData);

const AuthProvider: FC<PropsWithChildren> = ({ children }) => {
    const [signedIn, setSignedIn] = useState<boolean>(() => {
        const storedAccessToken = localStorage.getItem(
            LOCAL_STORAGE_ACCESS_TOKEN_KEY,
        );

        return !!storedAccessToken;
    });

    const signin = useCallback((accessToken: string) => {
        localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY, accessToken);

        setSignedIn(true);
    }, []);

    const logout = useCallback(() => {
        localStorage.removeItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY);
        setSignedIn(false);
    }, []);

    const contextData: IAuthContextData = {
        signedIn,
        signin,
        logout,
    };

    return (
        <AuthContext.Provider value={contextData}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
