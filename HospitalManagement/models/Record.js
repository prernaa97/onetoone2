import { DataTypes } from "sequelize";
import sequelize from "../HMDB.js";
const record = sequelize.define('Record',{
    id : {
        type : DataTypes.INTEGER,
        autoIncrement : true,
        primaryKey : true
    },
    bloodGroup : {
        type : DataTypes.STRING,
        allowNull : false
    },
    allergies : {
        type : DataTypes.STRING
    },
    diagnosis : {
        type : DataTypes.STRING
    },
    prescription :{
        type : DataTypes.STRING
    }
},{
    timestamps : false
})

export default record;