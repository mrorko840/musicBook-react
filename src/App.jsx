import { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";

import TopNav from "./components/includes/TopNav";
import Sidebar from "./components/includes/Sidebar.jsx";
import AdminLogin from "./components/pages/admin/AdminLogin";
import GuestCheck from "./middleware/GuestCheck";
import AuthCheck from "./middleware/AuthCheck";
import AdminRoadName from "./components/pages/admin/AdminRoadName";
import RoadName from "./components/pages/FolderList.jsx";
import AppDownload from "./components/pages/app/AppDownload";
import IosAppInstallGuide from "./components/pages/app/IosAppInstallGuide";
import AuthUser from "./helpers/AuthUser";
import AdminNotice from "./components/pages/admin/AdminNotice.jsx";
import Notice from "./components/pages/Notice.jsx";
import global from './helpers/GlobalVariable';
import MusicList from "./components/pages/MusicList.jsx";
import Login from "./components/pages/Login.jsx";
import SiteSetting from "./helpers/SiteSetting.jsx";

function App() {
    const [isShowSideBar, setIsShowSideBar] = useState(true);
    const [isLoading, setIsLoading] = useState(true);
    const { http } = AuthUser();
    const { setting, saveSetting, setSetting } = SiteSetting();

    const openCloseSideBar = () => {
        if (isShowSideBar) {
            setIsShowSideBar(false);
        } else {
            setIsShowSideBar(true);
        }
    };
    useEffect(() => {
        setIsLoading(true);
        // const splashScreen = setTimeout(() => {
        //     setIsLoading(false);
        // }, 2500);

        http.get('/setting').then(({ data }) => {
            if (data.cls === 'error') {
                toast.error(data.message);
                return 0;
            }
            saveSetting(data.setting);
            setSetting(data.setting);
            setIsLoading(false);
        }).catch((err) => {
            console.log(err);
        })

        // return () => clearTimeout(splashScreen);
    }, []);

    return isLoading ? (
        <div className="grid justify-items-center h-[calc(100vh-7rem)]">
            <div className="-mt-[100px] self-end flex flex-col items-center">
                <img
                    className="bg-white w-[100px] rounded-[25px] p-2 shadow-md shadow-gray-900"
                    src={global.app_logo}
                    alt=""
                />
                <h1 className="font-bold text-[20px] text-white mt-3">
                    MUSIC-BOOK
                </h1>
            </div>

            <h1 className="self-end text-gray-400">
                Developed by <a href="https://facebook.com/mr.orko.10" className="text-white">HEMEL</a>
            </h1>
        </div>
    ) : (
        <>
            <TopNav openCloseSideBar={openCloseSideBar} />
            <Sidebar
                openCloseSideBar={openCloseSideBar}
                isShow={isShowSideBar}
            />
            <div className="pt-[47px] pb-1">
                <Routes>
                    <Route path="/" element={<RoadName />} />
                    <Route path="/folder/:folderId/music-list" element={<MusicList />} />
                    <Route path="/notice" element={<Notice />} />
                    <Route path="/app-download" element={<AppDownload />} />
                    <Route path="/ios-app-install-guide" element={<IosAppInstallGuide />} />
                    {/* admin routes start */}
                    <Route path="/login" element={<GuestCheck com={<Login />} />} />

                    <Route path="/admin" element={<GuestCheck com={<AdminLogin />} />} />
                    <Route
                        path="/admin/road-name"
                        element={<AuthCheck com={<AdminRoadName />} />}
                    />
                    <Route
                        path="/admin/notice"
                        element={<AuthCheck com={<AdminNotice />} />}
                    />
                    {/* admin routes end */}
                </Routes>
            </div>
        </>
    );
}

export default App;
