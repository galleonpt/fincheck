import { createContext, useCallback, useState } from 'react';
import { IDashboardContextValue, IDashboardProvider } from './types';

export const DashboardContext = createContext({} as IDashboardContextValue);

export const DashboardProvider = ({ children }: IDashboardProvider) => {
    const [areValuesVisible, setAreValuesVisible] = useState(true);
    const [isNewAccountModalOpen, setIsNewAccountModalOpen] = useState(false);
    const [isEditAccountModalOpen, setIsEditAccountModalOpen] = useState(false);
    const [accountBeingEdited, setAccountBeingEdited] = useState<any | null>(
        null,
    );
    const [isNewTransactionModalOpen, setIsNewTransactionModalOpen] =
        useState(false);
    const [newTransactionType, setNewTransactionType] = useState<
        'INCOME' | 'EXPENSE' | null
    >(null);

    const toggleValueVisibility = useCallback(() => {
        setAreValuesVisible((prevState) => !prevState);
    }, []);

    const openNewAccountModal = useCallback(() => {
        setIsNewAccountModalOpen(true);
    }, []);

    const closeNewAccountModal = useCallback(() => {
        setIsNewAccountModalOpen(false);
    }, []);

    const openEditAccountModal = useCallback((bankAccount: any) => {
        setAccountBeingEdited(bankAccount);
        setIsEditAccountModalOpen(true);
    }, []);

    const closeEditAccountModal = useCallback(() => {
        setAccountBeingEdited(null);
        setIsEditAccountModalOpen(false);
    }, []);

    const openNewTransactionModal = useCallback(
        (type: 'INCOME' | 'EXPENSE') => {
            setNewTransactionType(type);
            setIsNewTransactionModalOpen(true);
        },
        [],
    );

    const closeNewTransactionModal = useCallback(() => {
        setNewTransactionType(null);
        setIsNewTransactionModalOpen(false);
    }, []);

    return (
        <DashboardContext.Provider
            value={{
                areValuesVisible,
                toggleValueVisibility,
                isNewAccountModalOpen,
                isEditAccountModalOpen,
                isNewTransactionModalOpen,
                newTransactionType,
                openNewAccountModal,
                closeNewAccountModal,
                openEditAccountModal,
                closeEditAccountModal,
                accountBeingEdited,
                openNewTransactionModal,
                closeNewTransactionModal,
            }}
        >
            {children}
        </DashboardContext.Provider>
    );
};
