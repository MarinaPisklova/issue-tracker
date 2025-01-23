import fetchWithError from 'src/helpers/fetchWithError';
import { AddIssueBody, Issue, IssueComment, Label, User } from 'src/types';

class ApiIssueTracker {
    getIssues =
        (queryString: string) =>
        ({ signal }: RequestInit): Promise<Issue[]> =>
            fetchWithError(`/api/issues?` + queryString, { signal });
    getUserById =
        (userId: string) =>
        ({ signal }: RequestInit): Promise<User> =>
            fetchWithError(`/api/users/${userId}`, { signal });
    getLabels = ({ signal }: RequestInit): Promise<Label[]> =>
        fetchWithError('/api/labels', { signal });
    getIssueById =
        (issueId: string) =>
        ({ signal }: RequestInit): Promise<Issue> =>
            fetchWithError(`/api/issues/${issueId}`, { signal });
    getIssueComments =
        (issueId: string) =>
        ({ signal }: RequestInit): Promise<IssueComment[]> =>
            fetchWithError(`/api/issues/${issueId}/comments`, { signal });
    searchIssues =
        (queryString: string) =>
        ({ signal }: RequestInit): Promise<{ count: number; items: Issue[] }> =>
            fetchWithError(`/api/search/issues?` + queryString, { signal });
    addIssue = (issueBody: AddIssueBody) =>
        fetch('/api/issues', {
            method: 'POST',
            headers: { 'content-type': 'application/json' },
            body: JSON.stringify(issueBody),
        }).then((res) => res.json());
}

export const api = new ApiIssueTracker();
