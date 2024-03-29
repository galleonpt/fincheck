import { FC, useState } from 'react';
import { CrossCircledIcon } from '@radix-ui/react-icons';
import cn from '../../app/utils/cn';
import formatDate from '../../app/utils/formateDate';
import DatePicker from './DatePicker';
import Popover from './Popover';

interface IDatePickerInputProps {
    error?: string;
    className?: string;
    value?: Date;
    onChange?: (date: Date) => void;
}

const DatePickerInput: FC<IDatePickerInputProps> = ({
    error,
    className,
    value,
    onChange,
}) => {
    const [selectedDate, setSelectedDate] = useState(value ?? new Date());

    const handleChangeDate = (date: Date) => {
        setSelectedDate(date);
        onChange?.(date);
    };

    return (
        <div>
            <Popover.Root>
                <Popover.Trigger asChild>
                    <button
                        type="button"
                        className={cn(
                            'bg-white rounded-lg w-full border pt-4 border-gray-500 px-3 h-[52px] text-gray-700 placeholder-shown:pt-0 focus:border-gray-800 transition-all outline-none text-left relative',
                            error && '!border-red-900',
                            className,
                        )}
                    >
                        <span className="absolute text-gray-700 text-xs left-[13px] top-2 pointer-events-none">
                            Data
                        </span>
                        <span>{formatDate(selectedDate)}</span>
                    </button>
                </Popover.Trigger>

                <Popover.Content>
                    <DatePicker
                        value={selectedDate}
                        onChange={handleChangeDate}
                    />
                </Popover.Content>

                {error && (
                    <div className="mt-2 flex gap-2 items-center text-red-900">
                        <CrossCircledIcon />
                        <span className="text-xs">{error}</span>
                    </div>
                )}
            </Popover.Root>
        </div>
    );
};

export default DatePickerInput;
