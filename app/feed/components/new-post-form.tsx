import { usePostContext } from "@/app/context/post";
import { Modal } from "antd";

export function NewPostForm(){
    const { newPostForm, closeNewPostForm } = usePostContext()

    return(
        <Modal
            title="Adicionar novo post"
            centered
            open={newPostForm}
            onCancel={closeNewPostForm}
        >
            <p>Adicionar novo post</p>
      </Modal>
    )
}