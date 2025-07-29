import React from 'react'
import CustomPopup from '../mini_components/CustomPopup'

export default function UpdateMusicModal({ popup_id, funcName }) {
    return (
        <>
            <CustomPopup id={popup_id}>
                <div className="flex justify-between items-center">
                    <h3 className="font-bold text-lg">Update Music</h3>
                    <form method="dialog">
                        <button className="btn">Close</button>
                    </form>
                </div>
                <div className="modal-action">
                    <form className="w-full" method="dialog" onSubmit={(e) => {
                        e.preventDefault();
                        const formData = new FormData(e.target);
                        const musicName = formData.get('musicName');
                        const musicLink = formData.get('musicLink');
                        const musicId = formData.get('musicId');
                        funcName(musicName, musicLink, musicId);
                        e.target.reset();
                    }}>
                        <input type="text" value="" name="musicId" className="hidden" />
                        <div className="grid gap-3">
                            <input type="text" placeholder="Enter Music Name" className="input input-bordered text-[16px] w-full !px-4 !py-6 rounded-[16px]" name="musicName" />
                            <input type="text" placeholder="Enter Music Link" className="input input-bordered text-[16px] w-full !px-4 !py-6 rounded-[16px]" name="musicLink" />
                        </div>
                        <button className="btn bg-pink-700 w-full mt-5 mb-5 py-6 rounded-[16px]">Update Music</button>
                    </form>
                </div>
            </CustomPopup>
        </>
    )
}
