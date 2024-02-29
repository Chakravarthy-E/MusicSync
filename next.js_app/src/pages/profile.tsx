import React from "react";
import { getAuthState } from "@/lib/slices/authSlice";
import { useSelector, useDispatch } from "react-redux";

interface Props {}

const Profile = (props: Props) => {
  const { profile } = useSelector(getAuthState);
  return <div>profile</div>;
};

export default Profile;
