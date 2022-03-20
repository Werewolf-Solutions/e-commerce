import React from 'react'
import {
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from '@mui/material'

export default function ThemeSelect() {
    const [theme, setTheme] = React.useState('dark')
    const handleChange = (e) => {
        setTheme(e.target.value)
    }
    return (
        <div>
            <FormControl>
                <InputLabel id="select-theme-label">Theme</InputLabel>
                <Select
                    labelId="select-theme-label"
                    id="select-theme"
                    value={theme}
                    label="Theme"
                    onChange={handleChange}
                >
                    <MenuItem value={'dark'}>Dark</MenuItem>
                    <MenuItem value={'light'}>Light</MenuItem>
                </Select>
            </FormControl>
        </div>
    )
}
