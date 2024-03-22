import { FC } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import cn from '../../../../../app/utils/cn';
import { EyeIcon } from '../../../../components/icons/EyeIcon';
import {
    ChevronLeftIcon,
    ChevronRightIcon,
    PlusIcon,
} from '@radix-ui/react-icons';
import AccountCard from './AccountCard';
import SliderNavigation from './SliderNavigation';
import useAccountsController from './useAccountsController';

const Accounts: FC = () => {
    const { sliderState, setSliderState, windowWidth } =
        useAccountsController();

    return (
        <div className="bg-teal-900 rounded-2xl w-full h-full px-4 py-8 lg:p-10 flex flex-col">
            <div>
                <span className="tracking-[-0.5px] text-white block">
                    Saldo Total
                </span>

                <div className="flex items-center gap-2">
                    <strong
                        className={cn('text-2xl tracking-[-1px] text-white')}
                    >
                        123€
                    </strong>

                    <button className="w-8 h-8 flex items-center justify-center">
                        <EyeIcon open />
                    </button>
                </div>
            </div>

            <div className="flex-1 flex flex-col justify-end mt-10 lg:mt-0">
                {/* <>
                    <div className="mb-4" slot="container-start">
                        <strong className="text-white tracking-[-1px] text-lg font-bold">
                            Minhas contas
                        </strong>

                        <div>
                            <button className="py-3 pl-2.5 pr-3.5 rounded-full enabled:hover:bg-black/10 transition-colors disabled:opacity-40">
                                <ChevronLeftIcon className="text-white w-6 h-6" />
                            </button>
                            <button className="py-3 pl-2.5 pr-3.5 rounded-full enabled:hover:bg-black/10 transition-colors disabled:opacity-40">
                                <ChevronRightIcon className="text-white w-6 h-6" />
                            </button>
                        </div>
                    </div>

                    <button className="mt-4 h-52 rounded-2xl border-2 border-dashed border-teal-600 flex flex-col justify-center items-center gap-4 text-white hover:bg-teal-950/5 transition-colors">
                        <div className="w-11 h-11 rounded-full border-2 border-dashed border-white flex items-center justify-center">
                            <PlusIcon className="w-6 h-6" />
                        </div>
                        <span className="tracking-[-0.5px] font-medium w-32 text-center">
                            Cadastre uma nova conta
                        </span>
                    </button>
                </> */}

                <div>
                    <Swiper
                        spaceBetween={16}
                        slidesPerView={windowWidth >= 500 ? 2.1 : 1.2}
                        onSlideChange={(swiper) => {
                            setSliderState({
                                isBeginning: swiper.isBeginning,
                                isEnd: swiper.isEnd,
                            });
                        }}
                    >
                        <div
                            className="flex items-center justify-between mb-4"
                            slot="container-start"
                        >
                            <strong className="text-white tracking-[-1px] text-lg font-bold">
                                Minhas contas
                            </strong>

                            <SliderNavigation
                                isBeginning={sliderState.isBeginning}
                                isEnd={sliderState.isEnd}
                            />
                        </div>

                        {/* {accounts.map((account) => ( */}
                        <SwiperSlide key={'account.id'}>
                            <AccountCard
                                data={{
                                    color: '#f0f',
                                    name: 'Name',
                                    currentBalance: 123,
                                    type: 'CASH',
                                }}
                            />
                        </SwiperSlide>
                        <SwiperSlide key={'account.id1'}>
                            <AccountCard
                                data={{
                                    color: '#f0f',
                                    name: 'Name',
                                    currentBalance: 123,
                                    type: 'CASH',
                                }}
                            />
                        </SwiperSlide>
                        {/* ))} */}
                    </Swiper>
                </div>
            </div>
        </div>
    );
};

export default Accounts;
