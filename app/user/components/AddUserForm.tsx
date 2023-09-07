import { Input } from "@/app/components";
import { useCreateUsers } from "@/app/domain/user/user.hook";
import { CreateUsersParams } from "@/app/domain/user/user.types";
import { Button, Form, Select } from "antd";

type AddUserForm = {
    closeModal(): void
}

export function AddUserForm({
    closeModal
}: AddUserForm){
    const createUser = useCreateUsers()

    const handleSubmit = ({
        avatar_url,
        email,
        name,
        password,
        roles,
    }: CreateUsersParams) => {
        createUser
            .mutateAsync({
                avatar_url,
                email,
                name,
                password,
                roles
            })
            .then(() => closeModal())
    }

    return (
        <Form
            onFinish={handleSubmit}
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