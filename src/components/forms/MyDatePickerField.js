import * as React from 'react';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { TextField } from '@mui/material';
import { Controller } from 'react-hook-form';
import dayjs from 'dayjs'; // Make sure you import dayjs

export default function MyDatePickerField({ label, name, control }) {
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Controller
                name={name}
                control={control}
                render={({ field: { onChange, value }, fieldState: { error } }) => (
                    <DatePicker
                        label={label}
                        value={value ? dayjs(value) : null}  // Ensure the value is a Dayjs object or null
                        onChange={(newValue) => onChange(dayjs(newValue))}
                        renderInput={(params) => (
                            <TextField 
                                {...params}
                                error={!!error}
                                helperText={error ? error.message : null}
                            />
                        )}
                    />
                )}
            />
        </LocalizationProvider>
    );
}
