import { FC } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FilterIcon } from '../../../../components/icons/FilterIcon';
import TransactionTypeDropdown from './TransactionTypeDropdown';
import SliderNavigation from './SliderNavigation';
import SliderOption from './SliderOptions';
import { MONTHS } from '../../../../../app/config/constants';
import { CategoryIcon } from '../../../../components/icons/categories/CategoryIcon';
import cn from '../../../../../app/utils/cn';
import { formatCurrency } from '../../../../../app/utils/formatCurrency';
import formatDate from '../../../../../app/utils/formateDate';

const Transactions: FC = () => {
    const transactions: any[] = [
        {
            id: 1,
            type: 'income',
            name: 'name',
            date: '2024-02-28T20:27:15.465Z',
            value: 123,
        },
        {
            id: 12,
            type: 'income',
            name: 'name',
            date: '2024-02-28T20:27:15.465Z',
            value: 123,
        },
    ];

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

                <div className="mt-6 relative">
                    <Swiper
                        slidesPerView={3}
                        centeredSlides
                        // initialSlide={filters.month}
                        // onSlideChange={(swiper) => {
                        //     handleChangeFilters('month')(swiper.realIndex);
                        // }}
                    >
                        <SliderNavigation />
                        {MONTHS.map((month, index) => (
                            <SwiperSlide key={month}>
                                {({ isActive }) => (
                                    <SliderOption
                                        index={index}
                                        isActive={isActive}
                                        month={month}
                                    />
                                )}
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>
            </header>

            <div className="mt-4 space-y-2 flex-1 overflow-y-auto">
                {transactions.map((transaction) => (
                    <div
                        key={transaction.id}
                        className="bg-white p-4 rounded-2xl flex items-center justify-between gap-4"
                        role="button"
                        // onClick={() => handleOpenEditModal(transaction)}
                    >
                        <div className="flex-1 flex items-center gap-4">
                            <CategoryIcon type={transaction.type} />
                            <div>
                                <strong className="font-bold tracking-[-0.5px] block">
                                    {transaction.name}
                                </strong>
                                <span className="text-sm text-gray-600">
                                    {formatDate(new Date(transaction.date))}
                                </span>
                            </div>
                        </div>

                        <span
                            className={cn(
                                'tracking-[-0.5px] font-medium',
                                transaction.type === 'EXPENSE'
                                    ? 'text-red-800'
                                    : 'text-green-800',
                                // !areValuesVisible && 'blur-md'
                            )}
                        >
                            {transaction.type === 'EXPENSE' ? '- ' : '+ '}
                            {formatCurrency(transaction.value)}
                        </span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Transactions;
