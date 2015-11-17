module.exports = function( seq, DataTypes ) {
    return seq.define( 'Exercises', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true
        },
        title: DataTypes.STRING(255)
    }, {
        timestamps: false,
        tableName: 'exercises'
    } )
};