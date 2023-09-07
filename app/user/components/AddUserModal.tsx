import { Button, Modal } from "antd";
import { useState } from "react";
import { AddUserForm } from "./AddUserForm";

export function AddUserModal(){

    const [isModalOpen, setIsModalOpen] = useState(false);
    const showModal = () => {
      setIsModalOpen(true);
    };

    const handleOk = () => {
      setIsModalOpen(false);
    };

    const handleCancel = () => {
      setIsModalOpen(false);
    };
    return (    
        <>
            <Modal title="Adicionar usuário" open={isModalOpen} onOk={handleOk} onCancel={handleCancel}>
                <AddUserForm />
            </Modal>
            <Button 
                type='primary' 
                htmlType='button'
                onClick={showModal}
                size="large"
            >
              Adicionar
            </Button>
        </>
    )
}