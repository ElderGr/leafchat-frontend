import { useQueryClient, useMutation } from 'react-query'
import authServices from './auth.services';
import { useNotification } from '@/app/hooks'
import { useAuthContext } from '@/app/context/auth';



export function useAuth(){
    const queryClient = useQueryClient();
    const notification = useNotification()
    const { handleSetSession, handleSetUser } = useAuthContext()

    const mutation = useMutation(authServices.signIn, {
        onSuccess(res: any) {
            queryClient.invalidateQueries('authenticate')
            
            handleSetUser(res.user)
            handleSetSession(res.token)
        },
        onError(err) {
            notification.error({
                message: 'Erro ao realizar o login'
            })
        }
    })

    return mutation
}