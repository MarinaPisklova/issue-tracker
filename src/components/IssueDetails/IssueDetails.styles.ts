import styled from 'styled-components';

export const IssueDetailsWrapper = styled.div`
    & aside img {
        width: 1.5rem;
        height: 1.5rem;
        border-radius: 999px;
    }

    & aside > div {
        position: relative;
    }
    & aside svg {
        cursor: pointer;
        transition: transform 0.25s ease-in-out;
    }
    & aside svg:hover {
        transform: rotate(30deg);
    }
    & aside .status-select {
        font-size: 0.8rem;
    }
`;
