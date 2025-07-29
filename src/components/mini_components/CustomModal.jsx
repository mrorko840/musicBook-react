import React from "react";

export default function CustomModal({isShowModal, onOffModal, children}) {
    return (
        <>
            <div
                tabIndex="-1"
                className={`${
                    isShowModal ? "flex" : "hidden"
                } overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full bg-blue-400/60`}
            >
                <div className="relative p-4 w-full max-w-md max-h-full">
                    <div className="relative bg-white rounded-lg shadow">
                        <button
                            onClick={onOffModal}
                            type="button"
                            className="absolute top-3 end-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center"
                            data-modal-hide="popup-modal"
                        >
                            <svg
                                className="w-3 h-3"
                                aria-hidden="true"
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 14 14"
                            >
                                <path
                                    stroke="currentColor"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth="2"
                                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                                />
                            </svg>
                            <span className="sr-only">Close modal</span>
                        </button>
                        {children}
                        
                        {/* <div className="p-4 md:p-5 text-center">
                            <h3 className="mb-5 text-lg font-normal text-gray-500">
                                Add Road Name
                            </h3>

                            <CustomInput
                                icon={
                                    <i className="fi fi-sr-direction-signal leading-[0px]"></i>
                                }
                                placeholder="Enter Road Name"
                                value={roadName}
                                onChange={(e) => setRoadName(e.target.value)}
                            />

                            <button
                                onClick={roadAdd}
                                data-modal-hide="popup-modal"
                                type="button"
                                className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                            >
                                {loadingBtn ? "Loading..." : "Add Road"}
                            </button>
                            <button
                                onClick={onOffModal}
                                data-modal-hide="popup-modal"
                                type="button"
                                className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                            >
                                No, cancel
                            </button>
                        </div> */}
                    </div>
                </div>
            </div>
        </>
    );
}
