import { Modal } from "antd";
import { UserForm } from "./User-Form";
import { useUserContext } from "@/app/context/users";

export function UserModal(){
  const { userForm, selectedUser, closeUserForm } = useUserContext()
  return (
    <Modal 
      title={!!selectedUser ? 'Editar usuário' : 'Adicionar usuário'} 
      open={userForm} 
      onCancel={closeUserForm}
      footer={[]}
    >
      <UserForm />
    </Modal>
  )
}