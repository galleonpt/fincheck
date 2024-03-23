import { FC, PropsWithChildren } from 'react';
import * as RdxDropdownMenu from '@radix-ui/react-dropdown-menu';

interface IDropdownMenuTriggerProps {
    asChild?: boolean;
}

const DropdownMenuTrigger: FC<PropsWithChildren<IDropdownMenuTriggerProps>> = ({
    children,
    asChild,
}) => {
    return (
        <RdxDropdownMenu.Trigger className="outline-none" asChild={asChild}>
            {children}
        </RdxDropdownMenu.Trigger>
    );
};

export default DropdownMenuTrigger;
