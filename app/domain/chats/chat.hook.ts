import { useMutation } from "react-query"
import chatService from "./chat.services"
import { useNotification } from "@/app/hooks";

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