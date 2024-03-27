import { PropsWithChildren } from 'react';

export interface IDashboardContextValue {
    areValuesVisible: boolean;
    isNewAccountModalOpen: boolean;
    isEditAccountModalOpen: boolean;
    isNewTransactionModalOpen: boolean;
    accountBeingEdited: any | null;
    newTransactionType: 'INCOME' | 'EXPENSE' | null;
    toggleValueVisibility: () => void;
    openNewAccountModal: () => void;
    closeNewAccountModal: () => void;
    openEditAccountModal: (bankAccount: any) => void;
    closeEditAccountModal: () => void;
    openNewTransactionModal: (type: 'INCOME' | 'EXPENSE') => void;
    closeNewTransactionModal: () => void;
}

export interface IDashboardProvider extends PropsWithChildren {}
