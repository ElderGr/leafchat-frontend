import { useMutation, useQuery } from "react-query"
import chatService from "./chat.services"
import { useNotification } from "@/app/hooks";
import { FindAllChatsDto } from "./chats.types";

export function useCreateChat(){
    const notification = useNotification()

    const mutation = useMutation(chatService.create, {
        onError(err) {
            notification.error({
                message: 'Erro ao criar o chat'
            })
        }
    }) 

    return mutation 
}


export function useFindAllChat(
    params: FindAllChatsDto, 
    queryEnabled: boolean = true
){
    const query = useQuery(
        ['chats', params], 
        () => chatService.findAll(params),
        { enabled: queryEnabled }
    )
    
    return query
}