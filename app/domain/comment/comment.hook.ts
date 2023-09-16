import { useMutation, useQuery, useQueryClient } from "react-query"
import commentService from "./comment.service"

export function useListComment(params?: any){
    const query = useQuery(['comments', params], () => commentService.getCommentById(params))
    
    return query
}
