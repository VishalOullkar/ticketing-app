import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, NgForm } from '@angular/forms';
import { UserService } from '../shared/user.service';
import { Users } from '../../Models/users';
import { ToastrService } from 'ngx-toastr';
import { getDate } from 'ngx-bootstrap/chronos/utils/date-getters';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {


  constructor(private fb: FormBuilder, private userService: UserService, private toastrService: ToastrService) { }

  get f() {
   return this.userGroup.controls
  }

  isEditable: boolean = false;
  ngOnInit() {
    //var randomstring = require("randomstring");

    //let psw = randomstring.generate();

    //this.userGroup.value.Password = psw;


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
    this.isEditable = true;
  }


  editUser(user: Users)
  {
    this.isEditable = true;
    this.userGroup.patchValue(user);
  }

  userGroup = this.fb.group({


      Userid: null,
      Username: [''],
      EmailId:[''],
    Password: [''],
      Createdby: [''],
      CreatedDate: null,
      ModifiedBy:[''],
      ModifiedDate:null,
    });

  onSubmit()
  {
    let userid = localStorage.getItem('username');
    if (this.userGroup.value.Userid == null || this.userGroup.value.Userid == "") {

      this.userGroup.value.Createdby = userid;
      this.userGroup.value.CreatedDate = new Date(Date.parse(Date()));
     
      this.userService.postUser(this.userGroup.value)
        .subscribe(
        data =>
        {
          this.userGroup.reset();
          this.userService.getusersList().subscribe(data => this.userService.userList = data);
          this.toastrService.success('Submitted successfully','User');
        }
        )
    }
    else
    {
      this.userGroup.value.ModifiedBy = userid;
      this.userGroup.value.ModifiedDate = new Date(Date.parse(Date()));
      this.userService.putUser(this.userGroup.value.Userid,this.userGroup.value)
        .subscribe(
        data => {
          this.userGroup.reset();
          this.userService.getusersList().subscribe(data => this.userService.userList = data);
          this.toastrService.warning('Updated successfully','User');
          }
        )
    }
    }
  }

