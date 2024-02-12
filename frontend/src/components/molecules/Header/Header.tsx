"use client";
import { useState } from "react";
import { CgProfile } from "react-icons/cg";
import ProfileModel from "../Profile/ProfileModel/ProfileModel";

export default function Header() {
  const [openProfileModel, setOpenProfileModel] = useState(false);
  const onCloseProfileModel = () => {
    setOpenProfileModel(false);
  };
  return (
    <>
      <div className="flex justify-between items-center border-b px-10 py-4">
        <div>
          <h1 className="logo">
            Music<span className="text-blue-500">S</span>nyc
          </h1>
        </div>
        <div>
          <button onClick={() => setOpenProfileModel(true)}>
            <CgProfile size={35} />
          </button>
        </div>
      </div>

      {openProfileModel && (
        <ProfileModel open={openProfileModel} close={onCloseProfileModel} />
      )}
    </>
  );
}
