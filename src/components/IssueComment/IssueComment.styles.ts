import styled from 'styled-components';

export const CommentWrapper = styled.div`
    margin: 1rem 0;
    display: flex;
    gap: 1rem;

    & > img {
        width: 2.5rem;
        height: 2.5rem;
        border-radius: 999px;
    }

    & > div {
        flex: 1;
        border: solid 1px #aaa;
        border-radius: 0.25rem;
        overflow: hidden;
    }
`;

export const CommentHeader = styled.div`
    padding: 0.5rem;
    border-bottom: solid 1px #aaa;
    background-color: #f4f4f4;
    font-size: 0.9rem;
    color: #aaa;

    & > span:first-child {
        font-weight: bold;
        color: #111;
    }
`;

export const CommentBody = styled.div`
    padding: 0.75rem;
`;
