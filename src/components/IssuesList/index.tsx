import IssueSearchForm from '@components/IssueSearchForm';
import { IssuesListWrapper, IssuesWrapper } from './IssuesList.styles';
import IssueItem from '@components/IssueItem';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { ChangeEvent, FormEvent, useState } from 'react';
import { api } from 'src/api/api';
import { Issue } from 'src/types';
import Loader from '@components/Loader';

interface IIssuesList {
    labels: string[];
    status: string;
}

function SearchResults({
    searchQuery,
}: {
    searchQuery: ReturnType<typeof useQuery<{ count: number; items: Issue[] }>>;
}) {
    if (searchQuery.isLoading) {
        return <p>Loading...</p>;
    }

    return (
        <IssuesWrapper>
            <h2>Search Results</h2>
            <p>{searchQuery.data?.count} Results</p>
            <IssuesListWrapper>
                {searchQuery.data?.items.map((issue) => (
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
        </IssuesWrapper>
    );
}

function AllIssues({ issuesQuery }: { issuesQuery: ReturnType<typeof useQuery<Issue[]>> }) {
    return (
        <IssuesWrapper>
            <h2>Issues List {issuesQuery.fetchStatus === 'fetching' ? <Loader /> : null}</h2>
            {issuesQuery.isLoading ? (
                <p>Loading...</p>
            ) : issuesQuery.isError ? (
                <p>{issuesQuery.error.message}</p>
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
        </IssuesWrapper>
    );
}

export default function IssuesList({ labels, status }: IIssuesList) {
    const queryClient = useQueryClient();
    const statusString = status ? `&status=${status}` : '';
    const labelsString = labels.map((label) => `labels[]=${label}`).join('&');
    const issuesQuery = useQuery({
        queryKey: ['issues', { labels, status }],
        queryFn: async ({ signal }) => {
            const results = await api.getIssues(`${statusString}&${labelsString}`)({ signal });
            results.forEach((issue) => {
                queryClient.setQueryData(['issues', issue.number.toString()], issue);
            });

            return results;
        },
    });

    const [searchValue, setSearchValue] = useState('');

    const searchQuery = useQuery({
        queryKey: ['issues', 'search', searchValue],
        queryFn: api.searchIssues(`q=${searchValue}`),
        enabled: searchValue.length > 0,
    });

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const form = event.currentTarget;
        const searchValue = form.elements.namedItem('search') as HTMLInputElement;
        setSearchValue(searchValue.value);
    };

    const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.value.length === 0) {
            setSearchValue('');
        }
    };

    return (
        <div>
            <IssueSearchForm
                label="Search Issues"
                onSubmit={handleSubmit}
                onChange={handleChange}
            />
            {searchValue ? (
                <SearchResults searchQuery={searchQuery} />
            ) : (
                <AllIssues issuesQuery={issuesQuery} />
            )}
        </div>
    );
}
