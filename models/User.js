module.exports = (Sequelize, DataTypes) => {
    var User = Sequelize.define('user', {
        _id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        username: {
            type: DataTypes.STRING,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        timestamps: false
    })
    User.associate = (models) => {
        User.hasMany(models.student,
            {
                foreignKey: 'user_id',
                onDelete: 'cascade',
                onUpdate: 'cascade'
            })
    }
    return User
}