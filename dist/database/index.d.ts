import Sequelize from 'sequelize';
export declare const DB: {
    Posts: typeof import("../models/posts.model").PostModel;
    sequelize: Sequelize.Sequelize;
    Sequelize: typeof Sequelize;
};
