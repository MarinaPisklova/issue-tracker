import { useIssueData } from 'src/helpers/useIssueData';
import { useIssueComments } from 'src/helpers/useIssueComments';
import { useParams } from 'react-router';
import { IssueHeader } from '@components/IssueHeader';
import { IssueComment } from '@components/IssueComment';
import { IssueDetailsWrapper } from './IssueDetails.styles';
import IssueStatus from '@components/IssueStatus';
import IssueAssignment from '@components/IssueAssignment';
import IssueLabels from '@components/IssueLabels';
import useScrollToBottomAction from 'src/helpers/useScrollToBottomAction';
import Loader from '@components/Loader';

export default function IssueDetails() {
    const { number } = useParams();
    const issueQuery = useIssueData(number ?? '');
    const commentsQuery = useIssueComments(number ?? '');

    useScrollToBottomAction(document, commentsQuery.fetchNextPage, 100);

    if (!issueQuery.data) return null;

    return (
        <IssueDetailsWrapper>
            {issueQuery.isLoading ? (
                <p>Loading issue...</p>
            ) : (
                <>
                    <IssueHeader {...issueQuery.data} />

                    <main>
                        <section>
                            {commentsQuery.isLoading ? (
                                <p>Loading...</p>
                            ) : (
                                commentsQuery.data?.pages.map((commentPage) =>
                                    commentPage.map((comment) => (
                                        <IssueComment key={comment.id} {...comment} />
                                    )),
                                )
                            )}
                            {commentsQuery.isFetchingNextPage && <Loader />}
                        </section>
                        <aside>
                            <IssueStatus
                                status={issueQuery.data.status}
                                issueNumber={issueQuery.data.number.toString()}
                            />
                            <IssueAssignment
                                assignee={issueQuery.data.assignee}
                                issueNumber={issueQuery.data.number.toString()}
                            />
                            <IssueLabels
                                labels={issueQuery.data.labels}
                                issueNumber={issueQuery.data.number.toString()}
                            />
                        </aside>
                    </main>
                </>
            )}
        </IssueDetailsWrapper>
    );
}
