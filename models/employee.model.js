const sequelize = require("../db");
const { DataTypes } = require("sequelize");

const Employee = sequelize.define("employee", {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
    autoIncrement: true,
  },
  username: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false
  },
  photoLink: {type: DataTypes.STRING, allowNull:true, unique: true},
  firstName: { type: DataTypes.STRING, allowNull: false },
  lastName: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  age: { type: DataTypes.INTEGER, allowNull: false },
  position: { type: DataTypes.STRING, allowNull: false },
  phoneNumber: { type: DataTypes.STRING, allowNull: false, unique: true },
  startOfCooperation: { type: DataTypes.DATEONLY, allowNull: false },
  finishOfCooperation: { type: DataTypes.DATEONLY, allowNull: true },
  createdAt: {type: DataTypes.DATE, autoIncrementIdentity: true, allowNull:true},
  updatedAt: {type: DataTypes.DATE, autoIncrementIdentity: true, allowNull:true},
});

const DailyReport = sequelize.define("daily_report", {
  reportId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
    autoIncrement: true,
  },
  startWork: { type: DataTypes.DATE, allowNull: false },
  finishWork: { type: DataTypes.DATE, allowNull: true },
  createdAt: {type: DataTypes.DATE, autoIncrementIdentity: true, allowNull:true},
  updatedAt: {type: DataTypes.DATE, autoIncrementIdentity: true, allowNull:true},
});

const BuildingArea = sequelize.define("building_area", {
  buildingAreaId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    unique: true,
    autoIncrement: true,
  },
  title: { type: DataTypes.STRING, allowNull: false },
  startBuilding: { type: DataTypes.STRING, allowNull: false },
  finishBuilding: { type: DataTypes.STRING, allowNull: true },
  adressCountry: { type: DataTypes.STRING, allowNull: false},
  adressCity: { type: DataTypes.STRING, allowNull: false },
  adressStreet: { type: DataTypes.STRING, allowNull: false },
  adressHouse: { type: DataTypes.STRING, allowNull: false },
  createdAt: {type: DataTypes.DATE, autoIncrementIdentity: true, allowNull:true},
  updatedAt: {type: DataTypes.DATE, autoIncrementIdentity: true, allowNull:true},
});

const Customer = sequelize.define("customer", {
  customerId: {
    type: DataTypes.INTEGER,
    allowNull: true,
    primaryKey: true,
    unique: true,
    autoIncrement: true
  },
  firstName: { type: DataTypes.STRING, allowNull: false },
  lastName: { type: DataTypes.STRING, allowNull: false },
  companyName: { type: DataTypes.STRING, allowNull: true },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  phoneNumber: { type: DataTypes.STRING, allowNull: false, unique: true },
  createdAt: {type: DataTypes.DATE, autoIncrementIdentity: true, allowNull:true},
  updatedAt: {type: DataTypes.DATE, autoIncrementIdentity: true, allowNull:true},
});

const Admin = sequelize.define("admin", {
  adminId: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    unique: true,
    autoIncrement: true,
  },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  phoneNumber: { type: DataTypes.STRING, allowNull: false, unique: true },
  createdAt: {type: DataTypes.DATE, autoIncrementIdentity: true, allowNull:true},
  updatedAt: {type: DataTypes.DATE, autoIncrementIdentity: true, allowNull:true},
});

/// Associations



Employee.hasMany(DailyReport, {
  as: "dailyReports",
});
DailyReport.belongsTo(Employee, {
  foreignKey: "employeeId",
  as: "employee",
});

BuildingArea.hasMany(DailyReport, {
  as: "buildingAreas",
});

DailyReport.belongsTo(BuildingArea, {
  foreignKey: "buildingAreaId",
  as: "buldingArea",
});

Customer.hasMany(BuildingArea, {
  as: "buildingAreas",
});

BuildingArea.belongsTo(Customer, {
  foreignKey: "customerId",
  as: "customer",
});

module.exports = { Employee, Customer, BuildingArea, Admin, DailyReport };
