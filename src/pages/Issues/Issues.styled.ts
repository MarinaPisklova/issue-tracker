import { Link } from 'react-router';
import styled from 'styled-components';

export const Main = styled.main`
    display: flex;
    gap: 4rem;
`;

export const Section = styled.section`
    flex: 2;
`;

export const Aside = styled.aside`
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;

export const LinkButton = styled(Link)`
    width: 100%;
    cursor: pointer;
    background: #f3f1f1;
    color: black;
    border-radius: 0.25rem;
    border: none;
    padding: 0.5rem 1rem;
    font-weight: bold;
    transition: background 0.1s ease-in-out;
    text-align: center;
    text-decoration: none;

    &:hover {
        background: rgb(229, 229, 229);
    }
`;
