import { Issue, IssueComment, Label, User } from 'src/types';

class ApiIssueTracker {
    getIssues = (queryString: string) => (): Promise<Issue[]> =>
        fetch(`/api/issues?` + queryString).then((res) => res.json());
    getUserById = (userId: string) => (): Promise<User> =>
        fetch(`/api/users/${userId}`).then((res) => res.json());
    getLabels = (): Promise<Label[]> => fetch('/api/labels').then((res) => res.json());
    getIssueById = (issueId: string) => (): Promise<Issue> =>
        fetch(`/api/issues/${issueId}`).then((res) => res.json());
    getIssueComments = (issueId: string) => (): Promise<IssueComment[]> =>
        fetch(`/api/issues/${issueId}/comments`).then((res) => res.json());
    searchIssues = (queryString: string) => (): Promise<{ count: number; items: Issue[] }> =>
        fetch(`/api/search/issues?` + queryString).then((res) => res.json());
}

export const api = new ApiIssueTracker();
