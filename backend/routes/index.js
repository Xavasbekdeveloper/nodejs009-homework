import express from "express";
import BlogsController from "../controller/blog.js";
import UsersController from "../controller/user.js";
import { auth } from "../middleware/auth.js";
import { adminMiddleware } from "../middleware/admin-middleware.js";
import { ownerMiddleware } from "../middleware/owner-middleware.js";
const router = express.Router();

router.get("/api/blogs", [auth, adminMiddleware], BlogsController.get);
router.post("/api/blogs", [auth, ownerMiddleware], BlogsController.create);
router.patch("/api/blogs/:id", BlogsController.updateBlog);
router.delete("/api/blogs/:id", BlogsController.delete);

router.get("/api/profile", [auth], UsersController.getProfile);

router.get("/api/users", [auth, ownerMiddleware], UsersController.getAllUsers);
router.get(
  "/api/users/search",
  [auth, ownerMiddleware],
  UsersController.getUserSearch
);
router.post("/api/users/sign-up", UsersController.registerUser);
router.post("/api/users/sign-in", UsersController.loginUser);
router.delete(
  "/api/users/:id",
  [auth, ownerMiddleware],
  UsersController.deleteUser
);
router.patch(
  "/api/users/:id",
  [auth, ownerMiddleware],
  UsersController.updateUser
);

export default router;
