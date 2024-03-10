import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { authService } from '../../../app/services/authService/authService';
import toast from 'react-hot-toast';
import { ISigninPayload } from '../../../app/services/authService/types';

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
        handleSubmit: hookFormSubmit,
        register,
        formState: { errors },
    } = useForm<TLoginFormFields>({
        resolver: zodResolver(schema),
    });

    const { mutateAsync, isPending } = useMutation({
        mutationFn: async (data: ISigninPayload) => authService.signin(data),
    });

    const handleSubmit = hookFormSubmit(async (data) => {
        try {
            const { accessToken } = await mutateAsync(data);
            console.log(accessToken);
        } catch (error) {
            toast.error('Credenciais inválidas!');
        }
    });

    return {
        handleSubmit,
        register,
        errors,
        isPending,
    };
};

export default useLoginController;
