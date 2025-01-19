import { useQuery } from '@tanstack/react-query';
import { api } from 'src/api/api';

export function useIssueComments(issueNumber: string) {
    return useQuery({
        queryKey: ['issues', issueNumber, 'comments'],
        queryFn: api.getIssueComments(issueNumber.toString()),
    });
}
