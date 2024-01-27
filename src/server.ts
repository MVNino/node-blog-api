import { App } from './app';
import { PostRoute } from './routes/posts.route';
import { ValidateEnv } from './utils/validateEnv';

ValidateEnv();

const app = new App([new PostRoute()]);

app.listen();
