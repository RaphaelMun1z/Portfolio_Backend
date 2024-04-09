const Language = (sequelize, DataTypes) => {
    return sequelize.define('Language', {
        name: DataTypes.STRING,
        proficiency: DataTypes.INTEGER,
    })
}

module.exports = Language