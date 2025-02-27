import { useQuery } from '@tanstack/react-query';
import { api } from 'src/api/api';

export function useUserData(userId: string | null) {
    const usersData = useQuery({
        queryKey: ['users', userId],
        queryFn: api.getUserById(userId ?? ''),
        staleTime: 1000 * 60 * 5,
    });

    return usersData;
}
