"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PostModel = void 0;
const sequelize_1 = require("sequelize");
class PostModel extends sequelize_1.Model {
}
exports.PostModel = PostModel;
function default_1(sequelize) {
    PostModel.init({
        id: {
            autoIncrement: true,
            primaryKey: true,
            type: sequelize_1.DataTypes.INTEGER,
        },
        title: {
            allowNull: false,
            type: sequelize_1.DataTypes.STRING(45),
        },
        description: {
            allowNull: true,
            type: sequelize_1.DataTypes.STRING(255),
        },
        content: {
            allowNull: false,
            type: sequelize_1.DataTypes.STRING(255),
        },
    }, {
        tableName: "posts",
        sequelize,
    });
    return PostModel;
}
exports.default = default_1;
//# sourceMappingURL=posts.model.js.map