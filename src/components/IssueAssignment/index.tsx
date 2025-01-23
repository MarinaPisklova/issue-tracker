import { GoGear } from 'react-icons/go';
import { useState } from 'react';
import { useUsersData } from 'src/helpers/useUsersData';
import { IssueAssignmentWrapper, Menu } from './IssueAssignment.styles';
import { api } from 'src/api/api';
import { Issue } from 'src/types';
import { useUserData } from 'src/helpers/useUserData';
import { useMutation, useQueryClient } from '@tanstack/react-query';

interface IIssueAssignment {
    assignee: string | null;
    issueNumber: string;
}

export default function IssueAssignment({ assignee, issueNumber }: IIssueAssignment) {
    const queryClient = useQueryClient();
    const usersQuery = useUsersData();
    const user = useUserData(assignee);
    const [menuOpen, setMenuOpen] = useState(false);

    const setAssignment = useMutation({
        mutationFn: (assignee: string) => api.updateIssue(issueNumber, { assignee }),
        onMutate: (assignee: string) => {
            const issue = queryClient.getQueryData<Issue>(['issues', issueNumber]);
            const oldAssignee = issue?.assignee;
            queryClient.setQueryData(['issues', issueNumber], (data: Issue) => ({
                ...data,
                assignee,
            }));

            return function rollback() {
                queryClient.setQueryData(['issues', issueNumber], (data: Issue) => ({
                    ...data,
                    assignee: oldAssignee,
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
        <IssueAssignmentWrapper>
            <div>
                <span>Assignment</span>
                {user.isSuccess && (
                    <div>
                        <img src={user.data.profilePictureUrl} />
                        {user.data.name}
                    </div>
                )}
            </div>
            <GoGear onClick={() => !usersQuery.isLoading && setMenuOpen((open) => !open)} />
            {menuOpen && (
                <Menu>
                    {usersQuery.data?.map((user) => (
                        <div key={user.id} onClick={() => setAssignment.mutate(user.id)}>
                            <img src={user.profilePictureUrl} />
                            {user.name}
                        </div>
                    ))}
                </Menu>
            )}
        </IssueAssignmentWrapper>
    );
}
