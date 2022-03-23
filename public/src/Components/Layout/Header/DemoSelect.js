import React from 'react'
import {
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from '@mui/material'

export default function DemoSelect(props) {
    return (
        <div>
            <FormControl fullWidth>
            <InputLabel id="demo-simple-select-label">Demo</InputLabel>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={props.demo}
                label="Demo"
                onChange={props.handleDemo}
            >
                <MenuItem value={'live-account'}>Live account</MenuItem>
                <MenuItem value={'user-demo'}>As user</MenuItem>
                <MenuItem value={'admin-demo'}>As admin</MenuItem>
            </Select>
            </FormControl>
        </div>
    )
}
