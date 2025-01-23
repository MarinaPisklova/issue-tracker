import styled from 'styled-components';

export const IssueAssignmentWrapper = styled.div`
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

    &:last-child {
        border-bottom: none;
    }

    & > div > div {
        display: flex;
        align-items: center;
        gap: 0.5rem;
    }
`;

export const Menu = styled.div`
    z-index: 10;
    position: absolute;
    top: 2.5rem;
    right: 1.5rem;
    width: 12rem;
    background-color: #f4f4f4;
    border: solid 1px #aaa;
    border-radius: 0.25rem;
    overflow: hidden;

    & > div {
        display: flex;
        align-items: center;
        padding: 0.25rem 0.5rem;
        cursor: pointer;
    }

    &.labels > div {
        align-items: baseline;
    }

    & > div:hover {
        background-color: rgb(211, 211, 211);
    }
`;
