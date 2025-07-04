import { Sequelize } from "sequelize";
const sequelize = new Sequelize('employees','root','0410',{
    host:'localhost',
    dialect : 'mysql'
});
export default sequelize;