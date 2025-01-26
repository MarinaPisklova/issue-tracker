import styled from 'styled-components';

export const IssuesWrapper = styled.ul`
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

export const IssuesListWrapper = styled.ul`
    list-style: none;
    padding: 0;
    display: flex;
    flex-direction: column;
    gap: 1rem;
`;

export const Pagination = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;

    & button {
        width: max-content;
    }
`;
