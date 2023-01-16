import * as React from 'react';
import DatePicker from 'react-native-date-picker';
import { format } from 'date-fns';

import { noop } from '~/utils/noop';

import { TextInput } from '../TextInput/TextInput';

interface IDateInputProps {
    title?: string;
    initialValue?: Date;
    onChange: (val: Date) => void;
}

const dateMask = 'dd / MM / yyyy';

export const DateInput: React.FC<IDateInputProps> = ({ initialValue, title, onChange }) => {
    const [value, setValue] = React.useState(initialValue || new Date());
    const [open, setOpen] = React.useState(false);

    const [displayValue, setDisplayValue] = React.useState(initialValue ? format(initialValue, dateMask) : '');

    return (
        <>
            <DatePicker
                locale="RU"
                modal
                title={title || 'Выбери дату'}
                mode="date"
                open={open}
                date={value}
                onConfirm={date => {
                    setOpen(false);
                    setValue(date);
                    setDisplayValue(format(date, dateMask));
                    onChange(date);
                }}
                onCancel={() => {
                    setOpen(false);
                }}
                confirmText="Выбрать"
                cancelText="Отмена"
            />
            <TextInput
                withBottomBorder
                size="l"
                onClick={() => setOpen(true)}
                onChange={noop}
                value={displayValue}
                placeholder="ДД / ММ / ГГГГ"
            />
        </>
    );
};
