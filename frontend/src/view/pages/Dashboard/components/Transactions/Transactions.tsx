import { FC } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FilterIcon } from '../../../../components/icons/FilterIcon';
import TransactionTypeDropdown from './TransactionTypeDropdown';
import SliderNavigation from './SliderNavigation';
import SliderOption from './SliderOptions';
import { MONTHS } from '../../../../../app/config/constants';

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

            <div className="mt-4 space-y-2 flex-1 overflow-y-auto">Content</div>
        </div>
    );
};

export default Transactions;
