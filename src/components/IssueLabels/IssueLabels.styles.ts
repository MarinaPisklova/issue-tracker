import styled from 'styled-components';

export const IssueLabelsWrapper = styled.div`
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
        align-items: baseline;
    }

    & > div.selected {
        background-color: rgb(192, 191, 191);
    }

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

export const LabelDot = styled.span`
    width: 0.5rem;
    height: 0.5rem;
    border-radius: 999px;
`;

export const LabelWrapper = styled.span`
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
    .blue.selected {
        background-color: rgba(0, 0, 255, 0.5);
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
