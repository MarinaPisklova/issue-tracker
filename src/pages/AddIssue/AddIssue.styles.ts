import styled from 'styled-components';

export const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    width: 100%;
    max-width: 65ch;
`;

export const Input = styled.input`
    width: 100%;
    padding: 0.5rem;
    color: black;
    border: solid 1px #aaa;
    background-color: #f3f1f1;
    border-radius: 0.25rem;
    font-size: 1rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
    font-family: proxima-nova, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen-Sans,
        Ubuntu, Cantarell, Helvetica Neue, sans-serif;
`;

export const Textarea = styled.textarea`
    width: 100%;
    padding: 0.5rem;
    color: black;
    border: solid 1px #aaa;
    background-color: #f3f1f1;
    border-radius: 0.25rem;
    font-size: 1rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
    font-family: proxima-nova, -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen-Sans,
        Ubuntu, Cantarell, Helvetica Neue, sans-serif;
    height: 10rem;
`;

export const SubmitButton = styled.button`
    width: max-content;
    align-self: flex-end;
    font-size: 1rem;
`;
