import { useQuery } from '@tanstack/react-query';
import { api } from 'src/api/api';

export function useUsersData() {
    const usersData = useQuery({
        queryKey: ['users'],
        queryFn: api.getUsers,
    });

    return usersData;
}
