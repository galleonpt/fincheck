import { FC, PropsWithChildren } from 'react';
import * as RdxDropdownMenu from '@radix-ui/react-dropdown-menu';
import cn from '../../../app/utils/cn';

interface IDropdownMenuContentProps {
    className?: string;
}

const DropdownMenuContent: FC<PropsWithChildren<IDropdownMenuContentProps>> = ({
    children,
    className,
}) => {
    return (
        <RdxDropdownMenu.Portal>
            <RdxDropdownMenu.Content
                className={cn(
                    'rounded-2xl p-2 bg-white space-y-2 shadow-[0px_11px_20px_0px_rgba(0,0,0,0.10)] z-[99]',
                    'data-[side=bottom]:animate-slide-up-and-fade',
                    'data-[side=top]:animate-slide-down-and-fade',
                    className,
                )}
            >
                {children}
            </RdxDropdownMenu.Content>
        </RdxDropdownMenu.Portal>
    );
};

export default DropdownMenuContent;
