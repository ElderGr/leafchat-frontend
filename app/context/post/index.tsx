import { createContext, useContext, useState } from 'react';
import { PostContextProps, PostProviderProps } from './types';
import { Post } from '@/app/domain/post/post.types';

const PostContext = createContext({} as PostContextProps)

function PostProvider(props: PostProviderProps) {
    const [selectedPost, setSelectedPost] = useState<Post | null>(null)
    const [newPostForm, setNewPostForm] = useState(false)
    const [commentsOnPost, setCommentsOnPost] = useState(false)

    const openNewPostForm = () => {
        setNewPostForm(true)
    }

    const closeNewPostForm = () => {
        setNewPostForm(false)
    }

    const openCommentsOnForm = (post: Post) => {
        setSelectedPost(post)
        setCommentsOnPost(true)
    }

    const closeCommentsOnForm = () => {
        setSelectedPost(null)
        setCommentsOnPost(false)
    }

    return (
        <PostContext.Provider value={{ 
            selectedPost,
            newPostForm,
            commentsOnPost,
            openNewPostForm,
            closeNewPostForm,
            openCommentsOnForm,
            closeCommentsOnForm
        }}>
            {props.children}
        </PostContext.Provider>
    );
}

export function usePostContext() {
  return useContext(PostContext);
}

export default PostProvider;
