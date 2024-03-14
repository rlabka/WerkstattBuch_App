import {Component, OnInit, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  standalone: false,
})
export class AppComponent implements OnInit{
  title = 'ServicesMayono';

  ngOnInit(): void {
  }
}
