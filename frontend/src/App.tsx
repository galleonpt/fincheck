import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import Router from './Router';
import { Toaster } from 'react-hot-toast';

const queryclient = new QueryClient();

export default function App() {
    return (
        <QueryClientProvider client={queryclient}>
            <Router />
            <Toaster />
        </QueryClientProvider>
    );
}
