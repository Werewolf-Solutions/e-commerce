import React from 'react'
import {
    Grid
} from '@mui/material'
import free from '../../../files/free.svg'

export default function Logo() {
    return (
        <div>
            <img src={free}  alt="logo" className="logo"/>
        </div>
    )
}
