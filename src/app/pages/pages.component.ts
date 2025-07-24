import { CommonModule } from '@angular/common';
import { Component, ElementRef, inject, OnInit, Renderer2, ViewChild } from '@angular/core';
import { Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MenuDto, UserDto } from '../shared/interface/global.model';
import { DummyMenus, DummyUsers } from '../shared/types/constant';
import { LoadingComponent } from '../shared/components/loading/loading.component';
import { AuthService } from '../shared/service/auth.service';

@Component({
  selector: 'app-pages',
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    LoadingComponent
  ],
  templateUrl: './pages.component.html',
  styleUrl: './pages.component.scss'
})
export class PagesComponent implements OnInit {

  router = inject(Router);
  renderer = inject(Renderer2);
  authService = inject(AuthService);

  @ViewChild('menuCheckbox') menuCheckbox!: ElementRef;

  menus: MenuDto[] = [];
  user!: UserDto;
  isLoading: boolean = false;
  isSidebarOpen: boolean = false;
  toggle: boolean = false;
  avatar: string | ArrayBuffer | File | null = 'assets/images/user.png';

  // __________________________________________ onLoad function
  ngOnInit(): void {
    this.authService.user$.subscribe(user => this.user = user);
    this.menus = DummyMenus;
  }

  // __________________________________________ onClick function
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  toggleMenu() {
    this.toggle = !this.toggle;
    if (this.toggle) {
      this.onClickRemoveShowClass();
    }
  }

  onClickRemoveShowClass() {
    const elements = document.querySelectorAll('.show');
    elements.forEach((element) => {
      this.renderer.removeClass(element, 'show');
    });
  }

  toggleSubMenu() {
    if (this.toggle) {
      this.toggleMenu();
      this.menuCheckbox.nativeElement.checked =
        !this.menuCheckbox.nativeElement.checked;
    }
  }

  handleLogout() {
    this.isLoading = true;
    setTimeout(() => {
      this.isLoading = false;
      this.authService.logout();
      this.router.navigate(['/auth/login']);
    }, 2000);
  }
}
