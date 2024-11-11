import { Component, Inject, PLATFORM_ID } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { RouterOutlet } from '@angular/router';
import { EmployeeModel } from './model/employee';
import { isPlatformBrowser } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, ReactiveFormsModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'angular_crud';

  employeeForm: FormGroup = new FormGroup({});
  emoloyeeObj: EmployeeModel = new EmployeeModel();
  employeeList: EmployeeModel[] = [];

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    this.createForm();

    // Check if running in the browser to access localStorage
    if (isPlatformBrowser(this.platformId)) {
      const oldData = localStorage.getItem("EmpData");
      if (oldData != null) {
        const parseData = JSON.parse(oldData);
        this.employeeList = parseData;
      }
    }
  }

  createForm() {
    this.employeeForm = new FormGroup({
      empId: new FormControl(this.emoloyeeObj.empId),
      name: new FormControl(this.emoloyeeObj.name),
      city: new FormControl(this.emoloyeeObj.city),
      state: new FormControl(this.emoloyeeObj.state),
      emailId: new FormControl(this.emoloyeeObj.emailId),
      contactNo: new FormControl(this.emoloyeeObj.contactNo),
      address: new FormControl(this.emoloyeeObj.address),
      pinCode: new FormControl(this.emoloyeeObj.pinCode)
    });
  }

  onSave() {
    // Check if localStorage is available
    if (isPlatformBrowser(this.platformId) && typeof localStorage !== 'undefined') {
      const oldData = localStorage.getItem("EmpData");
      
      if (oldData != null) {
        const parseData = JSON.parse(oldData);
        this.employeeForm.controls['empId'].setValue(parseData.length + 1);
        this.employeeList.unshift(this.employeeForm.value);
      } else {
        // this.employeeForm.controls['empId'].setValue(1);  // Set empId to 1 for the first entry
        this.employeeList.unshift(this.employeeForm.value);
      }

      // Save the updated employee list to localStorage
      localStorage.setItem("EmpData", JSON.stringify(this.employeeList));
      this.emoloyeeObj =new EmployeeModel();
      this.createForm();
    } else {
      console.error("Local storage is not available.");
    }
  }
  onEdit(item: EmployeeModel){
    this.emoloyeeObj = item;
    this.createForm();
  }
  onUpdate(){
    const record = this.employeeList.find(m=>m.empId == this.employeeForm.controls['empId'].value);
    if(record != undefined){
      record.address = this.employeeForm.controls['address'].value;
      record.name = this.employeeForm.controls['name'].value;
      record.city = this.employeeForm.controls['city'].value;
      record.state = this.employeeForm.controls['state'].value;
      record.contactNo = this.employeeForm.controls['contactNo'].value;
      record.emailId = this.employeeForm.controls['emailId'].value;
      record.pinCode = this.employeeForm.controls['pinCode'].value;
    }
    localStorage.setItem("EmpData", JSON.stringify(this.employeeList));
    this.emoloyeeObj =new EmployeeModel();
    this.createForm();
  }
  onDelete(id: number){
    const isDelete = confirm("Are you sure want to delete");
    if(isDelete){
      const index = this.employeeList.findIndex(m=>m.empId == id);
      this.employeeList.splice(index,1);
      localStorage.setItem("EmpData", JSON.stringify(this.employeeList));
    }
  }
}

