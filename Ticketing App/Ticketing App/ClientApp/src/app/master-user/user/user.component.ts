import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, NgForm } from '@angular/forms';
import { UserService } from '../shared/user.service';
import { Users } from '../../Models/users';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private fb: FormBuilder, private userService: UserService, private toastrService: ToastrService) { }

  ngOnInit() {

    this.userService.getusersList()
      .subscribe(data => this.userService.userList = data);
  }

  deleteUser(ID: number)
  {
    if (confirm('Are you sure') == true)
    {
      this.userService.deleteuser(ID)
        .subscribe(
          data =>
            this.userService.getusersList()
            .subscribe(data => this.userService.userList = data)
      
      );
      this.toastrService.warning('Deleted successfully');
    }
  }

  addUser()
  {
    this.userGroup.reset();
  }


  editUser(user: Users)
  {
    this.userGroup.patchValue(user);
  }

  userGroup = this.fb.group({
      Userid: null,
      Username: [''],
      EmailId:[''],
      Password:[''],
      Createdby: [''],
      CreatedDate: null,
      ModifiedBy:[''],
      ModifiedDate:null,
    });

  onSubmit()
  {
    if (this.userGroup.value.Userid == null || this.userGroup.value.Userid == "") {

      this.userService.postUser(this.userGroup.value)
        .subscribe(
        data =>
        {
          this.userGroup.reset();
          this.userService.getusersList().subscribe(data => this.userService.userList = data);
          this.toastrService.success('Submitted successfully');
        }
        )
    }
    else
    {
      this.userService.putUser(this.userGroup.value.Userid,this.userGroup.value)
        .subscribe(
        data => {
          this.userGroup.reset();
          this.userService.getusersList().subscribe(data => this.userService.userList = data);
          this.toastrService.warning('Updated successfully');
          }
        )
    }
    }
  }

