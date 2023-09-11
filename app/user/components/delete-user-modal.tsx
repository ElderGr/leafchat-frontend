import { Button, Modal } from "antd";
import { useUserContext } from "@/app/context/users";
import { useDeleteUsers } from "@/app/domain/user/user.hook";

export function DeleteUserModal(){
    const { 
        deleteUserForm, 
        closeDeleteUserForm, 
        selectedUser 
    } = useUserContext()

    const deleteUser = useDeleteUsers()

    const handleFinish = () => {
        deleteUser
            .mutateAsync(selectedUser ? selectedUser.id : '')
            .then(() => closeDeleteUserForm())
    }

    return (
        <Modal 
        title='Remover usuário' 
        open={deleteUserForm} 
        onCancel={closeDeleteUserForm}
        footer={[]}
        >
            <h2>Você tem certeza que deseja excluir o usuário {selectedUser ? selectedUser.name : ''}</h2>
            <div>
                <Button htmlType="button" onClick={closeDeleteUserForm}>
                    Cancelar
                </Button>
                <Button htmlType="button" onClick={handleFinish}>
                    Confirmar
                </Button>
            </div>
        </Modal>
    )
}