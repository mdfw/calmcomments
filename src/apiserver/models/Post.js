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
      accountID: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: true,
      paranoid: true,
    },
    {
      classMethods: {
        associate: function associateModels(models) {
          Post.belongsTo(models.Account, { foreignKey: 'accountId' });
        },
      },
    },
  );
  return Post;
};
