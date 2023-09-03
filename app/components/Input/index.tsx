import { 
    Form, 
    Input as AntdInput,
    InputProps,
    FormItemProps
} from 'antd'

type Input = {
    formItemProps: FormItemProps;
    inputProps: InputProps
}

export function Input({
    formItemProps,
    inputProps
}: Input){
    return (
    <Form.Item
        {...formItemProps}
      >
        <AntdInput
            {...inputProps}
        />
      </Form.Item>
    )
}