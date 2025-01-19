import styled from 'styled-components';

export const SearchForm = styled.form`
    margin-bottom: 1rem;

    & label {
        margin-bottom: 0.25rem;
        display: block;
        font-weight: bold;
    }
    & input {
        width: 100%;
        font-size: 1rem;
        border-radius: 0.25rem;
        border: solid 1px rgba(46, 46, 46, 0.25);
        padding: 0.5rem 1rem;
        transition: border 0.1s ease-in-out;
        background-color: white;
        color: black;
    }
`;
