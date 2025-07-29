import React from "react";

import step1Image from '../../../assets/images/ios-guide/step-1.jpg';
import step2_1Image from '../../../assets/images/ios-guide/step-2-1.jpg';
import step2_2Image from '../../../assets/images/ios-guide/step-2-2.jpg';
import step3_1Image from '../../../assets/images/ios-guide/step-3-1.jpg';
import step3_2Image from '../../../assets/images/ios-guide/step-3-2.jpg';
import step4Image from '../../../assets/images/ios-guide/step-4.jpg';

export default function IosAppInstallGuide() {
    return (
        <>
            <div className="mx-[8px] py-[25px]">
                <h2 className="text-[18px] text-center text-white font-bold">IOS App Install Guide</h2>

                <div className="mt-4">
                    <h1 className="flex gap-2 text-md text-white mt-3">
                       <span className="font-bold">STEP_1:</span> 
                       <span className="text-gray-400">After Click The IOS Download Button, You will see a popup. <span className="text-white font-bold">Allow</span> this popup</span>
                    </h1>
                    <img className="w-[60%] mx-auto rounded-[10px]" src={step1Image} alt="" />
                    <h1 className="flex gap-2 text-md text-white mt-3">
                       <span className="font-bold">STEP_2:</span> 
                       <span className="text-gray-400">Go to Setting App {">>"} <span className="font-bold">General</span> {">>"} <span className="font-bold">VPN & Device Management</span> </span>
                    </h1>
                    <img className="w-[60%] mx-auto rounded-[10px]" src={step2_1Image} alt="" />
                    <h1 className="text-sm text-gray-400 text-center my-2">
                        Then
                    </h1>
                    <img className="w-[60%] mx-auto rounded-[10px]" src={step2_2Image} alt="" />
                    <h1 className="flex gap-2 text-md text-white mt-3">
                       <span className="font-bold">STEP_3:</span> 
                       <span className="text-gray-400">Then Click on {">>"} <span className="font-bold">UU BUS</span> {">>"} <span className="font-bold">Install</span> </span>
                    </h1>
                    <img className="w-[60%] mx-auto rounded-[10px]" src={step3_1Image} alt="" />
                    <h1 className="text-sm text-gray-400 text-center my-2">
                        Then
                    </h1>
                    <img className="w-[60%] mx-auto rounded-[10px]" src={step3_2Image} alt="" />
                    <h1 className="flex gap-2 text-md text-white mt-3">
                       <span className="font-bold">STEP_4:</span> 
                       <span className="text-gray-400">Enjoy.</span>
                    </h1>
                    <img className="w-[60%] mx-auto rounded-[10px] my-3" src={step4Image} alt="" />
                </div>
            </div>
        </>
    );
}
