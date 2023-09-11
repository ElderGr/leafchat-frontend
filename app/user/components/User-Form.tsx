'use client'
import { Input } from "@/app/components";
import { useUserContext } from "@/app/context/users";
import { useCreateUsers, useEditUsers } from "@/app/domain/user/user.hook";
import { CreateUsersParams } from "@/app/domain/user/user.types";
import { Button, Form, Select } from "antd";
import { useEffect } from "react";

export function UserForm(){
    const createUser = useCreateUsers()
    const editUser = useEditUsers()
    const { selectedUser, closeUserForm } = useUserContext()
    const [form] = Form.useForm()
    
    useEffect(() => {
        form.setFieldsValue(selectedUser)
    }, [form, selectedUser])

    const handleSubmit = ({
        avatar_url,
        email,
        name,
        password,
        roles,
    }: CreateUsersParams) => {
        if(!selectedUser){
            createUser
                .mutateAsync({
                    avatar_url,
                    email,
                    name,
                    password,
                    roles
                })
                .then(() => closeUserForm())
        }else{
            editUser
                .mutateAsync({
                    id: selectedUser.id,
                    avatar_url,
                    email,
                    name,
                    password,
                    roles
                })
                .then(() => closeUserForm())
        }
    }

    return (
        <Form
            onFinish={handleSubmit}
            initialValues={selectedUser || {}}
            form={form}
        >
            <Input 
                formItemProps={{
                    name: 'name',
                    label: 'Nome'
                }}
                inputProps={{
                    placeholder: 'Nome'
                }}
            />
            <Input 
                formItemProps={{
                    name: 'avatar_url',
                    label: 'Avatar'
                }}
                inputProps={{
                    placeholder: 'Avatar'
                }}
            />
            <Form.Item
                name='roles'
                label='Acesso'
            >
                <Select 
                    options={[
                        {label: 'Administrador', value: 'admin'},
                        {label: 'Usuário', value: 'user'}
                    ]}
                />
            </Form.Item>
            <Input 
                formItemProps={{
                    name: 'email',
                    label: 'Email'
                }}
                inputProps={{
                    placeholder: 'Email',
                    type: 'email'
                }}
            />
            <Input 
                formItemProps={{
                    name: 'password',
                    label: 'Password'
                }}
                inputProps={{
                    placeholder: 'Password',
                    type: 'password'
                }}
            />
            <Button
                htmlType="submit"
                loading={createUser.isLoading}
                type='primary'
            >
                Adicionar
            </Button>
        </Form>
    )
}