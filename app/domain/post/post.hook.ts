import { useQuery } from "react-query"
import postsService from "./post.services"

export function useListPost(params?: any){
    const query = useQuery(['users', params], () => postsService.findMany(params))
    
    return query
}