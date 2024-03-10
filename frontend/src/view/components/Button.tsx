import { ComponentProps, FC } from 'react';
import cn from '../../app/utils/cn';

interface IButtonProps extends ComponentProps<'button'> {}

const Button: FC<IButtonProps> = ({ children, className, ...props }) => {
    return (
        <button
            {...props}
            className={cn(
                'bg-teal-900 hover:bg-teal-800 disabled:bg-gray-100 disabled:cursor-not-allowed disabled:text-gray-400 px-6 h-12 rounded-2xl font-medium text-white transition-all flex items-center justify-center',
                className,
            )}
        >
            {children}
        </button>
    );
};

export default Button;
