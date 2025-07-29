import React, { useState } from "react";
import { Link } from "react-router-dom";
import AuthUser from "../../helpers/AuthUser";
import { checkToken } from "../../helpers/helper";

export default function Sidebar({ openCloseSideBar, isShow }) {
    const { logout, token } = AuthUser();

    const [currentToken, setCurrentToken] = useState(checkToken());
    return (
        <>
            <div
                className={`fixed top-0 left-0 z-40 w-64 h-screen p-4 overflow-y-auto transition-transform ${
                    isShow ? "-translate-x-full" : "transform-none"
                } bg-black/20 backdrop-blur-md`}
                tabIndex="-1"
                aria-labelledby="drawer-navigation-label"
            >
                <h5
                    id="drawer-navigation-label"
                    className="text-base font-semibold text-gray-500 uppercase dark:text-gray-400"
                >
                    Menu
                </h5>
                <button
                    onClick={openCloseSideBar}
                    type="button"
                    data-drawer-hide="drawer-navigation"
                    aria-controls="drawer-navigation"
                    className="text-gray-400 bg-transparent hover:bg-rose-900 hover:text-white rounded-lg text-sm p-1.5 absolute top-2.5 end-2.5 inline-flex items-center"
                >
                    <svg
                        aria-hidden="true"
                        className="w-5 h-5"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                        ></path>
                    </svg>
                    <span className="sr-only">Close menu</span>
                </button>
                <div className="py-4 overflow-y-auto">
                    <ul className="space-y-2 font-medium">
                        <li>
                            <Link
                                onClick={openCloseSideBar}
                                to="/"
                                className="flex items-center p-2 rounded-lg text-white hover:bg-white/20 bg-white/10 border-[1px] border-white/20 group"
                            >
                                <i className="fi fi-ss-apps leading-[0px]"></i>
                                <span className="ms-3">Folders</span>
                            </Link>
                        </li>
                    </ul>
                    <ul className="font-medium">
                        {checkToken() ? null : (
                            <li>
                                <Link
                                    onClick={openCloseSideBar}
                                    to="/login"
                                    className="flex items-center p-2 rounded-lg text-white hover:bg-white/20 bg-white/10 border-[1px] border-white/20 group my-2"
                                >
                                    <i className="fi fi-ss-admin-alt leading-[0px]"></i>
                                    <span className="ms-3">Login</span>
                                </Link>
                            </li>
                        )}
                        {checkToken() ? (
                            <>
                                <li>
                                    <div
                                        onClick={() => {
                                            openCloseSideBar();
                                            logout();
                                            setCurrentToken(null);
                                        }}
                                        className="flex items-center p-2 rounded-lg text-white hover:bg-white/20 bg-white/10 border-[1px] border-white/20 group cursor-pointer my-2"
                                    >
                                        <i className="fi fi-ss-power leading-[0px]"></i>
                                        <span className="ms-3">Logout</span>
                                    </div>
                                </li>
                            </>
                        ) : null}
                    </ul>

                    <h5
                        id="drawer-navigation-label"
                        className="text-base font-semibold text-gray-500 uppercase dark:text-gray-400 mt-6 mb-2"
                    >
                        Others
                    </h5>

                    <ul className="space-y-2 font-medium">
                        <li>
                            <Link
                                onClick={openCloseSideBar}
                                to="/app-download"
                                className="flex items-center p-2 rounded-lg text-white hover:bg-white/20 bg-white/10 border-[1px] border-white/20 group"
                            >
                                <i className="fi fi-ss-tablet-android-alt leading-[0px]"></i>
                                <span className="ms-3">App Download</span>
                            </Link>
                        </li>
                    </ul>

                    <div className="absolute bottom-[15px] w-[100%]">
                        <div className="flex -ms-5">
                            <a
                                href="https://facebook.com/mr.orko.10"
                                className=" text-gray-200 text-[15px] text-center w-[100%]"
                                target="_blank"
                            >
                                Developed by <i className="fi fi-brands-facebook leading-[0px] px-1"></i> HEMEL
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
