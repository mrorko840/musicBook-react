import React from "react";

export default function CustomInput({ label, icon, ...props }) {
    return (
        <>
            {label ? (
                <label
                    htmlFor="username"
                    className="block mb-1 ms-1 text-[13px] font-medium text-gray-100 z-100"
                >
                    {label}
                </label>
            ) : null}
            <div className="relative mb-3">
                {
                    icon ? (
                        <div className="absolute inset-y-0 start-0 flex items-center ps-3.5 pointer-events-none">
                            {/* <i className="fi fi-sr-user leading-[0px]"></i> */}
                            {icon}
                        </div>
                    ) : null
                }
                <input
                    className={`bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ${icon && 'ps-10'} p-2.5`}
                    {...props}
                />
            </div>
        </>
    );
}
