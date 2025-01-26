import { useInfiniteQuery } from '@tanstack/react-query';
import { api } from 'src/api/api';

export function useIssueComments(issueNumber: string) {
    return useInfiniteQuery({
        queryKey: ['issues', issueNumber, 'comments'],
        queryFn: api.getIssueComments(issueNumber.toString()),
        initialPageParam: 1,
        getNextPageParam: (lastPage, pages) => {
            if (lastPage.length === 0) return;
            return pages.length + 1;
        },
    });
}
