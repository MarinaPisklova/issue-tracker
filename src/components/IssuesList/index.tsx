import IssueSearchForm from '@components/IssueSearchForm';
import { IssuesListWrapper, IssuesWrapper, Pagination } from './IssuesList.styles';
import IssueItem from '@components/IssueItem';
import { keepPreviousData, useQuery, useQueryClient } from '@tanstack/react-query';
import { ChangeEvent, FormEvent, useState } from 'react';
import { api } from 'src/api/api';
import { Issue } from 'src/types';
import Loader from '@components/Loader';

interface IIssuesList {
    labels: string[];
    status: string;
    pageNum: number;
    setPageNum: (pageNum: number) => void;
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

interface IAllIssuesList {
    issuesQuery: ReturnType<typeof useQuery<Issue[]>>;
}

type TAllIssuesList = IAllIssuesList & Pick<IIssuesList, 'pageNum' | 'setPageNum'>;

function AllIssues({ issuesQuery, pageNum, setPageNum }: TAllIssuesList) {
    return (
        <IssuesWrapper>
            <h2>Issues List {issuesQuery.fetchStatus === 'fetching' ? <Loader /> : null}</h2>
            {issuesQuery.isLoading ? (
                <p>Loading...</p>
            ) : issuesQuery.isError ? (
                <p>{issuesQuery.error.message}</p>
            ) : (
                <>
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
                    <Pagination>
                        <button
                            onClick={() => {
                                if (pageNum - 1 > 0) {
                                    setPageNum(pageNum - 1);
                                }
                            }}
                            disabled={pageNum === 1}
                        >
                            Previous
                        </button>
                        <p>
                            Page {pageNum} {issuesQuery.isFetching ? '...' : ''}
                        </p>
                        <button
                            disabled={
                                issuesQuery.data?.length === 0 || issuesQuery.isPlaceholderData
                            }
                            onClick={() => {
                                if (
                                    issuesQuery.data?.length !== 0 &&
                                    !issuesQuery.isPlaceholderData
                                ) {
                                    setPageNum(pageNum + 1);
                                }
                            }}
                        >
                            Next
                        </button>
                    </Pagination>
                </>
            )}
        </IssuesWrapper>
    );
}

export default function IssuesList({ labels, status, pageNum, setPageNum }: IIssuesList) {
    const queryClient = useQueryClient();
    const statusString = status ? `&status=${status}` : '';
    const labelsString = labels.map((label) => `labels[]=${label}`).join('&');
    const paginationString = pageNum ? `&page=${pageNum}` : '';

    const issuesQuery = useQuery({
        queryKey: ['issues', { labels, status, pageNum }],
        queryFn: async ({ signal }) => {
            const results = await api.getIssues(
                `${statusString}&${labelsString}${paginationString}`,
            )({ signal });
            results.forEach((issue) => {
                queryClient.setQueryData(['issues', issue.number.toString()], issue);
            });

            return results;
        },
        placeholderData: keepPreviousData,
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
                <AllIssues issuesQuery={issuesQuery} pageNum={pageNum} setPageNum={setPageNum} />
            )}
        </div>
    );
}
