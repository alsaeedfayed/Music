import { CommonModule } from '@angular/common';
import { Component, signal, WritableSignal } from '@angular/core';
import { RouterModule } from '@angular/router';
import { Header } from './components/header/header';
import { Footer } from './components/footer/footer';
import { Sidebar } from './components/sidebar/sidebar';

@Component({
  selector: 'app-layout',
  imports: [RouterModule, CommonModule, Header, Footer, Sidebar],
  templateUrl: './layout.html',
  styleUrl: './layout.scss',
})
export class Layout {
  isSideBarOpen: WritableSignal<boolean> = signal(false);

  toggleSideBar = () => {
    this.isSideBarOpen.update((open) => !open);
  };
  closeSideBar = () => {
    this.isSideBarOpen.set(false);
  };
}
