import { FC } from 'react';
import { FilterIcon } from '../../../../components/icons/FilterIcon';
import TransactionTypeDropdown from './TransactionTypeDropdown';

const Transactions: FC = () => {
    return (
        <div className="bg-gray-100 rounded-2xl w-full h-full px-4 py-8 lg:p-10 flex flex-col">
            <header>
                <div className="flex justify-between items-center">
                    <TransactionTypeDropdown
                        // onSelect={handleChangeFilters('type')}
                        // selectedType={filters.type}
                        onSelect={() => {}}
                        selectedType={undefined}
                    />
                    <button
                    // onClick={handleOpenFiltersModal}
                    >
                        <FilterIcon />
                    </button>
                </div>
            </header>

            <div className="mt-4 space-y-2 flex-1 overflow-y-auto">Content</div>
        </div>
    );
};

export default Transactions;
