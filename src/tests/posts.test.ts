import request from 'supertest';
import { App } from '../app';
import { PostRoute } from '../routes/posts.route';

afterAll(async () => {
  await new Promise<void>(resolve => setTimeout(() => resolve(), 500));
});

describe('Testing Users', () => {
  describe('[GET] /posts', () => {
    it('response findAll posts', async () => {
      const postsRoute = new PostRoute();
      const posts = postsRoute.postController.postService;

      posts.findAllPosts = jest.fn().mockReturnValue([
        {
          id: 1,
          title: 'Title One',
          description: 'Description One',
          content: 'Content One',
        },
        {
          id: 2,
          title: 'Title Two',
          description: 'Description Two',
          content: 'Content Two',
        },
      ]);

      const app = new App([postsRoute]);
      return request(app.getServer()).get(`${postsRoute.path}`).expect(200);
    });
  });
});
