import {
    FieldError,
    FieldPath,
    FieldValues,
    UseFormRegister,
} from 'react-hook-form'

interface InputProps<T extends FieldValues> {
    type: 'text' | 'email' | 'password'
    fieldName: FieldPath<T>
    register: UseFormRegister<T>
    error?: FieldError
    placeholder?: string
}

const Input = <T extends FieldValues>(props: InputProps<T>) => {
    return (
        <div>
            <input
                type={props.type}
                placeholder={props.placeholder}
                {...props.register(props.fieldName)}
            />
        </div>
    )
}

export default Input
