import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';
import { BrowserRouter } from 'react-router';
import App from './App';
import { startWorker } from '../server/index';
import GlobalStyles from './GlobalStyles';

const queryClient = new QueryClient();
const container = document.getElementById('root') as HTMLElement;

startWorker().then(() => {
    return createRoot(container).render(
        <StrictMode>
            <QueryClientProvider client={queryClient}>
                <BrowserRouter>
                    <div className="container">
                        <App />
                        <GlobalStyles />
                    </div>
                </BrowserRouter>
            </QueryClientProvider>
        </StrictMode>,
    );
});
