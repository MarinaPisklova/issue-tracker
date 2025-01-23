import { StatusSelect } from '@components/StatusSelect';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { api } from 'src/api/api';
import { Issue, IssueStatus as IssueStatusType } from 'src/types';
import { IssueStatusWrapper } from './IssueStatus.styles';

interface IIssueStatus {
    status: IssueStatusType;
    issueNumber: string;
}
export default function IssueStatus({ status, issueNumber }: IIssueStatus) {
    const queryClient = useQueryClient();

    const setStatus = useMutation({
        mutationFn: (status: IssueStatusType) => api.updateIssue(issueNumber, { status }),
        onMutate: (status) => {
            const issue = queryClient.getQueryData<Issue>(['issues', issueNumber]);
            const oldStatus = issue?.status;
            queryClient.setQueryData(['issues', issueNumber], (data: Issue) => ({
                ...data,
                status,
            }));

            return function rollback() {
                queryClient.setQueryData(['issues', issueNumber], (data: Issue) => ({
                    ...data,
                    status: oldStatus,
                }));
            };
        },
        onError: (_error, _variables, rollback) => {
            rollback?.();
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['issues', issueNumber], exact: true });
        },
    });
    return (
        <IssueStatusWrapper>
            <div>
                <span>Status</span>
                <StatusSelect
                    noEmptyOption
                    value={status}
                    onChange={(event) => setStatus.mutate(event.target.value as IssueStatusType)}
                />
            </div>
        </IssueStatusWrapper>
    );
}
