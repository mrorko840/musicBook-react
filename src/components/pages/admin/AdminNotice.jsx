import React, { useEffect, useState } from "react";
import AuthUser from "../../../helpers/AuthUser";
import CustomInput from "../../mini_components/CustomInput";
import CustomModal from "../../mini_components/CustomModal";
import toast from "react-hot-toast";

export default function AdminNotice() {
    const [showAddModal, setShowAddModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [deleteId, setDeleteId] = useState("");
    const [loadingBtn, setLoadingBtn] = useState(false);
    const [notice, setNotice] = useState("");
    const [allNotice, setAllNotice] = useState("");
    const { http } = AuthUser();

    const onOffAddModal = () => {
        if (showAddModal) {
            setShowAddModal(false);
        } else {
            setShowAddModal(true);
            setNotice("");
        }
    };
    const onOffDeleteModal = () => {
        if (showDeleteModal) {
            setShowDeleteModal(false);
        } else {
            setShowDeleteModal(true);
        }
    };

    //notice add
    const noticeAdd = () => {
        setLoadingBtn(true);
        http.post("/notice/store", { notice: notice, status: "active" })
            .then((res) => {
                console.log(res.data);
                setLoadingBtn(false);
                onOffAddModal();
                setAllNotice(res.data.notices);
                toast.success(res.data.message);
            })
            .catch((err) => {
                console.log(err.response.data);
                toast.error(err.response.data.error);
                setLoadingBtn(false);
            });
    };
    //notice remove
    const noticeDelete = () => {
        setLoadingBtn(true);
        http.post("/notice/delete/" + deleteId)
            .then((res) => {
                console.log(res.data);
                setLoadingBtn(false);
                onOffDeleteModal();
                setAllNotice(res.data.notices);
                toast.success(res.data.message);
            })
            .catch((err) => {
                console.log(err.response.data);
                toast.error(err.response.data.error);
                setLoadingBtn(false);
            });
    };

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
                        <h1 className="text-sm font-bold ps-2">
                            Manage Notice
                        </h1>
                    </div>
                    <i
                        onClick={onOffAddModal}
                        className="fi fi-sr-add leading-[0px] cursor-pointer"
                    ></i>
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
                            <i
                                onClick={() => {
                                    onOffDeleteModal();
                                    setDeleteId(notice._id);
                                }}
                                className="fi fi-sr-trash text-red-500 cursor-pointer leading-[0px] ms-2"
                            ></i>
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
                            <h1 className="text-blue-400">No Notice Found!</h1>
                        </div>
                    </div>
                ) : null}
            </div>

            {/* add notice modal */}
            <CustomModal isShowModal={showAddModal} onOffModal={onOffAddModal}>
                <div className="p-4 md:p-5 text-center">
                    <h3 className="mb-5 text-lg font-normal text-gray-500">
                        Add Notice
                    </h3>

                    <CustomInput
                        icon={
                            <i className="fi fi-sr-light-emergency-on leading-[0px]"></i>
                        }
                        placeholder="Enter Notice"
                        value={notice}
                        onChange={(e) => setNotice(e.target.value)}
                    />

                    <button
                        onClick={noticeAdd}
                        data-modal-hide="popup-modal"
                        type="button"
                        className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                    >
                        {loadingBtn ? "Loading..." : "Add Notice"}
                    </button>
                    <button
                        onClick={onOffAddModal}
                        data-modal-hide="popup-modal"
                        type="button"
                        className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    >
                        No, cancel
                    </button>
                </div>
            </CustomModal>

            {/* delete road modal */}
            <CustomModal
                isShowModal={showDeleteModal}
                onOffModal={() => onOffDeleteModal("")}
            >
                <div className="p-4 md:p-5 text-center">
                    <i className="fi fi-sr-seal-exclamation text-red-500/80 text-[50px]"></i>
                    <h3 className="mb-5 text-lg font-normal text-gray-500">
                        Are you sure to remove this Notice?
                    </h3>

                    <button
                        onClick={() => noticeDelete()}
                        data-modal-hide="popup-modal"
                        type="button"
                        className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                    >
                        {loadingBtn ? "Loading..." : "Yes, Sure"}
                    </button>
                    <button
                        onClick={() => onOffDeleteModal()}
                        data-modal-hide="popup-modal"
                        type="button"
                        className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    >
                        No, cancel
                    </button>
                </div>
            </CustomModal>
        </>
    );
}
