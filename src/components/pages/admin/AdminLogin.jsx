import React, { useState } from "react";
import CustomInput from "../../mini_components/CustomInput";
import CustomBtn from "../../mini_components/CustomBtn";
import toast from "react-hot-toast";
import AuthUser from "../../../helpers/AuthUser";
import { checkToken } from "../../../helpers/helper";

export default function AdminLogin() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loadingBtn, setLoadingBtn] = useState(false);
    const { http, setToken } = AuthUser();

    const loginSubmit = (e) => {
        e.preventDefault();
        setLoadingBtn(true);
        //api call
        http.post("/user/login", { username, password })
            .then((res) => {
                console.log(res.data);
                const accessToken = res.data.token;
                const userInfo = res.data.userInfo;
                setToken(userInfo, accessToken);
                setLoadingBtn(false);
                checkToken();
            })
            .catch((err) => {
                console.log(err.response.data);
                toast.error(err.response.data.error);
                setLoadingBtn(false);
            });
    };

    return (
        <>
            <div className="mx-[8px] mt-2">

                <div className="mt-6 mb-10">
                    <h1 className="text-[24px] font-bold text-blue-700 text-center">Admin Login</h1>
                    <h1 className="text-[15px] text-gray-500 text-center">After login admin can manage every thing.</h1>
                </div>
                <form onSubmit={loginSubmit}>
                    <CustomInput
                        type="text"
                        onChange={(e)=> setUsername(e.target.value)}
                        label={'Username'}
                        icon={<i className="fi fi-sr-user text-blue-700/80 leading-[0px]"></i>}
                        placeholder="enter your username"
                    />
                    <CustomInput
                        type="password"
                        onChange={(e)=> setPassword(e.target.value)}
                        label={'Password'}
                        icon={<i className="fi fi-sr-lock text-blue-700/80 leading-[0px]"></i>}
                        placeholder="enter your password"
                    />

                    <CustomBtn type="submit" className={'mt-5'} bgFrom={'from-blue-500'}>
                        {loadingBtn ? 'Loading...' : 'Login Now'}
                    </CustomBtn>
                </form>

            </div>
        </>
    );
}
