import { useQuery } from '@tanstack/react-query';
import { api } from 'src/api/api';

export function useLabelsData() {
    const labelsData = useQuery({
        queryKey: ['labels'],
        queryFn: api.getLabels,
    });

    return labelsData;
}
