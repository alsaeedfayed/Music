import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Layout } from './layout/layout';
import { Loader } from './components/loader/loader';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Layout, Loader],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'Music';
}
