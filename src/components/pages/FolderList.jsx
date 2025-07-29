import React, { useEffect, useState } from "react";
import AuthUser from "../../helpers/AuthUser";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import CustomLoader from "../mini_components/CustomLoader";
import AddFolderModal from "../modals/AddFolderModal";
import UpdateFolderModal from "../modals/UpdateFolderModal";
import RemoveFolderModal from "../modals/RemoveFolderModal";

export default function FolderList() {
    const [isLoading, setIsLoading] = useState(false);
    const [allFolders, setAllFolders] = useState("");
    const [loadingBtn, setLoadingBtn] = useState(false);
    const { http, user, setUser } = AuthUser();

    useEffect(() => {
        setIsLoading(true);
        http.get("/folder/list").then(({ data }) => {
            console.log(data);
            setAllFolders(data.folders);
            setIsLoading(false);
            if (data.user != null) {
                setUser(data.user);
            }
        });
    }, []);

    const addFolder = (folderName) => {
        http.post('/folder/add', {
            name: folderName
        }).then(({ data }) => {
            console.log(data);
            setAllFolders(data.folders);
            document.getElementById('addFolderModal').close();
            toast.success("Folder Added Successfully!");
        }).catch((err) => {
            console.log(err);
        });
    }

    const updateFolder = (folderName, folderId) => {
        http.post('/folder/update/' + folderId, {
            name: folderName
        }).then(({ data }) => {
            console.log(data);
            setAllFolders(data.folders);
            document.getElementById('updateFolderModal').close();
            toast.success("Folder Updated Successfully!");
        }).catch((err) => {
            console.log(err);
        });
    }
    const deleteFolder = (folderId) => {
        http.post('/folder/delete/' + folderId).then(({ data }) => {
            console.log(data);
            setAllFolders(data.folders);
            document.getElementById('removeFolderModal').close();
            toast.success("Folder Removed Successfully!");
        }).catch((err) => {
            console.log(err);
        });
    }

    return (
        <div className="mx-[8px] py-[10px] mt-2">
            <div className="grid grid-cols-1 gap-4">
                {allFolders
                    ? allFolders.map((folder, index) => (
                        // <div key={folder._id} className={`relative !z-[1] flex items-center gap-3 saturate-[1.2] bg-white/10 border-[1px] border-white/20 backdrop-blur-md text-white rounded-[18px] p-5 shadow-md shadow-gray-700/10`}>
                        <div key={folder._id} className={`flex items-center bg-white/10 border-[1px] border-white/20 rounded-[18px] p-5 shadow-md shadow-gray-700/10`}>
                            <Link className="flex gap-3 items-center flex-auto" to={`/folder/${folder._id}/music-list`}>
                                <img className="w-[30px] opacity-[50%]" src="https://i.imgur.com/yAAdnug.png" alt="" />
                                <h1 className="flex-auto text-sm font-bold">{folder.name}</h1>
                            </Link>
                            {
                                user && user.role == 'admin' ? (
                                    <div className="dropdown dropdown-bottom dropdown-end">
                                        <div tabIndex={folder._id} role="button" className="cursor-pointer m-1">
                                            <i className="fas fa-ellipsis-v"></i>
                                        </div>
                                        <ul tabIndex={folder._id} className="dropdown-content menu bg-base-100 rounded-box !z-[2] w-52 p-2 shadow-sm">
                                            <li>
                                                <a onClick={() => {
                                                    document.getElementById('updateFolderModal').showModal();
                                                    document.getElementById('updateFolderModal').querySelector('input[name="folderName"]').value = folder.name;
                                                    document.getElementById('updateFolderModal').querySelector('input[name="folderId"]').value = folder._id;
                                                }} className="cursor-pointer">Edit</a>
                                            </li>
                                            <li>
                                                <a onClick={() => {
                                                    document.getElementById('removeFolderModal').showModal();
                                                    document.getElementById('removeFolderModal').querySelector('input[name="folderId"]').value = folder._id;
                                                }} className="cursor-pointer">Delete</a>
                                            </li>
                                        </ul>
                                    </div>
                                ) : null
                            }
                        </div>
                    ))
                    : null}
            </div>

            {
                allFolders && allFolders.length == 0 ? (
                    <div className="flex flex-col justify-center items-center h-[calc(100vh-130px)]">
                        <div className="-mt-[90px] flex flex-col items-center">
                            <img
                                className="w-[60px]"
                                src="https://cdn-icons-png.flaticon.com/128/7486/7486820.png"
                                alt=""
                            />
                            <h1 className="text-blue-400">No Folders Found!</h1>
                        </div>
                    </div>
                ) : null
            }

            {
                isLoading ? (
                    <CustomLoader />
                ) : null
            }

            {
                user && user.role == 'admin' ? (
                    <>
                        <AddFolderModal popup_id="addFolderModal" funcName={addFolder} />
                        <UpdateFolderModal popup_id="updateFolderModal" funcName={updateFolder} />
                        <RemoveFolderModal popup_id="removeFolderModal" funcName={deleteFolder} />

                        <div onClick={() => document.getElementById('addFolderModal').showModal()} className="absolute bottom-[20px] right-[10px] bg-pink-600/80 backdrop-blur border-[1px] border-white/20 rounded-[18px] p-4 shadow-md shadow-gray-700/10 cursor-pointer">
                            <i className="fas fa-plus font-bold text-white text-[20px]"></i>
                        </div>
                    </>
                ) : null
            }
        </div >
    );
}
