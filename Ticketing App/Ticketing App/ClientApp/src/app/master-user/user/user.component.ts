import { Component, OnInit, Directive } from '@angular/core';
import { FormGroup, FormBuilder, NgForm, Validators } from '@angular/forms';
import { UserService } from '../shared/user.service';
import { Users } from '../../Models/users';
import { ToastrService } from 'ngx-toastr';
import { getDate } from 'ngx-bootstrap/chronos/utils/date-getters';
import { NgbModal, NgbModalConfig } from '@ng-bootstrap/ng-bootstrap';
import { makeDecorator } from '@angular/core/src/util/decorators';
import { Router, ActivatedRoute } from '@angular/router';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']

})

export class UserComponent implements OnInit {

  submitted = false;
  userhide = true;
  config: any;
  constructor(private fb: FormBuilder, private userService: UserService, private toastrService: ToastrService,
    private modalService: NgbModal, config: NgbModalConfig, private router: Router, private route: ActivatedRoute) {
    config.backdrop = 'static';
    config.keyboard = false;
    this.config = {
      currentPage: 1,
      itemsPerPage: 5
    };
    this.route.queryParamMap
      .pipe(map(p => p.get('page')))
      .subscribe(page => this.config.currentPage = page);
  }

  pageChangeMethod(newPage: number) {
    this.router.navigate(['user'], { queryParams: { page: newPage } });

  }

  get f() {
    return this.userGroup.controls
  }
  isEditable: boolean = false;
  ngOnInit() {
    this.isEditable = false;
    this.userService.getusersList()
      .subscribe(data => this.userService.userList = data);
  }

  deleteUser(ID: number) {
    if (confirm('Are you sure') == true) {
      let emailid = localStorage.getItem('email');
      this.userGroup.value.ModifiedBy = emailid;
      this.userService.deleteuser(ID, this.userGroup.value)
        .subscribe(
          data =>
            this.userService.getusersList()
              .subscribe(data => this.userService.userList = data)

        );
      this.toastrService.warning('Deleted successfully');
    }
  }

  addUser() {
    this.userGroup.reset();
    this.isEditable = true;
  }


  editUser(user: Users, content: any) {
    this.userhide = false;
    this.isEditable = true;
    this.userGroup.patchValue(user);
    this.modalService.open(content, { centered: true });
  }

  userGroup = this.fb.group({

    Userid: null,
    Username: ['', Validators.required],
    EmailId: ['', Validators.required],
    MobileNo: ['', Validators.required],
    Password: ['default1'],
    Createdby: [''],
    CreatedDate: null,
    ModifiedBy: [''],
    ModifiedDate: null,
  });

  onSubmit() {
    this.submitted = true;
    if (this.userGroup.invalid == true) {
      this.submitted = true;

    }
    else {
      this.submitted = false;
      let userid = localStorage.getItem('username');

      if (this.userGroup.value.Userid == null || this.userGroup.value.Userid == "") {

        this.userGroup.value.Createdby = userid;

        this.userGroup.value.CreatedDate = new Date(Date.parse(Date()));

        this.userService.postUser(this.userGroup.value)
          .subscribe(
            data => {
              this.userGroup.reset();
              this.userService.getusersList().subscribe(data => this.userService.userList = data);
              this.toastrService.success('Submitted successfully', 'User');
              this.ClosePopUp();
            }
          )
      }
      else {
        this.userGroup.value.ModifiedBy = userid;
        this.userGroup.value.ModifiedDate = new Date(Date.parse(Date()));
        this.userService.putUser(this.userGroup.value.Userid, this.userGroup.value)
          .subscribe(
            data => {
              this.userGroup.reset();
              this.userService.getusersList().subscribe(data => this.userService.userList = data);
              this.toastrService.warning('Updated successfully', 'User');
              this.modalService.dismissAll();
            }
          )
      }
    }
  }



  openPopUp(content) {
    this.userGroup.reset();
    this.userGroup.controls['Password'].setValue('default1');
    this.modalService.open(content, { centered: true });
  }
  ClosePopUp() {
    this.modalService.dismissAll();
    this.userGroup.reset();
    this.userGroup.controls['Password'].setValue('default1');
    this.isEditable = false;
  }


}

