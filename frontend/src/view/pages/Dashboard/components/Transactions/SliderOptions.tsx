import { FC } from 'react';
import { useSwiper } from 'swiper/react';
import cn from '../../../../../app/utils/cn';

interface ISliderOptionProps {
    index: number;
    isActive: boolean;
    month: string;
}

const SliderOption: FC<ISliderOptionProps> = ({ index, isActive, month }) => {
    const swiper = useSwiper();

    return (
        <button
            className={cn(
                'w-full rounded-full h-12 text-sm text-gray-800 tracking-[-0.5px] font-medium',
                isActive && 'bg-white',
            )}
            onClick={() => swiper.slideTo(index)}
        >
            {month}
        </button>
    );
};
export default SliderOption;
