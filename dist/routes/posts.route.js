"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostRoute = void 0;
const express_1 = require("express");
const posts_controller_1 = require("../controllers/posts.controller");
const validation_middleware_1 = require("../middlewares/validation.middleware");
const posts_dto_1 = require("../dtos/posts.dto");
class PostRoute {
    constructor() {
        this.path = "/posts";
        this.router = (0, express_1.Router)();
        this.post = new posts_controller_1.PostController();
        this.initializeRoutes();
    }
    initializeRoutes() {
        this.router.get(`${this.path}`, this.post.getAll);
        this.router.post(`${this.path}`, (0, validation_middleware_1.ValidationMiddleware)(posts_dto_1.CreatePostDto), this.post.create);
        this.router.get(`${this.path}/:id`, this.post.getById);
        this.router.put(`${this.path}/:id`, (0, validation_middleware_1.ValidationMiddleware)(posts_dto_1.UpdatePostDto, true), this.post.update);
        this.router.delete(`${this.path}/:id`, this.post.delete);
    }
}
exports.PostRoute = PostRoute;
//# sourceMappingURL=posts.route.js.map