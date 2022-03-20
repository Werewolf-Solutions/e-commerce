import React from 'react'
import {
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from '@mui/material'

export default function ThemeSelect() {
    const [currency, setCurrency] = React.useState('GBP')
    const handleChange = (e) => {
        setCurrency(e.target.value)
    }
    return (
        <div>
            <FormControl>
                <InputLabel id="select-currency-label">Currency</InputLabel>
                <Select
                    labelId="select-currency-label"
                    id="select-currency"
                    value={currency}
                    label="Currency"
                    onChange={handleChange}
                >
                    <MenuItem value={'GBP'}>GBP</MenuItem>
                    <MenuItem value={'USD'}>USD</MenuItem>
                    <MenuItem value={'EUR'}>EUR</MenuItem>
                </Select>
            </FormControl>
        </div>
    )
}
