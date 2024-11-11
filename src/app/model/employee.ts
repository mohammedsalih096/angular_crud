export class EmployeeModel {
    empId: number;
    name: String;
    city: String;
    state: String;
    emailId: String;
    contactNo: String;
    address: String;
    pinCode: String;

    constructor() {
        this.empId = 1;
        this.name = "";
        this.city = "";
        this.state = "";
        this.emailId = "";
        this.contactNo = "";
        this.address = "";
        this.pinCode = "";
    }

}