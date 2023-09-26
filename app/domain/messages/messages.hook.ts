import { useMutation } from "react-query"
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