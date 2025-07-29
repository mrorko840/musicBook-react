import React from 'react'

export default function CustomLoader() {
    return (
        <div className="absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]">
            <span className="loading loading-bars text-rose-500 loading-lg -mt-[50px]"></span>
        </div>
    )
}
