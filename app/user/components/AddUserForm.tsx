import { Input } from "@/app/components";
import { Form } from "antd";

export function AddUserForm(){
    return (
        <Form>
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
            <Input 
                formItemProps={{
                    name: 'roles',
                    label: 'Roles'
                }}
                inputProps={{
                    placeholder: 'roles'
                }}
            />
            <Input 
                formItemProps={{
                    name: 'email',
                    label: 'Email'
                }}
                inputProps={{
                    placeholder: 'Email'
                }}
            />
            <Input 
                formItemProps={{
                    name: 'password',
                    label: 'Password'
                }}
                inputProps={{
                    placeholder: 'Password'
                }}
            />
        </Form>
    )
}