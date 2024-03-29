import { FC, PropsWithChildren } from 'react';
import * as RdxPopover from '@radix-ui/react-popover';

const PopoverRoot: FC<PropsWithChildren> = ({ children }) => {
    return <RdxPopover.Root>{children}</RdxPopover.Root>;
};

export default PopoverRoot;
