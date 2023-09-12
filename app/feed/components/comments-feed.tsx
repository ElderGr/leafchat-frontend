import { usePostContext } from "@/app/context/post";
import { Modal } from "antd";

export function CommentFeed(){
    const { commentsOnPost, closeCommentsOnForm } = usePostContext()

    return(
        <Modal
            title="Comentários"
            centered
            open={commentsOnPost}
            onCancel={closeCommentsOnForm}
        >
            <p>Comentários</p>
      </Modal>
    )
}