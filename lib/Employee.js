class Employee {
    constructor(name, id, email) {
      this.name = name;
      this.id = id;
      this.email = email;
    }
  
    // Getter method for name
    getName() {
      return this.name;
    }
  
    // Getter method for id
    getId() {
      return this.id;
    }
  
    // Getter method for email
    getEmail() {
      return this.email;
    }
  
    // Getter method for role, returns 'Employee'
    getRole() {
      return 'Employee';
    }
  }
  
  // Export the Employee class
  module.exports = Employee 