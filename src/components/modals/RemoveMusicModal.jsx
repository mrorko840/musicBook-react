import React from 'react'
import CustomPopup from '../mini_components/CustomPopup';

export default function RemoveMusicModal({popup_id, funcName}) {
    return (
        <>
            <CustomPopup id={popup_id}>
                <div className="flex justify-between items-center">
                    <h3 className="font-bold text-lg">Remove Music</h3>
                    <form method="dialog">
                        <button className="btn">Close</button>
                    </form>
                </div>
                <div className="modal-action">
                    <form className="w-full" method="dialog" onSubmit={(e) => {
                        e.preventDefault();
                        const formData = new FormData(e.target);
                        const musicId = formData.get('musicId');
                        funcName(musicId);
                        e.target.reset();
                    }}>
                        <input type="text" value="" name="musicId" className="hidden" />
                        <h1>
                            Are you sure you want to remove this music?
                        </h1>
                        <button className="btn bg-pink-700 w-full mt-5 mb-5 py-6 rounded-[16px]">Remove Music</button>
                    </form>
                </div>
            </CustomPopup>
        </>
    )
}
