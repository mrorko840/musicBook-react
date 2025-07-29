import React from "react";

export default function CustomModal2({children, isOpenModal}) {

    console.log(isOpenModal);
    return (
        <>
            <dialog className="modal"  >
                <div className="modal-box">
                    <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                            ✕
                        </button>
                    </form>
                    {children}
                </div>
            </dialog>
        </>
    );
}
