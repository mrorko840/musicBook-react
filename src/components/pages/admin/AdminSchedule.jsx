import React, { useEffect, useState } from "react";
import CustomInput from "../../mini_components/CustomInput";
import CustomModal from "../../mini_components/CustomModal";
import TimePicker from "react-time-picker";
import "react-time-picker/dist/TimePicker.css";
import "react-clock/dist/Clock.css";
import AuthUser from "../../../helpers/AuthUser";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import CustomModal2 from "../../mini_components/CustomModal2";


export default function AdminSchedule() {

    const [isDropDown, setIsDropDown] = useState(false);
    const [allSchedule, setAllSchedule] = useState("");
    const [showAddModal, setShowAddModal] = useState(false);
    const [showEditModal, setShowEditModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [busNumber, setBusNumber] = useState("");
    const [busTime, setBusTime] = useState("10:00");
    const [jurneyType, setJurneyType] = useState("down");
    const [loadingBtn, setLoadingBtn] = useState(false);
    const [road, setRoad] = useState("");

    const [scheduleEditId, setScheduleEditId] = useState("");
    const [scheduleDeleteId, setScheduleDeleteId] = useState("");

    const { http } = AuthUser();

    const { roadId } = useParams();

    const onOffAddModal = () => {
        if (showAddModal) {
            setShowAddModal(false);
            setBusNumber("");
        } else {
            setShowAddModal(true);
        }
    };

    const onOffEditModal = () => {
        if (showEditModal) {
            setShowEditModal(false);
            setBusNumber("");
        } else {
            setShowEditModal(true);
        }
    };
    const onOffDeleteModal = () => {
        if (showDeleteModal) {
            setShowDeleteModal(false);
            setBusNumber("");
        } else {
            setShowDeleteModal(true);
        }
    };

    // add
    const addSchedule = () => {
        console.log(busNumber);
        setLoadingBtn(true);
        http.post("/schedule/store", {
            bus_no: busNumber,
            start_time: busTime,
            type: jurneyType,
            road: roadId,
        })
            .then((res) => {
                console.log(res.data);
                setLoadingBtn(false);
                onOffAddModal();
                setAllSchedule((prev) => [...prev, res.data.data]);
                toast.success(res.data.message);
                setLoadingBtn(false);
            })
            .catch((err) => {
                console.log(err.response.data);
                toast.error(err.response.data.error);
                setLoadingBtn(false);
            });
    };

    // update
    const updateSchedule = () => {
        setLoadingBtn(true);
        http.post("/schedule/update/" + scheduleEditId, {
            bus_no: busNumber,
            start_time: busTime,
            type: jurneyType,
            road: roadId,
        })
            .then((res) => {
                console.log(res.data);
                setLoadingBtn(false);
                onOffEditModal();
                setAllSchedule(res.data.data);
                toast.success(res.data.message);
                setLoadingBtn(false);
            })
            .catch((err) => {
                console.log(err.response.data);
                toast.error(err.response.data.error);
                setLoadingBtn(false);
            });
    };

    // delete
    const deleteSchedule = () => {
        setLoadingBtn(true);
        http.post("/schedule/delete/" + scheduleDeleteId, { road: roadId })
            .then((res) => {
                console.log(res.data);
                setLoadingBtn(false);
                onOffDeleteModal();
                setAllSchedule(res.data.data);
                toast.success(res.data.message);
                setLoadingBtn(false);
            })
            .catch((err) => {
                console.log(err.response.data);
                toast.error(err.response.data.error);
                setLoadingBtn(false);
            });
    };

    useEffect(() => {
        http.get("/road/" + roadId).then(({ data }) => {
            console.log(data);
            setRoad(data.data);
            setAllSchedule(data.data.schedules);
        });
    }, []);

    return (
        <>
            <div className="mx-[8px] mt-2 pb-[60px]">
                <div className="flex justify-center items-center rounded-lg text-white bg-blue-600 shadow-md shadow-blue-700/50 p-2 mb-3 ">
                    <div className="flex-auto flex items-center">
                        <i className="fi fi-sr-calendar-lines-pen leading-[0px]"></i>
                        <h1 className="text-sm font-bold ps-2">
                            Manage Bus Schedule <br /> for{" "}
                            <span className="text-[18px] text-yellow-400">
                                {road ? road.name : "Loading..."}
                            </span>
                        </h1>
                    </div>
                    <i
                        onClick={onOffAddModal}
                        className="fi fi-sr-add text-[20px] leading-[0px] cursor-pointer"
                    ></i>
                </div>

                {allSchedule ? (
                    allSchedule.map((schedule, index) => (
                        <div
                            key={schedule._id}
                            className="flex items-center bg-white rounded-lg p-2 shadow-md shadow-gray-700/10 mb-2"
                        >
                            <div className="items-center flex-auto">
                                <h1 className="flex items-center text-[16px] text-blue-600/90 font-bold ps-2">
                                    <i className="fi fi-sr-bus pe-2 leading-[0px]"></i>
                                    BUS No: {schedule.bus_no}
                                </h1>
                                <h1 className="flex items-center text-[14px] text-blue-900 font-bold ps-2">
                                    {schedule.type == "up" ? (
                                        <>
                                            <span>
                                                {road ? road.name : "Loading"}
                                            </span>
                                            <i className="fi fi-ss-caret-right text-blue-900/80 leading-[0px] mx-1"></i>
                                            <span>Permanent Campus</span>
                                        </>
                                    ) : (
                                        <>
                                            <span>Permanent Campus</span>
                                            <i className="fi fi-ss-caret-right text-blue-900/80 leading-[0px] mx-1"></i>
                                            <span>
                                                {road ? road.name : "Loading"}
                                            </span>
                                        </>
                                    )}
                                </h1>
                            </div>
                            <div className="flex items-center">
                                {/* {
                                    new Date(schedule.start_time).toLocaleTimeString('en-US', {hour12: true, timeZone:'Africa/Abidjan'})
                                } */}
                                <h1 className="text-[12px] font-bold text-blue-600 border border-blue-400 rounded-full text-center px-2">
                                    {new Date(schedule.start_time).toLocaleTimeString("en-US", {
                                        hour: "2-digit",
                                        minute: "2-digit",
                                        hour12: true,
                                        timeZone:'Africa/Abidjan'
                                    })}
                                </h1>
                            </div>

                            <div className="dropdown dropdown-bottom dropdown-end">
                                <i
                                    tabIndex={schedule._id}
                                    role="button"
                                    className="fi fi-sr-circle-ellipsis text-blue-600 hover:text-blue-800 leading-[0px] cursor-pointer ms-1"
                                ></i>

                                <ul
                                    tabIndex={schedule._id}
                                    className="dropdown-content z-[1] menu p-2 shadow bg-blue-100 rounded-box w-[100px]"
                                >
                                    <li>
                                        <span
                                            onClick={() => {
                                                onOffEditModal();
                                                setScheduleEditId(schedule._id);
                                                setBusNumber(schedule.bus_no);
                                                setJurneyType(schedule.type);
                                                setBusTime(
                                                    new Date(
                                                        schedule.start_time
                                                    ).toLocaleTimeString([], {
                                                        hour: "2-digit",
                                                        minute: "2-digit",
                                                        timeZone:'Africa/Abidjan'
                                                    })
                                                );
                                            }}
                                            className="text-blue-600"
                                        >
                                            Edit
                                        </span>
                                    </li>
                                    <li>
                                        <span
                                            className="text-red-600"
                                            onClick={() => {
                                                onOffDeleteModal();
                                                setScheduleDeleteId(
                                                    schedule._id
                                                );
                                            }}
                                        >
                                            Delete
                                        </span>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="flex flex-col justify-center items-center h-[calc(100vh-150px)]">
                        <span className="loading loading-bars text-blue-500 loading-lg -mt-[60px]"></span>
                    </div>
                )}

                {allSchedule && allSchedule.length == 0 ? (
                    <div className="flex flex-col justify-center items-center h-[calc(100vh-150px)]">
                        <div className="-mt-[120px] flex flex-col items-center">
                            <img
                                className="w-[60px] opacity-[70%]"
                                src="https://cdn-icons-png.flaticon.com/128/3101/3101162.png"
                                alt=""
                            />
                            <h1 className="text-blue-400">
                                No Schedules Found!
                            </h1>
                        </div>
                    </div>
                ) : null}
            </div>

            {/* add schedule modal */}
            <CustomModal isShowModal={showAddModal} onOffModal={onOffAddModal}>
                <div className="p-4 md:p-5 text-center">
                    <h3 className="mb-5 text-lg font-normal text-gray-500">
                        Add Road Name
                    </h3>

                    <div className="text-start">
                        <CustomInput
                            icon={
                                <i className="fi fi-sr-bus leading-[0px]"></i>
                            }
                            type="number"
                            label="Bus Number"
                            placeholder="Enter Bus No."
                            value={busNumber}
                            onChange={(e) => setBusNumber(e.target.value)}
                        />

                        <label
                            htmlFor="username"
                            className="block mb-1 ms-1 text-start text-[13px] font-medium text-gray-900 z-100"
                        >
                            Select Journy Type
                        </label>
                        <select
                            onChange={(e) => setJurneyType(e.target.value)}
                            value={jurneyType}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-3"
                        >
                            <option value="up">UP</option>
                            <option value="down">DOWN</option>
                        </select>

                        <TimePicker
                            className={`mb-5 w-full`}
                            locale={"bn-BD"}
                            onChange={setBusTime}
                            value={busTime}
                            disableClock
                            required
                        />
                    </div>

                    <button
                        onClick={addSchedule}
                        data-modal-hide="popup-modal"
                        type="button"
                        className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                    >
                        {loadingBtn ? "Loading..." : "Add Schedule"}
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

            {/* update schedule modal */}
            <CustomModal
                isShowModal={showEditModal}
                onOffModal={onOffEditModal}
            >
                <div className="p-4 md:p-5 text-center">
                    <h3 className="mb-5 text-lg font-normal text-gray-500">
                        Update Schedule
                    </h3>

                    <div className="text-start">
                        <CustomInput
                            icon={
                                <i className="fi fi-sr-bus leading-[0px]"></i>
                            }
                            type="number"
                            label="Bus Number"
                            placeholder="Enter Bus No."
                            value={busNumber}
                            onChange={(e) => setBusNumber(e.target.value)}
                        />

                        <label
                            htmlFor="username"
                            className="block mb-1 ms-1 text-start text-[13px] font-medium text-gray-900 z-100"
                        >
                            Select Journy Type
                        </label>
                        <select
                            onChange={(e) => setJurneyType(e.target.value)}
                            value={jurneyType}
                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-3"
                        >
                            <option value="up">UP</option>
                            <option value="down">DOWN</option>
                        </select>

                        {/* <div className="py-4">{busTime}</div> */}

                        <TimePicker
                            className={`mb-5 w-full`}
                            locale={"bn-BD"}
                            onChange={setBusTime}
                            value={busTime}
                            disableClock
                            required
                        />
                    </div>

                    <button
                        onClick={updateSchedule}
                        data-modal-hide="popup-modal"
                        type="button"
                        className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                    >
                        {loadingBtn ? "Loading..." : "Update Schedule"}
                    </button>
                    <button
                        onClick={onOffEditModal}
                        data-modal-hide="popup-modal"
                        type="button"
                        className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    >
                        No, cancel
                    </button>
                </div>
            </CustomModal>

            {/* delete schedurl modal */}
            <CustomModal
                isShowModal={showDeleteModal}
                onOffModal={() => onOffDeleteModal()}
            >
                <div className="p-4 md:p-5 text-center">
                    <i className="fi fi-sr-seal-exclamation text-red-500/80 text-[50px]"></i>
                    <h3 className="mb-5 text-lg font-normal text-gray-500">
                        Are you sure to remove this Schedule?
                    </h3>

                    <button
                        onClick={() => deleteSchedule()}
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
