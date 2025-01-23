import { useIssueData } from 'src/helpers/useIssueData';
import { useIssueComments } from 'src/helpers/useIssueComments';
import { useParams } from 'react-router';
import { IssueHeader } from '@components/IssueHeader';
import { IssueComment } from '@components/IssueComment';
import { IssueDetailsWrapper } from './IssueDetails.styles';
import IssueStatus from '@components/IssueStatus';
import IssueAssignment from '@components/IssueAssignment';
import IssueLabels from '@components/IssueLabels';

export default function IssueDetails() {
    const { number } = useParams();
    const issueQuery = useIssueData(number ?? '');
    const commentsQuery = useIssueComments(number ?? '');

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
                                commentsQuery.data?.map((comment) => (
                                    <IssueComment key={comment.id} {...comment} />
                                ))
                            )}
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
