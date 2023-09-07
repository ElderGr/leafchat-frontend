import { useQueryClient, useMutation, useQuery } from 'react-query'
import userServices from './user.services';
import { useNotification } from '@/app/hooks'

export function useCreateUsers(){
    const queryClient = useQueryClient();
    const notification = useNotification()

    const mutation = useMutation(userServices.create, {
        onSuccess(res: any) {
            notification.success({
                message: 'Usuário criado com sucesso'
            })
            
            queryClient.invalidateQueries('users')
        },
        onError(err) {
            notification.error({
                message: 'Erro ao realizar o login'
            })
        }
    })

    return mutation
}

export function useListUsers(params?: any){
    const query = useQuery(['users', params], () => userServices.findMany(params))
    
    return query
}