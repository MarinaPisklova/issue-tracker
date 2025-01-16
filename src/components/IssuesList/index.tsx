import { IssuesListWrapper } from './IssuesList.styles';
import IssueItem from '@components/IssueItem';
import { useQuery } from '@tanstack/react-query';
import { api } from 'src/api/api';

interface IIssuesList {
    labels: string[];
    status: string;
}

export default function IssuesList({ labels, status }: IIssuesList) {
    const statusString = status ? `&status=${status}` : '';
    const labelsString = labels.map((label) => `labels[]=${label}`).join('&');
    const issuesQuery = useQuery({
        queryKey: ['issues', { labels, status }],
        queryFn: api.getIssues(`${statusString}&${labelsString}`),
    });

    return (
        <div>
            <h2>Issues List</h2>
            {issuesQuery.isLoading ? (
                <p>Loading...</p>
            ) : (
                <IssuesListWrapper>
                    {issuesQuery.data?.map((issue) => (
                        <IssueItem
                            key={issue.id}
                            title={issue.title}
                            number={issue.number}
                            assignee={issue.assignee}
                            commentCount={issue.comments.length}
                            createdBy={issue.createdBy}
                            createdDate={issue.createdDate}
                            labels={issue.labels}
                            status={issue.status}
                        />
                    ))}
                </IssuesListWrapper>
            )}
        </div>
    );
}
