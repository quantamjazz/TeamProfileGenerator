const Employee = require('./Employee');

class Intern extends Employee {

  constructor(name, id, email, school) {

    super(name, id, email);

    this.school = school;
  }

  getSchool() {
    return this.school;
  }

  // Override the getRole() method from the parent class
  getRole() {
    return 'Intern';
  }
}

// Export the Intern class
module.exports = Intern;

