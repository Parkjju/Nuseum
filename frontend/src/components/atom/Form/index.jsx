import Input from './styled';
import { useForm } from 'react-hook-form';

function Form({ placeholder, type, name }) {
    const { register, watch } = useForm();

    if (name) {
        console.log(watch(name));
    }

    return (
        <>
            {name === undefined ? (
                <Input type={type} placeholder={placeholder} />
            ) : (
                <Input
                    {...register(`${name}`)}
                    type={type}
                    placeholder={placeholder}
                />
            )}
        </>
    );
}

export default Form;
