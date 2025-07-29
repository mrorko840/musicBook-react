import React from "react";

export default function AdminDashboard() {
    return (
        <>
            <div className="mx-[8px] mt-2">
                <div className="flex items-center bg-white rounded-lg w-[100%] p-4 shadow-md shadow-gray-700/10">
                    <div className="flex-auto">
                        <h1 className="text-blue-700/80 text-md">Total Bus</h1>
                        <h1 className="text-blue-700 font-bold text-md">40</h1>
                    </div>
                    <div className="">
                        <img
                            className="w-[50px] h-[50px] rounded-[10px]"
                            src="https://cdn-icons-gif.flaticon.com/7308/7308522.gif"
                            alt="bus gif"
                        />
                    </div>
                </div>
            </div>
        </>
    );
}
