import { FC, PropsWithChildren } from 'react';
import * as RdxDropdownMenu from '@radix-ui/react-dropdown-menu';
import cn from '../../../app/utils/cn';

interface IDropdownMenuItemProps {
    children: React.ReactNode;
    className?: string;
    onSelect?: () => void;
}

const DropdownMenuItem: FC<PropsWithChildren<IDropdownMenuItemProps>> = ({
    children,
    className,
    onSelect,
}) => {
    return (
        <RdxDropdownMenu.Item
            onSelect={onSelect}
            className={cn(
                'min-h-[40px] outline-none flex items-center px-4 py-2 text-gray-800 text-sm hover:bg-gray-50 data-[highlighted]:bg-gray-50 rounded-2xl transition-colors cursor-pointer',
                className,
            )}
        >
            {children}
        </RdxDropdownMenu.Item>
    );
};

export default DropdownMenuItem;
