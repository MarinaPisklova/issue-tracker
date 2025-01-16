import styled from 'styled-components';

export const IssueListItem = styled.li`
    display: flex;
    justify-content: space-between;
    align-items: center;
    gap: 1rem;
    padding: 0.5rem 1rem;
    border: solid 1px rgba(84 84 84 / 25%);
    border-radius: 0.25rem;

    & div svg {
        width: 1.25rem;
        height: 1.25rem;
    }

    &:hover {
        background-color: rgba(139, 139, 139, 0.1);
    }

    & a {
        text-decoration: none;
        margin-right: 1rem;
    }

    & small {
        font-size: 0.75rem;
        color: #aaa;
    }
`;

export const IssueContent = styled.div`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    & > span > span {
        font-size: 0.75rem;
        font-weight: 600;
        border-radius: 999px;
        padding: 0.1rem 0.3rem;
        border: solid 1px;
        text-align: center;
        white-space: nowrap;
    }
`;

export const AssignedToImg = styled.img`
    width: 1.5rem;
    border-radius: 100%;
`;

export const CommentCountBox = styled.div`
    display: flex;
    justify-content: center;
    align-items: flex-end;
    gap: 0.25rem;
    color: #aaa;
    font-size: 0.9rem;
`;
