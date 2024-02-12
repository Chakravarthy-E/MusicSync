"use client";

import { clearLocalStorage, getFromLocalStorage } from "@/utils/storage";
import { useRouter } from "next/navigation";
import { MdClose } from "react-icons/md";

const ProfileModel = ({ open, close }: any) => {
  const router = useRouter();
  const handleLogout = () => {
    clearLocalStorage();
    router.push("/auth/login");
    close();
  };

  const isAuthUser = getFromLocalStorage("AUTH_TOKEN");
  if (!isAuthUser || !open) return null;

  return (
    <div className="bg-black z-50 absolute right-4 top-20 border w-96 rounded-md font-Montserrat">
      <div className="relative">
        <button onClick={close} className="absolute right-4 top-4">
          <MdClose size={24} />
        </button>
        <div className="w-full py-10 px-10">
          <p className="px-3 py-3 cursor-pointer hover:text-gray-500">
            View Profile
          </p>
          <p className="px-3 py-3 cursor-pointer hover:text-gray-500">
            Settings
          </p>
          <p
            className="px-3 py-3 cursor-pointer hover:text-gray-500"
            onClick={handleLogout}
          >
            Logout
          </p>
        </div>
      </div>
    </div>
  );
};

export default ProfileModel;
