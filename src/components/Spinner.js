import loading from './loading.svg'
import React from 'react'

export default function Spinner() {
    return (
        <>
        <div className="flex text-center align-center justify-center">
                <img src={loading} alt="loading" />
        </div>
        </>
    )
}
