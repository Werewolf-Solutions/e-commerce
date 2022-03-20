import React from 'react'
import {
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from '@mui/material'

export default function ThemeSelect(props) {
    return (
        <div>
            <FormControl>
                <InputLabel id="select-theme-label">Theme</InputLabel>
                <Select
                    labelId="select-theme-label"
                    id="select-theme"
                    value={props.theme}
                    label="Theme"
                    onChange={props.handleTheme}
                >
                    <MenuItem value={'dark'}>Dark</MenuItem>
                    <MenuItem value={'light'}>Light</MenuItem>
                </Select>
            </FormControl>
        </div>
    )
}
