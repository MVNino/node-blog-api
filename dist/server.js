"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const app_1 = require("./app");
const posts_route_1 = require("./routes/posts.route");
const validateEnv_1 = require("./utils/validateEnv");
(0, validateEnv_1.ValidateEnv)();
const app = new app_1.App([new posts_route_1.PostRoute()]);
app.listen();
//# sourceMappingURL=server.js.map