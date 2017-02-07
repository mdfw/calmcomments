/* A post is the atomic messages of the user */
module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define(
    'Post', {
      message: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      edited: {
        type: DataTypes.BOOLEAN,
      },
    },
    {
      timestamps: true,
      paranoid: true,
      classMethods: {
        associate: function associateModels(models) {
          Post.belongsTo(models.Account);
        },
      },
    },
  );
  return Post;
};
