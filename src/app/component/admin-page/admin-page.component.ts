import { Component } from '@angular/core';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss'] // Beachte den Plural 'styleUrls' anstelle von 'styleUrl'
})
export class AdminPageComponent {

  w3_close() {
    // @ts-ignore
    document.getElementById("mySidebar").style.display = "none";
    // @ts-ignore
    document.getElementById("myOverlay").style.display = "none";
  }

  w3_open() {
    // @ts-ignore
    document.getElementById("mySidebar").style.display = "block";
    // @ts-ignore
    document.getElementById("myOverlay").style.display = "block";
  }
}
