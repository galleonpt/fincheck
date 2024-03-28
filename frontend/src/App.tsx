import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Router from './Router';
import { Toaster } from 'react-hot-toast';
import AuthProvider from './app/contexts/AuthContext';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryclient = new QueryClient({
    defaultOptions: {
        queries: {
            retry: false,
            refetchOnWindowFocus: false,
        },
    },
});

export default function App() {
    return (
        <QueryClientProvider client={queryclient}>
            <AuthProvider>
                <Router />
                <Toaster />
            </AuthProvider>

            <ReactQueryDevtools buttonPosition="bottom-left" />
        </QueryClientProvider>
    );
}
