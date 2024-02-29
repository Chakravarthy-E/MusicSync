import React from "react";
import { getAuthState } from "@/lib/slices/authSlice";
import {
  BadgeCheck,
  CircleUser,
  Heart,
  ListMusic,
  Mail,
  UserCheck,
  UserRoundCheck,
} from "lucide-react";
import { useSelector } from "react-redux";
import AddSong from "@/components/atoms/AddSong/AddSong";
import Logout from "@/components/atoms/Logout/Logout";
import ProfileInfo from "@/components/atoms/ProfileInfo/ProfileInfo";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogTrigger, DialogContent } from "@/components/ui/dialog";

interface Props {}

const Profile = (props: Props) => {
  const { profile } = useSelector(getAuthState);
  console.log(profile);

  return (
    <div className="space-y-3 px-5 py-5">
      <div className="flex items-center justify-between">
        <h1 className="my-2 text-3xl font-semibold tracking-normal">
          My Profile
        </h1>
        <Dialog>
          <DialogTrigger>
            <Button>Add New Song</Button>
          </DialogTrigger>
          <DialogContent>
            <AddSong />
          </DialogContent>
        </Dialog>
      </div>
      <Card>
        <CardHeader>
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold leading-none tracking-tight">
              Account
            </h1>
            <Button>Update Profile</Button>
          </div>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2">
          <ProfileInfo
            label="Name"
            icon={<CircleUser size={35} className="text-blue-500" />}
            value={profile?.name}
          />
          <ProfileInfo
            label="Email"
            icon={<Mail size={35} className="text-red-500" />}
            value={profile?.email}
          />
          <ProfileInfo
            label="Followers"
            icon={<UserCheck size={35} className="text-indigo-500" />}
            value={profile?.followers}
          />
          <ProfileInfo
            label="Following"
            icon={<UserRoundCheck size={35} className="text-indigo-500" />}
            value={profile?.followings}
          />
          <ProfileInfo
            label="Account Verification"
            icon={<BadgeCheck size={35} className="text-blue-400" />}
            value={profile?.verified === "true" ? "Verified" : "Not Verified"}
          />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Activity</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-2">
          <ProfileInfo
            label="Favorites"
            icon={<Heart size={35} className="text-pink-500" />}
          />
          <ProfileInfo
            label="Playlists"
            icon={<ListMusic size={35} className="text-gray-700" />}
          />
        </CardContent>
      </Card>

      <div className="flex justify-end py-3">
        <Logout />
      </div>
    </div>
  );
};

export default Profile;
