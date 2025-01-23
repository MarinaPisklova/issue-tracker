import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Form, Input, SubmitButton, Textarea } from './AddIssue.styles';
import { api } from 'src/api/api';
import { AddIssueBody } from 'src/types';
import { FormEvent } from 'react';
import { useNavigate } from 'react-router';

export default function AddIssue() {
    const queryClient = useQueryClient();
    const navigate = useNavigate();

    const addIssue = useMutation({
        mutationKey: ['addIssue'],
        mutationFn: (issueBody: AddIssueBody) => api.addIssue(issueBody),
        onSuccess: (data) => {
            queryClient.invalidateQueries({
                queryKey: ['issues'],
                exact: true,
            });
            queryClient.setQueryData(['issues', data.number.toString()], data);
            navigate(`/issue/${data.number}`);
        },
    });

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        if (addIssue.isPending) return;

        const form = event.currentTarget;
        const title = form.elements.namedItem('title') as HTMLInputElement;
        const comment = form.elements.namedItem('comment') as HTMLInputElement;

        addIssue.mutate({
            comment: comment.value,
            title: title.value,
        });
    };

    return (
        <div>
            <h2>Add Issue</h2>
            <Form onSubmit={handleSubmit}>
                <label htmlFor="title">Title</label>
                <Input type="text" id="title" placeholder="Title" name="title" />
                <label htmlFor="comment">Comment</label>
                <Textarea placeholder="Comment" id="comment" name="comment" />
                <SubmitButton type="submit" disabled={addIssue.isPending}>
                    {addIssue.isPending ? 'Adding Issue...' : 'Add Issue'}
                </SubmitButton>
            </Form>
        </div>
    );
}
