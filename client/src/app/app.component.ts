import {
  Component,
  ElementRef,
  HostListener,
  inject,
  viewChild,
  ViewChild,
} from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { FooterComponent } from './pages/footer/footer.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { every } from 'rxjs';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, NavbarComponent,NzIconModule, FooterComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'client';
  ngOnInit() {}
  @ViewChild('cursor') cursor: ElementRef | undefined;
  @ViewChild('blur') blur: ElementRef | undefined;

  // ngAfterViewInit() {}

  @HostListener('document:mousemove', ['$event'])
  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (this.blur && this.cursor) {
      this.cursor.nativeElement.style.left = event.x + 50 + 'px';
      this.cursor.nativeElement.style.top = event.y + 50 + 'px';
      this.blur.nativeElement.style.left = event.x + 50 + 'px';
      this.blur.nativeElement.style.top = event.y + 50 + 'px';
    }
  }
}
