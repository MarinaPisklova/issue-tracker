import styled from 'styled-components';

export const HeaderWrapper = styled.header`
    border-bottom: solid 1px #aaa;
    padding-bottom: 1rem;

    & h2 span {
        color: #aaa;
    }

    & div {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        color: #aaa;
        font-size: 0.9rem;
    }

    & .created-by {
        font-weight: bold;
    }

    & .open,
    & .closed {
        color: white;
        display: flex;
        align-items: center;
        gap: 0.5rem;
        width: max-content;
        padding: 0.25rem 0.5rem;
        border-radius: 999px;
        font-size: 1rem;
    }
    & .open {
        background: green;
    }
    & .closed {
        background: red;
    }
`;
