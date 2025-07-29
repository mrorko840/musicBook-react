import React from 'react'
import CustomPopup from '../mini_components/CustomPopup'

export default function AddFolderModal({ popup_id, funcName }) {
    return (
        <>
            <CustomPopup id={popup_id}>
                <div className="flex justify-between items-center">
                    <h3 className="font-bold text-lg">Add Folder</h3>
                    <form method="dialog">
                        <button className="btn">Close</button>
                    </form>
                </div>
                <div className="modal-action">
                    <form className="w-full" method="dialog" onSubmit={(e) => {
                        e.preventDefault();
                        const formData = new FormData(e.target);
                        const folderName = formData.get('folderName');
                        funcName(folderName);
                        e.target.reset();
                    }}>
                        <input type="text" placeholder="Enter Folder Name" className="input input-bordered text-[16px] w-full !px-4 !py-6 rounded-[16px]" name="folderName" />

                        <button className="btn bg-pink-700 w-full mt-5 mb-5 py-6 rounded-[16px]">Add Folder</button>
                    </form>
                </div>
            </CustomPopup>
        </>
    )
}
