import sequelize from "../HMDB.js";
import { DataTypes } from 'sequelize';

const patient = sequelize.define('Patient',{
    id : {
        type : DataTypes.INTEGER,
        autoIncrement : true,
        primaryKey : true
    },
    name : {
        type : DataTypes.STRING,
        allowNull : false
    },
    age : {
        type : DataTypes.STRING,
        allowNull : false
    },
    gender : {
        type : DataTypes.STRING,
        allowNull : false
    },
    addmitDate : {
        type : DataTypes.DATEONLY,
        allowNull :false
    } 
},{
    timestamps : false
})
export default patient;