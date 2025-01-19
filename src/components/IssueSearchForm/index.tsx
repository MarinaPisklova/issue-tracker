import { ChangeEvent, FormEvent } from 'react';
import { SearchForm } from './IssueSearchForm.styles';

interface IIssueSearchForm {
    label: string;
    onSubmit: (event: FormEvent<HTMLFormElement>) => void;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function IssueSearchForm(props: IIssueSearchForm) {
    const { label, onChange, onSubmit } = props;

    return (
        <SearchForm onSubmit={onSubmit}>
            <label htmlFor="search">{label}</label>
            <input
                type="search"
                placeholder="Search"
                name="search"
                id="search"
                onChange={onChange}
            />
        </SearchForm>
    );
}
