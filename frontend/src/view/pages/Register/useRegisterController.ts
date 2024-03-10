import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';

const schema = z.object({
    name: z.string().min(1, 'Nome é obrigatório'),
    email: z
        .string()
        .email('Insira um email válido')
        .min(1, 'Email obrigatório'),
    password: z
        .string()
        .min(8, 'Password obrigatória com pelo menos 8 digitos'),
});

type TRegisterFormFields = z.infer<typeof schema>;

const useRegisterController = () => {
    const {
        handleSubmit: hookFormSubmit,
        register,
        formState: { errors },
    } = useForm<TRegisterFormFields>({
        resolver: zodResolver(schema),
    });

    const handleSubmit = hookFormSubmit((data) => {
        console.log(data);
    });

    return { register, errors, handleSubmit };
};

export default useRegisterController;
