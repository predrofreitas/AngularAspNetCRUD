import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/shared/employee.service';
import { NgForm } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  constructor(public service: EmployeeService,
    private toastr : ToastrService) { }

  ngOnInit(): void {
    this.resetForm();
  }
  resetForm(form? : NgForm){
    if(form!=null)
      form.resetForm();
    this.service.formData = {
      EmployeeID : null,
      FullName : '',
      Position : '',
      EMPCode : '',
      Mobile : ''
    }
  }

  onSubmit(form : NgForm){
    if(form.value.EmployeeID == null)
      this.inserRecord(form);
    else
      this.updateRecord(form);
  }

  inserRecord(form: NgForm){
    this.service.postEmployee(form.value).subscribe(res => {
      this.toastr.success('Inserted Successfully', 'EMP. Register');
      this.service.refreshList();
      this.resetForm(form);
      });
  }

  updateRecord(form: NgForm){
    this.service.putEmployee(form.value).subscribe(res => {
      this.toastr.info('Updated Successfully', 'EMP. Register');
      this.service.refreshList();
    });
  }
}
