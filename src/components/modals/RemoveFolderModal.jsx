import React from 'react'
import CustomPopup from '../mini_components/CustomPopup';

export default function RemoveFolderModal({popup_id, funcName}) {
    return (
        <>
            <CustomPopup id={popup_id}>
                <div className="flex justify-between items-center">
                    <h3 className="font-bold text-lg">Remove Folder</h3>
                    <form method="dialog">
                        <button className="btn">Close</button>
                    </form>
                </div>
                <div className="modal-action">
                    <form className="w-full" method="dialog" onSubmit={(e) => {
                        e.preventDefault();
                        const formData = new FormData(e.target);
                        const folderId = formData.get('folderId');
                        funcName(folderId);
                        e.target.reset();
                    }}>
                        <input type="text" value="" name="folderId" className="hidden" />
                        <h1>
                            Are you sure you want to remove this folder?
                        </h1>
                        <button className="btn bg-pink-700 w-full mt-5 mb-5 py-6 rounded-[16px]">Remove Folder</button>
                    </form>
                </div>
            </CustomPopup>
        </>
    )
}
