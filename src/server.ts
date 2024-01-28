import { App } from './app';
import { Routes } from './interfaces/routes.interface';
import { AuthRoute } from './routes/auth.route';
import { AuthorRoute } from './routes/author.route';
import { CategoryRoute } from './routes/categories.route';
import { CommentRoute } from './routes/comments.route';
import { PostRoute } from './routes/posts.route';
import { UserRoute } from './routes/users.route';
import { ValidateEnv } from './utils/validateEnv';

ValidateEnv();

const routes: Routes[] = [
  new AuthRoute(),
  new AuthorRoute(),
  new CategoryRoute(),
  new CommentRoute(),
  new PostRoute(),
  new UserRoute(),
  //
];

const app = new App(routes);

app.listen();
