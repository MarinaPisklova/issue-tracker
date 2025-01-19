import { GoIssueOpened, GoIssueClosed } from 'react-icons/go';
import { possibleStatus } from 'src/consts';
import { relativeDate } from 'src/helpers/relativeDate';
import { useUserData } from 'src/helpers/useUserData';
import { Issue } from 'src/types';
import { HeaderWrapper } from './IssueHeader.styles';

export const IssueHeader = (props: Issue) => {
    const { title, number, status = 'todo', createdBy, createdDate, comments } = props;
    const statusObject = possibleStatus.find((pstatus) => pstatus.id === status);

    const createdUser = useUserData(createdBy);
    return (
        <HeaderWrapper>
            <h2>
                {title} <span>#{number}</span>
            </h2>
            <div>
                <span className={status === 'done' || status === 'cancelled' ? 'closed' : 'open'}>
                    {status === 'done' || status === 'cancelled' ? (
                        <GoIssueClosed />
                    ) : (
                        <GoIssueOpened />
                    )}
                    {statusObject?.label}
                </span>
                <span className="created-by">
                    {createdUser.isLoading ? '...' : createdUser.data?.name}
                </span>{' '}
                opened this issue {relativeDate(createdDate)} · {comments.length} comments
            </div>
        </HeaderWrapper>
    );
};
