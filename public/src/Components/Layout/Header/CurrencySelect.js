import React from 'react'
import {
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from '@mui/material'

export default function CurrencySelect(props) {
    return (
        <div>
            <FormControl>
                <InputLabel id="select-currency-label">Currency</InputLabel>
                <Select
                    labelId="select-currency-label"
                    id="select-currency"
                    value={props.currency}
                    label="Currency"
                    onChange={props.handleCurrency}
                >
                    <MenuItem value={'GBP'}>GBP</MenuItem>
                    <MenuItem value={'USD'}>USD</MenuItem>
                    <MenuItem value={'EUR'}>EUR</MenuItem>
                </Select>
            </FormControl>
        </div>
    )
}
