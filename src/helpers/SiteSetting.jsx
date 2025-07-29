import React, { useState } from "react";
import AuthUser from './AuthUser';


export default function SiteSetting() {
    const { http } = AuthUser();

    const getSettingFromServer = () => {
        http.get('/setting').then(({data})=>{
            console.log(data);
            saveSetting(data.setting);
        })
    }

    const getSetting = () => {
        const stringSetting = localStorage.getItem("site_setting");
        return JSON.parse(stringSetting);
    }

    const [ setting, setSetting ] = useState(getSetting());

    const saveSetting = (setting) => {
        localStorage.setItem("site_setting", JSON.stringify(setting));
        setSetting(setting);
    }

    return {
        setSetting,
        saveSetting,
        setting,
        getSetting,
        getSettingFromServer,
    }
}
