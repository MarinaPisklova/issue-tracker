import { useMutation, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react';
import { GoGear } from 'react-icons/go';
import { api } from 'src/api/api';
import { useLabelsData } from 'src/helpers/useLabelsData';
import { Issue } from 'src/types';
import { IssueLabelsWrapper, LabelDot, LabelWrapper, Menu } from './IssueLabels.styles';

interface IIssueLabels {
    labels: string[];
    issueNumber: string;
}

export default function IssueLabels({ labels, issueNumber }: IIssueLabels) {
    const queryClient = useQueryClient();
    const [menuOpen, setMenuOpen] = useState(false);
    const labelsQuery = useLabelsData();

    const setLabels = useMutation({
        mutationFn: (labelId: string) => {
            const newLabels = labels.includes(labelId)
                ? labels.filter((currentLabel) => currentLabel !== labelId)
                : [...labels, labelId];
            return api.updateIssue(issueNumber, { labels: newLabels });
        },
        onMutate: (labelId) => {
            const issue = queryClient.getQueryData<Issue>(['issues', issueNumber]);
            const oldLabels = issue?.labels ?? [];
            const newLabels = oldLabels?.includes(labelId)
                ? oldLabels.filter((label) => label !== labelId)
                : [...oldLabels, labelId];

            queryClient.setQueryData(['issues', issueNumber], (data: Issue) => ({
                ...data,
                labels: newLabels,
            }));
            return function rollback() {
                queryClient.setQueryData(['issues', issueNumber], (data: Issue) => {
                    const rollbackLabels = oldLabels?.includes(labelId)
                        ? [...data.labels, labelId]
                        : data.labels.filter((label) => label !== labelId);
                    return {
                        ...data,
                        labels: rollbackLabels,
                    };
                });
            };
        },
        onError: (_error, _variables, rollback) => {
            rollback?.();
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['issues', issueNumber], exact: true });
        },
    });

    return (
        <IssueLabelsWrapper>
            <div>
                <span>Labels</span>
                {labelsQuery.isLoading
                    ? null
                    : labels.map((label) => {
                          const labelObject = labelsQuery.data?.find(
                              (queryLabel) => queryLabel.id === label,
                          );
                          if (!labelObject) return null;
                          return (
                              <LabelWrapper key={label} className={`${labelObject.color}`}>
                                  {labelObject.name}
                              </LabelWrapper>
                          );
                      })}
            </div>
            <GoGear onClick={() => !labelsQuery.isLoading && setMenuOpen((open) => !open)} />
            {menuOpen && (
                <Menu>
                    {labelsQuery.data?.map((label) => {
                        const selected = labels.includes(label.id);
                        return (
                            <div
                                key={label.id}
                                className={selected ? 'selected' : ''}
                                onClick={() => setLabels.mutate(label.id)}
                            >
                                <LabelDot style={{ backgroundColor: label.color }}></LabelDot>
                                {label.name}
                            </div>
                        );
                    })}
                </Menu>
            )}
        </IssueLabelsWrapper>
    );
}
