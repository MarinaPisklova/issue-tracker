import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router';
import App from './App';
import { startWorker } from '../server/index';
import GlobalStyles from './GlobalStyles';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            staleTime: 1000 * 60,
        },
    },
});
const container = document.getElementById('root') as HTMLElement;

startWorker().then(() => {
    return createRoot(container).render(
        <StrictMode>
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <App />
                    <GlobalStyles />
                </BrowserRouter>
                <ReactQueryDevtools />
            </QueryClientProvider>
        </StrictMode>,
    );
});
