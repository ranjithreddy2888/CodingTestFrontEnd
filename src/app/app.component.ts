import {Component} from '@angular/core';
import {BackendService, FeatureRequest} from './backend/backend.service';
import {AgLinkComponent} from './ag-link/ag-link.component';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  public title = 'Frontend';
  public columnDefs = [
    {headerName: 'Title', field: 'title', sortable: true, filter: true},
    {headerName: 'Description', field: 'description', sortable: true, filter: true},
    {headerName: 'Priority', field: 'clientPriority', sortable: true, filter: true},
    {headerName: 'Target Date', field: 'targetDate', sortable: true, filter: true},
    {headerName: 'Product Area', field: 'productArea', sortable: true, filter: true},
    {
      headerName: '',
      field: 'id',
      cellRendererFramework: AgLinkComponent,
      cellRendererParams: {
        inRouterLink: '/editFeatureRequest',
        label: 'Edit'
      },
      sortable: true,
      filter: true
    },
  ];
  public rowData: Array<FeatureRequest> = [];
  public clientDDL: Array<{ id: string, label: string }> = [];
  public selectedClientId = '1';

  constructor(private backend: BackendService) {
    this.backend.metaData.subscribe(metaData => {
      this.clientDDL = [];
      metaData.clients.forEach(client => {
        this.clientDDL.push({id: `${client.id}`, label: client.name});
      });
    });
    this.backend.featureRequests.subscribe(featureRequests => {
      this.rowData = Object.values(featureRequests);
    });
  }

  async getFeatureRequests(): Promise<void> {
    await this.backend.fetchFeatureRequestByClient(this.selectedClientId);
  }
}
