import express from "express";
import fs from "fs";
import path from "path";
import multer from "multer";
import { protectedRoute } from "../middleware/auth.middleware.js";
import {
  acceptFriendRequest,
  getDeveloper,
  getFriendRequests,
  getMyFriends,
  getOutgoingFriendReqs,
  getRecommendedUsers,
  getSearchedUsers,
  sendFriendRequest,
  uploadProfilePic,
} from "../controllers/user.controller.js";

const router = express.Router();

const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => cb(null, uploadDir),
    filename: (req, file, cb) => {
      const safeName = `${Date.now()}-${file.originalname.replace(/\s+/g, "-")}`;
      cb(null, safeName);
    },
  }),
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only image files are allowed."), false);
    }
    cb(null, true);
  },
});

router.use(protectedRoute);

router.get("/", getRecommendedUsers);
router.get("/friends", getMyFriends);

router.post("/friend-request/:id", sendFriendRequest);
router.put("/friend-request/:id/accept", acceptFriendRequest);

router.get("/friend-requests", getFriendRequests);
router.get("/outgoing-friend-requests", getOutgoingFriendReqs);

router.get("/search-friends", getSearchedUsers);

router.post("/upload-profile-pic", upload.single("image"), uploadProfilePic);
router.get("/get-developer", getDeveloper);

export default router;
