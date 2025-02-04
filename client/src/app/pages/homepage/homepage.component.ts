import { Component, inject } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { AuthservService } from '../../core/services/auth/authserv.service';
import { Router } from '@angular/router';
import { NavbarComponent } from '../navbar/navbar.component';

@Component({
  selector: 'app-homepage',
  imports: [],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css',
})
export class HomepageComponent {
  ngOnInit() {
    const localData: any = localStorage.getItem('userDetail');
    const jsonData = JSON.parse(localData);
    const role = jsonData?.role;
  }
}
