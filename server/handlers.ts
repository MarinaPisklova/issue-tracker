import { DefaultBodyType, http, HttpResponse, StrictRequest } from 'msw';
import { issues, labels, users } from './db';

const makeUrl = (path: string) =>
    `${typeof window === 'undefined' ? 'http://localhost:8000' : ''}${path}`;

const handleErrorDelay = async (req: StrictRequest<DefaultBodyType>) => {
    if (req.headers.get('x-delay')) {
        await new Promise((resolve) =>
            setTimeout(resolve, Number(req.headers.get('x-delay')) || 0),
        );
    } else {
        await new Promise((resolve) => setTimeout(resolve, Math.random() * 500 + 500));
    }
    if (req.headers.get('x-error')) {
        if (Math.random() > 0.5) {
            throw new Error();
        }
    }
};

export const handlers = [
    http.get(makeUrl('/api/status'), async () => {
        return HttpResponse.json({ status: 'ok' }, { status: 200 });
    }),
    http.get(makeUrl('/api/issues'), async ({ request }) => {
        try {
            await handleErrorDelay(request);
        } catch {
            return HttpResponse.json({ error: 'Error in request' }, { status: 500 });
        }

        const url = new URL(request.url);

        const query = url.searchParams;
        const page = Number(query.get('page')) || 1;
        const perPage = Number(query.get('limit')) || 10;
        const statusFilter = query.get('status') as
            | 'backlog'
            | 'todo'
            | 'inProgress'
            | 'done'
            | 'cancelled'
            | null;
        const labelQuery = query.getAll('labels[]');
        const order = query.get('order') || 'desc';
        const filteredIssues = issues.filter((issue) => {
            if (statusFilter) {
                if (issue.status !== statusFilter) return false;
            } else {
                if (issue.status === 'done' || issue.status === 'cancelled') return false;
            }
            if (labelQuery.length > 0) {
                if (
                    !labelQuery.some((label) => {
                        const dbLabel = labels.find((l) => l.name === label);
                        if (!dbLabel) return false;
                        return issue.labels.find((l) => l === dbLabel.id);
                    })
                ) {
                    return false;
                }
            }
            return true;
        });
        const sortedIssues = filteredIssues.sort((a, b) => {
            if (order === 'asc') {
                if (a.number < b.number) return -1;
                if (a.number > b.number) return 1;
                return 0;
            } else {
                if (a.number < b.number) return 1;
                if (a.number > b.number) return -1;
                return 0;
            }
        });
        const pagedIssues = sortedIssues.slice((page - 1) * perPage, page * perPage);
        return HttpResponse.json(pagedIssues, { status: 200 });
    }),
    http.get(makeUrl('/api/users'), async ({ request }) => {
        try {
            await handleErrorDelay(request);
        } catch {
            return HttpResponse.json({ error: 'Error in request' }, { status: 500 });
        }
        return HttpResponse.json(users, { status: 200 });
    }),
    http.get(makeUrl('/api/users/:userId'), async ({ request, params }) => {
        try {
            await handleErrorDelay(request);
        } catch {
            return HttpResponse.json({ error: 'Error in request' }, { status: 500 });
        }

        const { userId } = params;

        const user = users.find((l) => l.id === userId);
        if (!user) {
            return HttpResponse.json({ error: 'User not found' }, { status: 404 });
        }
        return HttpResponse.json(user, { status: 200 });
    }),
    http.get(makeUrl('/api/labels'), async ({ request }) => {
        try {
            await handleErrorDelay(request);
        } catch {
            return HttpResponse.json({ error: 'Error in request' }, { status: 500 });
        }
        return HttpResponse.json(labels, { status: 200 });
    }),
    http.get(makeUrl('/api/labels/:labelId'), async ({ request, params }) => {
        try {
            await handleErrorDelay(request);
        } catch {
            return HttpResponse.json({ error: 'Error in request' }, { status: 500 });
        }
        const { labelId } = params;

        const label = labels.find((l) => l.name === labelId);
        if (!label) {
            return HttpResponse.json({ error: 'Label not found' }, { status: 404 });
        }
        return HttpResponse.json(label, { status: 200 });
    }),
];
