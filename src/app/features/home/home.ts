import { Component, inject } from '@angular/core';
import { Explore } from './services/explore';
import { Cover } from '@app/components/cover/cover';

@Component({
  selector: 'app-home',
  imports: [Cover],
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
