import { useMutation, useQuery, useQueryClient } from "react-query"
import commentService from "./comment.service"
import { useNotification } from "@/app/hooks";

export function useListComment(params?: any){
    const query = useQuery(['comments', params], () => commentService.getCommentById(params), {keepPreviousData: true})
    console.log(query)
    return query
}

export function useCreateComment(){
    const queryClient = useQueryClient();
    const notification = useNotification()

    const mutation = useMutation(commentService.create, {
        onSuccess(res: any) {
            notification.success({
                message: 'Comentário enviado com sucesso'
            })
            queryClient.invalidateQueries('comments')
        },
        onError(err) {
            notification.error({
                message: 'Erro ao comentar!' + err
            })
        }
    }) 

    return mutation 
}


