import React, { useState } from "react";
import CustomInput from "../mini_components/CustomInput";
import CustomBtn from "../mini_components/CustomBtn";
import toast from "react-hot-toast";
import AuthUser from "../../helpers/AuthUser";
import { checkToken } from "../../helpers/helper";

export default function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [loadingBtn, setLoadingBtn] = useState(false);
    const { http, setToken } = AuthUser();

    const loginSubmit = (e) => {
        e.preventDefault();
        setLoadingBtn(true);
        //api call
        http.post("/user/login", { username, password })
            .then(({ data }) => {
                console.log(data);
                if (data.cls == 'success') {
                    const accessToken = data.token;
                    const userInfo = data.user;

                    setToken(userInfo, accessToken);
                    checkToken();
                    
                    toast.success(data.message);
                } else {
                    toast.error(data.message);
                }
                setLoadingBtn(false);
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
                    <h1 className="text-[24px] font-bold text-white text-center">Login</h1>
                    <h1 className="text-[15px] text-gray-300 text-center">After login admin can manage every thing.</h1>
                </div>
                <form onSubmit={loginSubmit}>
                    <CustomInput
                        type="text"
                        onChange={(e) => setUsername(e.target.value)}
                        label={'Username'}
                        icon={<i className="fas fa-user text-pink-700/60 leading-[0px]"></i>}
                        placeholder="enter your username"
                    />
                    <CustomInput
                        type="password"
                        onChange={(e) => setPassword(e.target.value)}
                        label={'Password'}
                        icon={<i className="fas fa-lock text-pink-700/60 leading-[0px]"></i>}
                        placeholder="enter your password"
                    />

                    <CustomBtn type="submit" className={'mt-5'} bgFrom={'from-pink-600'} bgTo={'to-pink-600'}>
                        {loadingBtn ? 'Loading...' : 'Login Now'}
                    </CustomBtn>
                </form>

            </div>
        </>
    );
}
