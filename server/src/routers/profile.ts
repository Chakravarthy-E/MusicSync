import { getPublicPlaylist, getPublicProfile, getPublicUploades, getUploades, updateFollower } from "#/controllers/profile";
import { mustAuth } from "#/middleware/auth";
import { Router } from "express";

const router = Router();

router.post("/update-follower/:profileId", mustAuth, updateFollower);
router.get("/uploads", mustAuth, getUploades);
router.get("/uploads/:profileId", getPublicUploades);
router.get("/info/:profileId", getPublicProfile);
router.get("/playlist/:profileId", getPublicPlaylist);

export default router;
