import { useQuery } from '@tanstack/react-query';
import { api } from 'src/api/api';
import { placeholderLabels } from './placeholderData';

export function useLabelsData() {
    const labelsData = useQuery({
        queryKey: ['labels'],
        queryFn: api.getLabels,
        staleTime: 1000 * 60 * 60,
        placeholderData: placeholderLabels,
    });

    return labelsData;
}
