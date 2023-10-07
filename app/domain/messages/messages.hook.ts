import { useMutation, useQuery } from "react-query"
import messagesService from "./messages.services"
import { useNotification } from "@/app/hooks";


export function useCreateMessage(){
    const notification = useNotification()

    const mutation = useMutation(messagesService.create, {
        onError(err) {
            notification.error({
                message: 'Erro ao enviar a mensagem'
            })
        }
    }) 

    return mutation 
}

export function useListMessages(params?: any){
    const query = useQuery(['messages', params], 
        () => messagesService.findMany(params), 
        {keepPreviousData: true}
    )
    
    return query
}