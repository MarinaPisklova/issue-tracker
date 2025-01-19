import { useQuery } from '@tanstack/react-query';
import { api } from 'src/api/api';

export function useIssueData(issueNumber: string) {
    return useQuery({
        queryKey: ['issues', issueNumber],
        queryFn: api.getIssueById(issueNumber.toString()),
    });
}
