import React from "react";

export default function CustomBtn({ onClick, children, bgFrom, bgTo, className }) {
    return (
        <>
            <button onClick={onClick} className={`bg-gradient-to-r hover:bg-gradient-to-l ${bgFrom ? bgFrom : 'from-cyan-600'} ${bgTo ? bgTo : 'to-blue-600'} text-white w-[100%] p-2 rounded-[10px] ${className}`}>
                {children}
            </button>
        </>
    );
}
