import styled from 'styled-components';

export const IssueStatusWrapper = styled.div`
    border-bottom: solid 1px #aaa;
    padding: 1rem 0;
    display: flex;
    align-items: center;
    justify-content: space-between;

    & span {
        font-size: 0.9rem;
        font-weight: bold;
        display: block;
        margin-bottom: 0.5rem;
    }
`;
