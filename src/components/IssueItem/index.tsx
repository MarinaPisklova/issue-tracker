import { GoComment, GoIssueClosed, GoIssueOpened } from 'react-icons/go';
import { useUserData } from 'src/helpers/useUserData';
import { AssignedToImg, CommentCountBox, IssueContent, IssueListItem } from './IssueItem.styles';
import { Link } from 'react-router';
import { relativeDate } from 'src/helpers/relativeDate';
import { defaultAvatar } from 'src/consts';
import { Label } from '@components/Label';
import { useQueryClient } from '@tanstack/react-query';
import { api } from 'src/api/api';

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
    const queryClient = useQueryClient();

    const handleMouseEnter = () => {
        queryClient.prefetchQuery({
            queryKey: ['issues', number.toString()],
            queryFn: api.getIssueById(number.toString()),
        });
        queryClient.prefetchInfiniteQuery({
            queryKey: ['issues', number.toString(), 'comments'],
            queryFn: api.getIssueComments(number.toString()),
            initialPageParam: 1,
        });
    };

    return (
        <IssueListItem onMouseEnter={handleMouseEnter}>
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
