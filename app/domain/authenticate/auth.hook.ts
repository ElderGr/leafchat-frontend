import { useQueryClient, useMutation } from 'react-query'
import authServices from './auth.services';
import { useNotification } from '@/app/hooks'

export function useAuth(){
    const queryClient = useQueryClient();
    const notification = useNotification()

    const mutation = useMutation(authServices.signIn, {
        onSuccess() {
            queryClient.invalidateQueries('authenticate')
        },
        onError(err) {
            notification.error({
                message: 'Erro ao realizar o login'
            })
        }
    })

    return mutation
}