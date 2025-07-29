import React from "react";
import { Link } from "react-router-dom";
import global from '../../../helpers/GlobalVariable';
import SiteSetting from "../../../helpers/SiteSetting";

export default function AppDownload() {
    const { setting } = SiteSetting();
    const iosAppLink = setting.ios_app_link;
    const androidAppLink = setting.android_app_link;

    return (
        <>
            <div className="mx-[8px] py-[20px] mt-2">
                <div className="flex items-center justify-center">
                    <img
                        className="w-[100px] h-[100px] bg-white p-2 rounded-[20px] shadow-sm shadow-gray-500/90"
                        src={global.app_logo}
                        alt=""
                    />
                </div>

                <h1 className="text-[30px] font-semibold text-center text-white mt-2">
                    {setting.site_name}
                </h1>
                <h1 className="text-[16px] font-bold text-justify text-white mt-2">
                    About {setting.site_name} App
                </h1>
                <h1 className="text-[13px] font-semibold text-justify text-gray-400">
                    {setting.site_name} is a free music streaming platform that lets you discover and enjoy millions of songs. With our user-friendly interface, you can create playlists, follow your favorite artists, and listen to high-quality music anytime, anywhere. We regularly update our library with the latest releases and classic hits to provide you with the best music experience.
                </h1>
                <h1 className="text-[16px] font-bold text-justify text-white mt-2">
                    Download the App Today!
                </h1>
                <h1 className="text-[13px] font-semibold text-justify text-gray-400">
                    {setting.site_name} is a free music app that provides you with a wide range of music.
                </h1>

                <div className="flex flex-col items-center gap-4 justify-center mt-4">
                    <a href={androidAppLink} className="flex items-center bg-gray-900 rounded-[10px] cursor-pointer py-2 px-4">
                        <img className="w-[27px] h-[30px]" src="https://cdn-icons-png.flaticon.com/128/11516/11516179.png" alt="" />
                        <div className="ms-2">
                            <h1 className="text-white text-[8px]">DOWNLOAD ON</h1>
                            <h1 className="text-white text-[18px]">Android Device</h1>
                        </div>
                    </a>
                    <a href={iosAppLink} className="flex items-center bg-gray-900 rounded-[10px] cursor-pointer py-2 px-4" target="_blank">
                        <img className="w-[30px] h-[30px] invert" src="https://cdn-icons-png.flaticon.com/128/270/270781.png" alt="" />
                        <div className="ms-2">
                            <h1 className="text-white text-[8px]">DOWNLOAD ON</h1>
                            <h1 className="text-white text-[18px]">IOS Device</h1>
                        </div>
                    </a>
                    {/* <a onClick={()=> saveAs("../../../assets/apps/UUBUSAPP.mobileconfig", "UUBUSAPP.mobileconfig")} className="flex items-center bg-gray-900 rounded-[10px] cursor-pointer py-2 px-4" target="_blank">
                        <img className="w-[30px] h-[30px] invert" src="https://cdn-icons-png.flaticon.com/128/270/270781.png" alt="" />
                        <div className="ms-2">
                            <h1 className="text-white text-[8px]">DOWNLOAD ON</h1>
                            <h1 className="text-white text-[18px]">IOS Device</h1>
                        </div>
                    </a> */}
                </div>

                <Link to="/ios-app-install-guide" className="flex items-center gap-1 justify-center text-white text-sm mt-2">
                    <i className="fi fi-rr-interrogation leading-[0px]"></i> IOS App Install Guide
                </Link>
            </div>
        </>
    );
}
