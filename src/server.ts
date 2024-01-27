import { App } from './app';
import { AuthorRoute } from './routes/author.route';
import { CategoryRoute } from './routes/categories.route';
import { PostRoute } from './routes/posts.route';
import { ValidateEnv } from './utils/validateEnv';

ValidateEnv();

const app = new App([new AuthorRoute(), new CategoryRoute(), new PostRoute()]);

app.listen();
