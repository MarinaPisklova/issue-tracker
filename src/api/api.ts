import { Issue, Label, User } from 'src/types';

class ApiIssueTracker {
    getIssues = (queryString: string) => (): Promise<Issue[]> =>
        fetch(`/api/issues?` + queryString).then((res) => res.json());
    getUserById = (userId: string) => (): Promise<User> =>
        fetch(`/api/users/${userId}`).then((res) => res.json());
    getLabels = (): Promise<Label[]> => fetch('/api/labels').then((res) => res.json());
}

export const api = new ApiIssueTracker();
