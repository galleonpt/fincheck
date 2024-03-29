import { FC, PropsWithChildren } from 'react';
import * as RdxPopover from '@radix-ui/react-popover';
import cn from '../../../app/utils/cn';

interface IPopoverContentProps extends PropsWithChildren {
    className?: string;
}

const PopoverContent: FC<IPopoverContentProps> = ({ children, className }) => {
    return (
        <RdxPopover.Portal>
            <RdxPopover.Content
                className={cn(
                    'rounded-2xl p-4 bg-white space-y-2 shadow-[0px_11px_20px_0px_rgba(0,0,0,0.10)] z-[99]',
                    'data-[side=bottom]:animate-slide-up-and-fade',
                    'data-[side=top]:animate-slide-down-and-fade',
                    className,
                )}
            >
                {children}
            </RdxPopover.Content>
        </RdxPopover.Portal>
    );
};

export default PopoverContent;
