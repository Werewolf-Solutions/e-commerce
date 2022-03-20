import React from 'react'
import {
    FormControlLabel,
    FormGroup,
    Switch
} from '@mui/material'

export default function DemoSwitch(props) {
    return (
        <div>
            <FormGroup>
                <FormControlLabel
                    control={<Switch
                                checked={props.demo}
                                onChange={props.handleDemoOnOff}
                            />}
                    label={props.demo ? 'Demo on' : 'Demo off'}
                />
            </FormGroup>
        </div>
    )
}
