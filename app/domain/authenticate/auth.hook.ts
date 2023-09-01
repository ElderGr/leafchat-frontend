import { useQueryClient, useMutation } from 'react-query'
import authServices from './auth.services';

export function useAuth(){
    const queryClient = useQueryClient();

    const mutation = useMutation(authServices.signIn, {
        onSuccess() {
            queryClient.invalidateQueries('authenticate')
        }
    })

    return mutation
}