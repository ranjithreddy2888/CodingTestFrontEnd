import {Component, OnInit} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {Location} from '@angular/common';
import {FormControl, FormGroup} from '@angular/forms';
import {BackendService, FeatureRequest, ResponseData} from '../backend/backend.service';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-feature-request-form',
  templateUrl: './feature-request-form.component.html',
  styleUrls: ['./feature-request-form.component.css'],
  animations: [
    trigger('slideInOut', [
      state('in', style({
        transform: 'translate3d(100%, 0, 0)'
      })),
      state('out', style({
        transform: 'translate3d(0, 0, 0)'
      })),
      transition('in => out', animate('400ms ease-in-out')),
      transition('out => in', animate('400ms ease-in-out'))
    ]),
  ]
})
export class FeatureRequestFormComponent implements OnInit {
  public formAnimState: 'in' | 'out' = 'in';
  public productAreaDDL: Array<{ id: string, label: string }> = [];
  public clientDDL: Array<{ id: number, label: string }> = [];
  public minDate: string;
  public formGroup = this.getFormGroup();

  constructor(public location: Location, private backend: BackendService, private activatedRoute: ActivatedRoute) {
    const date = new Date();
    this.minDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    const featureRequestMap = this.backend.featureRequests.getValue();
    this.activatedRoute.params.subscribe(data => {
      if (data.featureId) {
        if (featureRequestMap[data.featureId]) {
          this.formGroup = this.getFormGroup(featureRequestMap[data.featureId]);
        } else {
          this.formAnimState = 'in';
          this.location.back();
        }
      }
    });
    this.backend.metaData.subscribe(metaData => {
      this.clientDDL = [];
      metaData.clients.forEach(client => {
        this.clientDDL.push({id: client.id, label: client.name});
      });
      metaData.productAreas.forEach(productArea => {
        this.productAreaDDL.push({id: productArea, label: productArea});
      });
    });
  }

  ngOnInit(): void {
    setTimeout(() => this.formAnimState = 'out');
  }

  closeForm(): void {
    this.formAnimState = 'in';
    setTimeout(() => {
      this.location.back();
    }, 700);
  }

  getFormGroup(data?: FeatureRequest): FormGroup {
    return new FormGroup({
      id: new FormControl(data ? data.id : null),
      clientId: new FormControl(data ? data.clientId : null),
      clientPriority: new FormControl(data ? data.clientPriority : null),
      description: new FormControl(data ? data.description : null),
      title: new FormControl(data ? data.title : null),
      productArea: new FormControl(data ? data.productArea : null),
      targetDate: new FormControl(data ? data.targetDate : null),
    });
  }

  async saveFeatureRequest(): Promise<void> {
    const result: ResponseData<FeatureRequest> = await this.backend.saveFeatureRequest(this.formGroup.getRawValue());
    if (result.error) {
      alert(result.error);
    } else {
      this.closeForm();
    }
  }
}
