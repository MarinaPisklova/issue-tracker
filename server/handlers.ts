import { http, HttpResponse } from 'msw';

const makeUrl = (path: string) =>
    `${typeof window === 'undefined' ? 'http://localhost:8000' : ''}${path}`;

export const handlers = [
    http.get(makeUrl('/api/status'), async () => {
        return HttpResponse.json({ status: 'ok' }, { status: 200 });
    }),
];
