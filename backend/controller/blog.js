import { Blogs, validateBlog } from "../models/blogSchema.js";

class BlogsController {
  async get(req, res) {
    try {
      const blogs = await Blogs.find()
        .populate([{ path: "userId", select: ["fname", "username"] }])
        .sort({ createdAt: -1 });
      if (!blogs.length) {
        return res.status(400).json({
          msg: "Blog is not defined",
          variant: "error",
          payload: null,
        });
      }
      res.status(200).json({
        msg: "All Blogs",
        variant: "success",
        payload: blogs,
      });
    } catch {
      res.status(500).json({
        msg: "Server error",
        variant: "error",
        payload: null,
      });
    }
  }
  async create(req, res) {
    try {
      const { error } = validateBlog(req.body);
      if (error) {
        return res.status(400).json({
          msg: error.details[0].message,
          variant: "warning",
          payload: null,
        });
      }
      const blog = await Blogs.create({ ...req.body, userId: req.user._id });
      res.status(201).json({
        msg: "Blog is created",
        variant: "success",
        payload: blog,
      });
    } catch {
      res.status(500).json({
        msg: "Server error",
        variant: "error",
        payload: null,
      });
    }
  }
  async delete(req, res) {
    try {
      const { id } = req.params;
      await Blogs.findByIdAndDelete(id);
      res.status(200).json({
        msg: "blog is deleted",
        variant: "success",
        payload: null,
      });
    } catch {
      res.status(500).json({
        msg: "server error",
        variant: "error",
        payload: null,
      });
    }
  }
  async updateBlog(req, res) {
    try {
      const { id } = req.params;
      let blog = await Blogs.findByIdAndUpdate(id, req.body, { new: true });
      res.status(200).json({
        msg: "user updated",
        variant: "success",
        payload: blog,
      });
    } catch (err) {
      res.status(500).json({
        msg: err.message,
        variant: "error",
        payload: null,
      });
    }
  }
}

export default new BlogsController();
