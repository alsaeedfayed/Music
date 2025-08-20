import { Component, inject } from '@angular/core';
import { Explore } from './services/explore';

@Component({
  selector: 'app-home',
  imports: [],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
  //inject explore service
  private exploreService = inject(Explore);

  constructor() {
    this.loadNewReleases();
  }

  loadNewReleases() {}
}
