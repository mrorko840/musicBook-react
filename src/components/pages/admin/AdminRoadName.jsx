import React, { useEffect, useState } from "react";
import CustomInput from "../../mini_components/CustomInput";
import AuthUser from "../../../helpers/AuthUser";
import toast from "react-hot-toast";
import CustomModal from "../../mini_components/CustomModal";
import { Link } from "react-router-dom";

export default function AdminRoadName() {
    const [showModal, setShowModal] = useState(false);

    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [roadIdForDelete, setRoadIdForDelete] = useState("");

    const [showUpdateModal, setShowUpdateModal] = useState(false);
    const [roadIdForUpdate, setRoadIdForUpdate] = useState("");

    const [roadName, setRoadName] = useState("");
    const [allRoads, setAllRoads] = useState("");
    const [loadingBtn, setLoadingBtn] = useState(false);
    const { http } = AuthUser();

    const onOffModal = () => {
        if (showModal) {
            setShowModal(false);
            setRoadName("");
        } else {
            setShowModal(true);
        }
    };
    const onOffDeleteModal = (roadId) => {
        if (showDeleteModal) {
            setShowDeleteModal(false);
            setRoadIdForDelete("");
        } else {
            setRoadIdForDelete(roadId);
            setShowDeleteModal(true);
        }
    };

    const onOffUpdateModal = (roadId) => {
        if (showUpdateModal) {
            setShowUpdateModal(false);
            setRoadIdForUpdate("");
        } else {
            setRoadIdForUpdate(roadId);
            setShowUpdateModal(true);
        }
    };

    //road add
    const roadAdd = () => {
        setLoadingBtn(true);
        http.post("/road/store", { name: roadName, status: "active" })
            .then((res) => {
                console.log(res.data);
                setLoadingBtn(false);
                onOffModal();
                setAllRoads(res.data.data);
                toast.success(res.data.message);
            })
            .catch((err) => {
                console.log(err.response.data);
                toast.error(err.response.data.error);
                setLoadingBtn(false);
            });
    };

    //road update
    const roadUpdate = (roadId) => {
        setLoadingBtn(true);
        http.post("/road/update/" + roadId, {
            name: roadName,
            status: "active",
        })
            .then((res) => {
                console.log(res.data);
                setLoadingBtn(false);
                onOffUpdateModal();
                setAllRoads(res.data.data);
                toast.success(res.data.message);
            })
            .catch((err) => {
                console.log(err.response.data);
                toast.error(err.response.data.error);
                setLoadingBtn(false);
            });
    };

    // road delete
    const roadRemove = (road_id) => {
        setLoadingBtn(true);
        http.post("/road/delete", { _id: road_id })
            .then((res) => {
                console.log(res.data);
                setAllRoads(res.data.data);
                toast.success(res.data.message);
                setLoadingBtn(false);
                onOffDeleteModal(); //  close the delete modal
            })
            .catch((err) => {
                console.log(err.response.data);
                toast.error(err.response.data.error);
                setLoadingBtn(false);
            });
    };

    useEffect(() => {
        http.get("/road/all").then(({ data }) => {
            console.log(data);
            setAllRoads(data.data);
        });
    }, []);

    return (
        <div className="mx-[8px] mt-2">
            <div className="flex justify-center items-center rounded-lg text-white bg-blue-600 shadow-md shadow-blue-700/50 p-2 mb-3 ">
                <div className="flex-auto flex items-center">
                    <i className="fi fi-sr-direction-signal leading-[0px]"></i>
                    <h1 className="text-sm font-bold ps-2">Manage Road List</h1>
                </div>
                <i
                    onClick={onOffModal}
                    className="fi fi-sr-add leading-[0px] cursor-pointer"
                ></i>
            </div>

            <div className="grid grid-cols-2 gap-4">
                {allRoads
                    ? allRoads.map((road, index) => (
                          <div
                              key={road._id}
                              className="flex items-center bg-white hover:bg-blue-500 text-blue-500 hover:text-white rounded-lg p-2 shadow-md shadow-gray-700/10"
                          >
                              <Link to={`/admin/bus-schedule/${road._id}`} className="text-sm flex-auto font-bold">
                                  {road.name}
                              </Link>
                              <i
                                  onClick={() => {
                                      onOffUpdateModal(road._id);
                                      setRoadName(road.name);
                                  }}
                                  className="fi fi-sr-file-edit cursor-pointer leading-[0px]"
                              ></i>
                              <i
                                  onClick={() => onOffDeleteModal(road._id)}
                                  className="fi fi-sr-trash text-red-500 cursor-pointer leading-[0px] ms-2"
                              ></i>
                          </div>
                      ))
                    : null}
            </div>

            {allRoads && allRoads.length == 0 ? (
                <div className="flex flex-col justify-center items-center h-[calc(100vh-130px)]">
                    <div className="-mt-[110px] flex flex-col items-center">
                        <img
                            className="w-[60px]"
                            src="https://cdn-icons-png.flaticon.com/128/7486/7486820.png"
                            alt=""
                        />
                        <h1 className="text-blue-400">No Road List Found!</h1>
                    </div>
                </div>
            ) : null}

            {!allRoads ? (
                <div className="flex flex-col justify-center items-center h-[calc(100vh-130px)]">
                    <span className="loading loading-bars text-blue-500 loading-lg -mt-[50px]"></span>
                </div>
            ) : null}

            {/* add road modal */}
            <CustomModal isShowModal={showModal} onOffModal={onOffModal}>
                <div className="p-4 md:p-5 text-center">
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
                </div>
            </CustomModal>

            {/* update road modal */}
            <CustomModal
                isShowModal={showUpdateModal}
                onOffModal={onOffUpdateModal}
            >
                <div className="p-4 md:p-5 text-center">
                    <h3 className="mb-5 text-lg font-normal text-gray-500">
                        Update This Road Name
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
                        onClick={() => roadUpdate(roadIdForUpdate)}
                        data-modal-hide="popup-modal"
                        type="button"
                        className="text-white bg-blue-600 hover:bg-blue-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                    >
                        {loadingBtn ? "Loading..." : "Update Road"}
                    </button>
                    <button
                        onClick={onOffUpdateModal}
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
                        Are you sure to remove this Road Name?
                    </h3>

                    <button
                        onClick={() => roadRemove(roadIdForDelete)}
                        data-modal-hide="popup-modal"
                        type="button"
                        className="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center"
                    >
                        {loadingBtn ? "Loading..." : "Yes, Sure"}
                    </button>
                    <button
                        onClick={() => onOffDeleteModal("")}
                        data-modal-hide="popup-modal"
                        type="button"
                        className="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                    >
                        No, cancel
                    </button>
                </div>
            </CustomModal>
        </div>
    );
}
