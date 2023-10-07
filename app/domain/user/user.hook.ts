import { useQueryClient, useMutation, useQuery } from 'react-query'
import userServices from './user.services';
import { useNotification } from '@/app/hooks'
import { FindAllUsersParams } from './user.types';

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
                message: 'Erro ao criar o usuário'
            })
        }
    })

    return mutation
}

export function useEditUsers(){
    const queryClient = useQueryClient();
    const notification = useNotification()

    const mutation = useMutation(userServices.edit, {
        onSuccess(res: any) {
            notification.success({
                message: 'Usuário atualizado com sucesso'
            })
            
            queryClient.invalidateQueries('users')
        },
        onError(err) {
            notification.error({
                message: 'Erro ao atualizar o usuário'
            })
        }
    })

    return mutation
}

export function useListUsers(params: FindAllUsersParams){
    const query = useQuery(['users', params], () => userServices.findMany(params))
    
    return query
}

export function useDeleteUsers(){
    const queryClient = useQueryClient();
    const notification = useNotification()

    const mutation = useMutation(userServices.remove, {
        onSuccess(res: any) {
            notification.success({
                message: 'Usuário removido com sucesso'
            })
            
            queryClient.invalidateQueries('users')
        },
        onError(err) {
            notification.error({
                message: 'Erro ao remover o usuário'
            })
        }
    })

    return mutation
}