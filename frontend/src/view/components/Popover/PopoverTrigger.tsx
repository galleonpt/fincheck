import { FC, PropsWithChildren } from 'react';
import * as RdxPopover from '@radix-ui/react-popover';

interface IPopoverTriggerProps extends PropsWithChildren {
    asChild?: boolean;
}

const PopoverTrigger: FC<IPopoverTriggerProps> = ({ children, asChild }) => {
    return (
        <RdxPopover.Trigger className="outline-none" asChild={asChild}>
            {children}
        </RdxPopover.Trigger>
    );
};

export default PopoverTrigger;
