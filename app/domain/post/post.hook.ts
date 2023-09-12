import { useMutation, useQuery, useQueryClient } from "react-query"
import postsService from "./post.services"
import { useNotification } from "@/app/hooks";

export function useListPost(params?: any){
    const query = useQuery(['posts', params], () => postsService.findMany(params))
    
    return query
}

export function useLikeOnPost(){
    const queryClient = useQueryClient();
    const notification = useNotification()

    const mutation = useMutation(postsService.addLike, {
        onSuccess(res: any) {            
            queryClient.invalidateQueries('posts')
        },
        onError(err) {
            notification.error({
                message: 'Erro ao dar like'
            })
        }
    }) 

    return mutation
}