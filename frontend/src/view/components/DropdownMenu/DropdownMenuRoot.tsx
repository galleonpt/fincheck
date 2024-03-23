import { FC, PropsWithChildren } from 'react';
import * as RdxDropdownMenu from '@radix-ui/react-dropdown-menu';

const DropdownMenuRoot: FC<PropsWithChildren> = ({ children }) => {
    return <RdxDropdownMenu.Root>{children}</RdxDropdownMenu.Root>;
};

export default DropdownMenuRoot;
