module.exports = (Sequelize, DataTypes) => {
    var Student = Sequelize.define('student', {
        _id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        firstname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        lastname: {
            type: DataTypes.STRING,
            allowNull: false
        },
        age: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false
        },
        phone: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        timestamps: false
    })
    Student.associate = (models) => {
        Student.belongsTo(models.user,
            {
                foreignKey: 'user_id',
                onDelete: 'cascade',
                onUpdate: 'cascade'
            })
    }

    return Student
}