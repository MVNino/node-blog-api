"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostController = void 0;
const typedi_1 = require("typedi");
const posts_service_1 = require("../services/posts.service");
class PostController {
    constructor() {
        this.postService = typedi_1.Container.get(posts_service_1.PostService);
        this.getAll = async (req, res, next) => {
            try {
                const foundPosts = await this.postService.findAllPosts();
                res.status(200).json({ data: foundPosts, message: "findAll" });
            }
            catch (error) {
                next(error);
            }
        };
        this.getById = async (req, res, next) => {
            try {
                const postId = Number(req.params.id);
                const foundPost = await this.postService.findByPostId(postId);
                res.status(200).json({ data: foundPost, message: "findOne" });
            }
            catch (error) {
                next(error);
            }
        };
        this.create = async (req, res, next) => {
            try {
                const postData = req.body;
                const createdPost = await this.postService.createPost(postData);
                res.status(201).json({ data: createdPost, message: "created" });
            }
            catch (error) {
                next(error);
            }
        };
        this.update = async (req, res, next) => {
            try {
                const postId = Number(req.params.id);
                const postData = req.body;
                const updatedPost = await this.postService.updatePost(postId, postData);
                res.status(200).json({ data: updatedPost, message: "updated" });
            }
            catch (error) {
                next(error);
            }
        };
        this.delete = async (req, res, next) => {
            try {
                const postId = Number(req.params.id);
                const deletedPost = await this.postService.deletePost(postId);
                res.status(200).json({ data: deletedPost, message: "deleted" });
            }
            catch (error) {
                next(error);
            }
        };
    }
}
exports.PostController = PostController;
//# sourceMappingURL=posts.controller.js.map