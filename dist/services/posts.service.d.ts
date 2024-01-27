import { Post } from "../interfaces/posts.interface";
import { CreatePostDto, UpdatePostDto } from "../dtos/posts.dto";
export declare class PostService {
    findAllPosts(): Promise<Post[]>;
    findByPostId(postId: number): Promise<Post>;
    createPost(postData: CreatePostDto): Promise<Post>;
    updatePost(postId: number, postData: UpdatePostDto): Promise<Post>;
    deletePost(postId: number): Promise<Post>;
}
