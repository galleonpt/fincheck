import { useState } from 'react';
import useWindowWidth from '../../../../../app/hooks/useWindowWidth';

const useAccountsController = () => {
    const windowWidth = useWindowWidth();
    const [sliderState, setSliderState] = useState({
        isBeginning: true,
        isEnd: false,
    });

    return {
        sliderState,
        windowWidth,

        setSliderState,
    };
};

export default useAccountsController;
