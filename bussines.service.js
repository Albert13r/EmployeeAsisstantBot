const BuildingArea = require('./models/employee.model')

function welcomeMessage(){
  return `I am your personal assistant, I will assist you in your work. You can use this commands:\n
/start_work - open your working day.
/finish_work  -  close your working day.
/building_areas - show all areas of the building and their code. `
};





module.exports = welcomeMessage