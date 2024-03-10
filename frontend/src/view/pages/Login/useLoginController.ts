import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import httpClient from '../../../app/services/httpClient';

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

    const handleSubmit = hookFormHandleSubmit(async (data) => {
        console.log({ data });
        await httpClient.post('/auth/signin');
    });

    return {
        handleSubmit,
        register,
        errors,
    };
};

export default useLoginController;
