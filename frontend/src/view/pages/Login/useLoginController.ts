import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

const schema = z.object({
    email: z
        .string()
        .email('Insira um email válido')
        .min(1, 'Email obrigatório'),
    password: z
        .string()
        .min(8, 'Password obrigatória com pelo menos 8 digitos'),
});

type TLoginFormFields = z.infer<typeof schema>;

const useLoginController = () => {
    const {
        handleSubmit: hookFormHandleSubmit,
        register,
        formState: { errors },
    } = useForm<TLoginFormFields>({
        resolver: zodResolver(schema),
    });

    const handleSubmit = hookFormHandleSubmit((data) => {
        console.log({ data });
    });

    return {
        handleSubmit,
        register,
        errors,
    };
};

export default useLoginController;
