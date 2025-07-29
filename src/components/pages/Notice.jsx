import React, { useEffect, useState } from "react";
import AuthUser from "../../helpers/AuthUser";
import toast from "react-hot-toast";

export default function Notice() {
    const [allNotice, setAllNotice] = useState("");
    const { http } = AuthUser();

    useEffect(() => {
        http.get("/notice/all")
            .then(({ data }) => {
                console.log(data);
                setAllNotice(data.notices);
            })
            .catch((err) => {
                console.log(err);
            });
    }, []);

    return (
        <>
            <div className="mx-[8px] mt-2">
                <div className="flex justify-center items-center rounded-lg text-white bg-blue-600 shadow-md shadow-blue-700/50 p-2 mb-3 ">
                    <div className="flex-auto flex items-center">
                        <i className="fi fi-sr-direction-signal leading-[0px]"></i>
                        <h1 className="text-sm font-bold ps-2">All Notice About BUS</h1>
                    </div>
                </div>

                {allNotice ? (
                    allNotice.map((notice, index) => (
                        <div
                            key={notice._id}
                            className="flex items-center gap-1 rounded-[10px] border-2 border-blue-600 bg-white shadow-md shadow-gray-700/40 p-2 mb-2"
                        >
                            <h1 className="text-[15px] text-blue-600">
                                {index + 1}.
                            </h1>
                            <h1 className="text-[15px] text-blue-600 flex-auto">
                                {notice.notice}
                            </h1>
                        </div>
                    ))
                ) : (
                    <div className="flex flex-col justify-center items-center h-[calc(100vh-150px)]">
                        <span className="loading loading-bars text-blue-500 loading-lg -mt-[60px]"></span>
                    </div>
                )}

                {allNotice && allNotice.length == 0 ? (
                    <div className="flex flex-col justify-center items-center h-[calc(100vh-130px)]">
                        <div className="-mt-[90px] flex flex-col items-center">
                            <img
                                className="w-[60px] hue-rotate-[222deg]"
                                src="https://cdn-icons-png.flaticon.com/128/2797/2797387.png"
                                alt=""
                            />
                            <h1 className="text-blue-400">
                                No Notice Found!
                            </h1>
                        </div>
                    </div>
                ) : null}
            </div>
        </>
    );
}
