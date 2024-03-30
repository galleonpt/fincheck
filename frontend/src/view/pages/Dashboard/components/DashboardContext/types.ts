import { PropsWithChildren } from 'react';
import { BankAccount } from '../../../../../app/entities/BankAccount';

export interface IDashboardContextValue {
    areValuesVisible: boolean;
    isNewAccountModalOpen: boolean;
    isEditAccountModalOpen: boolean;
    isNewTransactionModalOpen: boolean;
    accountBeingEdited: BankAccount | null;
    newTransactionType: 'INCOME' | 'EXPENSE' | null;
    toggleValueVisibility: () => void;
    openNewAccountModal: () => void;
    closeNewAccountModal: () => void;
    openEditAccountModal: (bankAccount: BankAccount) => void;
    closeEditAccountModal: () => void;
    openNewTransactionModal: (type: 'INCOME' | 'EXPENSE') => void;
    closeNewTransactionModal: () => void;
}

export interface IDashboardProvider extends PropsWithChildren {}
