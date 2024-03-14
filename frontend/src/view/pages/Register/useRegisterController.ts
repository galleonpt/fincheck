import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { useMutation } from '@tanstack/react-query';
import { authService } from '../../../app/services/authService/authService';
import { ISignupPayload } from '../../../app/services/authService/types';
import toast from 'react-hot-toast';
import useAuth from '../../../app/hooks/useAuth';

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
    const { signin } = useAuth();

    const {
        handleSubmit: hookFormSubmit,
        register,
        formState: { errors },
    } = useForm<TRegisterFormFields>({
        resolver: zodResolver(schema),
    });

    const { mutateAsync, isPending } = useMutation({
        mutationFn: async (data: ISignupPayload) => authService.signup(data),
    });

    const handleSubmit = hookFormSubmit(async (data) => {
        try {
            const { accessToken } = await mutateAsync(data);
            signin(accessToken);
        } catch (error) {
            toast.error('Ocorreu um erro ao criar a sua conta!');
        }
    });

    return { register, errors, handleSubmit, isPending };
};

export default useRegisterController;
