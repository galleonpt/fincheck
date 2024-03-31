import { Transaction } from '../../../../../app/entities/Transaction';

export interface IEditTransactionModalProps {
    open: boolean;
    transaction: Transaction | null;
    onClose: () => void;
}
