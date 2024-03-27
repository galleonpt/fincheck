import { FC } from 'react';
import useAuth from '../../app/hooks/useAuth';
import DropdownMenu from './DropdownMenu';
import { ExitIcon } from '@radix-ui/react-icons';

const UserMenu: FC = () => {
    const { logout } = useAuth();

    return (
        <DropdownMenu.Root>
            <DropdownMenu.Trigger>
                <div className="bg-teal-50 rounded-full w-12 h-12 flex items-center justify-center border border-teal-100">
                    <span className="text-sm tracking-[-0.5px] text-teal-900 font-medium">
                        JL
                    </span>
                </div>
            </DropdownMenu.Trigger>

            <DropdownMenu.Content className="w-32">
                <DropdownMenu.Item
                    className="flex items-center justify-between"
                    onSelect={logout}
                >
                    Sair
                    <ExitIcon className="w-4 h-4" />
                </DropdownMenu.Item>
            </DropdownMenu.Content>
        </DropdownMenu.Root>
    );
};

export default UserMenu;
