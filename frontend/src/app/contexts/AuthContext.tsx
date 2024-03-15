import {
    FC,
    PropsWithChildren,
    createContext,
    useCallback,
    useEffect,
    useState,
} from 'react';
import { LOCAL_STORAGE_ACCESS_TOKEN_KEY } from '../config/localStorageKeys';
import { useQuery } from '@tanstack/react-query';
import { usersService } from '../services/usersService/usersService';
import LaunchScreen from '../../view/components/LaunchScreen';
import toast from 'react-hot-toast';

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

    const { isError, isFetching, isSuccess } = useQuery({
        queryKey: ['users', 'me'],
        queryFn: () => usersService.me(),
        enabled: signedIn,
        staleTime: Infinity,
    });

    const signin = useCallback((accessToken: string) => {
        localStorage.setItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY, accessToken);

        setSignedIn(true);
    }, []);

    const logout = useCallback(() => {
        localStorage.removeItem(LOCAL_STORAGE_ACCESS_TOKEN_KEY);

        setSignedIn(false);
    }, []);

    useEffect(() => {
        if (isError) {
            toast.error('Sua sessão expirou!');
            logout();
        }
    }, [isError, logout]);

    const contextData: IAuthContextData = {
        signedIn: isSuccess && signedIn,
        signin,
        logout,
    };

    return (
        <AuthContext.Provider value={contextData}>
            <LaunchScreen isLoading={isFetching} />

            {!isFetching && children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
