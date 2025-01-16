import { GoComment, GoIssueClosed, GoIssueOpened } from 'react-icons/go';
import { useUserData } from 'src/helpers/useUserData';
import { AssignedToImg, CommentCountBox, IssueContent, IssueListItem } from './IssueItem.styles';
import { Link } from 'react-router';
import { relativeDate } from 'src/helpers/relativeDate';
import { defaultAvatar } from 'src/consts';
import { Label } from '@components/Label';

interface IIssueItem {
    title: string;
    commentCount: number;
    number: number;
    status: 'backlog' | 'todo' | 'inProgress' | 'done' | 'cancelled';
    createdDate: Date;
    createdBy: string;
    assignee: string | null;
    labels: string[];
}

export default function IssueItem(props: IIssueItem) {
    const { title, number, assignee, commentCount, createdBy, createdDate, labels, status } = props;
    const assigneeUserQuery = useUserData(assignee);
    const createdByUserQuery = useUserData(createdBy);

    return (
        <IssueListItem>
            <div>
                {status === 'done' || status === 'cancelled' ? (
                    <GoIssueClosed style={{ color: 'red' }} />
                ) : (
                    <GoIssueOpened style={{ color: 'green' }} />
                )}
            </div>
            <IssueContent>
                <span>
                    <Link to={`/issue/${number}`}>{title}</Link>
                    {labels.map((label) => (
                        <Label key={label} label={label} />
                    ))}
                </span>
                <small>
                    #{number} opened {relativeDate(createdDate)}{' '}
                    {createdByUserQuery.isSuccess ? `by ${createdByUserQuery.data.name}` : ''}
                </small>
            </IssueContent>
            {assignee ? (
                <AssignedToImg
                    src={
                        assigneeUserQuery.isSuccess
                            ? assigneeUserQuery.data.profilePictureUrl
                            : defaultAvatar
                    }
                    alt={`Assigned to ${
                        assigneeUserQuery.isSuccess ? assigneeUserQuery.data.name : 'avatar'
                    }`}
                />
            ) : null}
            <CommentCountBox>
                {commentCount > 0 ? (
                    <>
                        <GoComment />
                        {commentCount}
                    </>
                ) : null}
            </CommentCountBox>
        </IssueListItem>
    );
}
