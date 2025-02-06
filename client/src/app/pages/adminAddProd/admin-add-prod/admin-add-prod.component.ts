import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgxImageZoomModule } from 'ngx-image-zoom';
@Component({
  selector: 'app-admin-add-prod',
  imports: [CommonModule, NgxImageZoomModule],
  templateUrl: './admin-add-prod.component.html',
  styleUrl: './admin-add-prod.component.css',
})
export class AdminAddProdComponent {
  myThumbnail="https://wittlock.github.io/ngx-image-zoom/assets/thumb.jpg";
  myFullresImage="https://wittlock.github.io/ngx-image-zoom/assets/fullres.jpg";
}
