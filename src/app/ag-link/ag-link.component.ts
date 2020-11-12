import {Component, NgZone} from '@angular/core';
import {AgRendererComponent} from 'ag-grid-angular';
import {Router} from '@angular/router';

@Component({
  selector: 'app-ag-link',
  templateUrl: './ag-link.component.html',
  styleUrls: ['./ag-link.component.css']
})
export class AgLinkComponent implements AgRendererComponent {
  params: any;

  constructor(private ngZone: NgZone, private router: Router) {
  }

  agInit(params: any): void {
    this.params = params;
  }

  refresh(params: any): boolean {
    return false;
  }

  // This was needed to make the link work correctly
  navigate(link: any): void {
    this.ngZone.run(() => {
      this.router.navigate([link, this.params.value]).catch(console.error);
    });
  }

}
