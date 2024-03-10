import { ComponentProps, FC } from 'react';
import cn from '../../app/utils/cn';
import Spinner from './Spinner';

interface IButtonProps extends ComponentProps<'button'> {
    loading: boolean;
}

const Button: FC<IButtonProps> = ({
    children,
    className,
    loading,
    disabled,
    ...props
}) => {
    return (
        <button
            {...props}
            disabled={disabled || loading}
            className={cn(
                'bg-teal-900 hover:bg-teal-800 disabled:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-400 px-6 h-12 rounded-2xl font-medium text-white transition-all flex items-center justify-center',
                className,
            )}
        >
            {!loading && children}
            {loading && <Spinner className="w-6 h-6" />}
        </button>
    );
};

export default Button;
