import { relativeDate } from 'src/helpers/relativeDate';
import { useUserData } from 'src/helpers/useUserData';
import { CommentBody, CommentHeader, CommentWrapper } from './IssueComment.styles';

interface IIssueComment {
    comment: string;
    createdBy: string;
    createdDate: Date;
}

export function IssueComment(props: IIssueComment) {
    const { comment, createdBy, createdDate } = props;
    const userQuery = useUserData(createdBy);

    if (userQuery.isLoading)
        return (
            <CommentWrapper>
                <div>
                    <CommentHeader>Loading...</CommentHeader>
                </div>
            </CommentWrapper>
        );

    return (
        <CommentWrapper>
            <img src={userQuery.data?.profilePictureUrl} alt="Commenter Avatar" />
            <div>
                <CommentHeader>
                    <span>{userQuery.data?.name}</span> commented{' '}
                    <span>{relativeDate(createdDate)}</span>
                </CommentHeader>
                <CommentBody>{comment}</CommentBody>
            </div>
        </CommentWrapper>
    );
}
