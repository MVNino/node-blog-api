"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostService = void 0;
const tslib_1 = require("tslib");
const typedi_1 = require("typedi");
const database_1 = require("../database");
const HttpException_1 = require("../exceptions/HttpException");
let PostService = class PostService {
    async findAllPosts() {
        const allPost = await database_1.DB.Posts.findAll();
        return allPost;
    }
    async findByPostId(postId) {
        const findPost = await database_1.DB.Posts.findByPk(postId);
        if (!findPost)
            throw new HttpException_1.HttpException(404, "Post doesn't exist");
        return findPost;
    }
    async createPost(postData) {
        const findPost = await database_1.DB.Posts.findOne({
            where: { title: postData.title },
        });
        if (findPost)
            throw new HttpException_1.HttpException(409, `This title ${postData.title} already exists`);
        const createPostData = await database_1.DB.Posts.create(postData);
        return createPostData;
    }
    async updatePost(postId, postData) {
        const findPost = await database_1.DB.Posts.findByPk(postId);
        if (!findPost)
            throw new HttpException_1.HttpException(404, "Post doesn't exist");
        const createPostData = await database_1.DB.Posts.create(postData);
        return createPostData;
    }
    async deletePost(postId) {
        const foundPost = await database_1.DB.Posts.findByPk(postId);
        if (!foundPost)
            throw new HttpException_1.HttpException(404, "Post doesn't exist");
        await database_1.DB.Posts.destroy({ where: { id: postId } });
        return foundPost;
    }
};
exports.PostService = PostService;
exports.PostService = PostService = tslib_1.__decorate([
    (0, typedi_1.Service)()
], PostService);
//# sourceMappingURL=posts.service.js.map