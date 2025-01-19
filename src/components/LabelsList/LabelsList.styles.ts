import styled from 'styled-components';

export const LabelsWrapper = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
`;

export const LabelsListWrapper = styled.ul`
    list-style: none;
    padding: 0;
    display: flex;
    gap: 0.5rem;
    flex-wrap: wrap;
`;

export const LabelButton = styled.button`
    font-size: 0.75rem;
    font-weight: 600;
    border-radius: 999px;
    padding: 0.1rem 0.3rem;
    border: solid 1px;
    text-align: center;
    white-space: nowrap;

    &.red {
        background-color: rgba(255, 161, 161, 0.2);
        color: red;
        border-color: red;
    }

    &.red:hover,
    &.red.selected {
        background-color: rgba(255, 83, 83, 0.4);
    }

    &.blue {
        background-color: rgba(0, 0, 255, 0.1);
        color: rgb(0, 120, 255);
        border-color: blue;
    }

    &.blue:hover,
    &.blue.selected {
        background-color: rgba(77, 77, 255, 0.63);
    }

    &.green {
        background-color: rgba(220, 255, 255, 0.2);
        color: green;
        border-color: green;
    }

    &.green:hover,
    &.green.selected {
        background-color: rgba(0, 208, 208, 0.5);
    }

    &.orange {
        background-color: rgba(255, 165, 0, 0.2);
        color: orange;
        border-color: orange;
    }

    &.orange:hover,
    &.orange.selected {
        background-color: rgba(255, 165, 0, 0.5);
    }

    &.lime {
        background-color: rgba(205, 255, 205, 0.2);
        color: lightgreen;
        border-color: lightgreen;
    }

    &.lime:hover,
    &.lime.selected {
        background-color: rgba(83, 112, 83, 0.5);
    }

    &.gray {
        background-color: rgba(196, 196, 196, 0.2);
        color: gray;
        border-color: gray;
    }

    &.gray:hover,
    &.gray.selected {
        background-color: rgba(100, 100, 100, 0.5);
    }

    &.rebeccapurple {
        background-color: rgba(102, 51, 153, 0.2);
        color: rebeccapurple;
        border-color: rebeccapurple;
    }

    &.rebeccapurple:hover,
    &.rebeccapurple.selected {
        background-color: rgba(102, 51, 153, 0.5);
    }
`;
