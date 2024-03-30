import { FC } from 'react';
import Button from './Button';
import Modal from './Modal';
import { TrashIcon } from './icons/TrashIcon';

interface IConfirmDeleteModalProps {
    title: string;
    description?: string;
    isLoading: boolean;
    onConfirm: () => void;
    onClose: () => void;
}

const ConfirmDeleteModal: FC<IConfirmDeleteModalProps> = ({
    onClose,
    onConfirm,
    title,
    description,
    isLoading,
}) => {
    return (
        <Modal open title="Apagar" onClose={onClose}>
            <div className="flex flex-col items-center text-center gap-6">
                <div className="w-[52px] h-[52px] rounded-full bg-red-0 flex items-center justify-center">
                    <TrashIcon className="w-6 h-6 text-red-900" />
                </div>

                <p className="w-[180px] text-gray-800 font-bold tracking-[-0.5px]">
                    {title}
                </p>

                {description && (
                    <p className="tracking-[-0.5px] text-gray-800">
                        {description}
                    </p>
                )}
            </div>

            <div className="mt-10 space-y-4">
                <Button
                    className="w-full"
                    variant="danger"
                    onClick={onConfirm}
                    loading={isLoading}
                >
                    Sim, desejo apagar
                </Button>
                <Button
                    className="w-full"
                    variant="ghost"
                    onClick={onClose}
                    disabled={isLoading}
                >
                    Cancelar
                </Button>
            </div>
        </Modal>
    );
};

export default ConfirmDeleteModal;
