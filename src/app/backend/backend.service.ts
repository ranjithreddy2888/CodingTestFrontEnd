import {Injectable} from '@angular/core';
import {BehaviorSubject} from 'rxjs';

export interface ResponseData<T> {
  message: string;
  error: string;
  data: T;
}

interface MetaData {
  clients: Array<{ id: number, name: string }>;
  productAreas: Array<string>;
}

export interface FeatureRequest {
  id: number;
  clientId: number;
  title: string;
  description: string;
  clientPriority: number;
  targetDate: string;
  productArea: string;
}

@Injectable({
  providedIn: 'root'
})
export class BackendService {
  public metaData: BehaviorSubject<MetaData> = new BehaviorSubject<MetaData>({
    clients: [],
    productAreas: []
  });
  public featureRequests: BehaviorSubject<{ [key: string]: FeatureRequest }>
    = new BehaviorSubject<{ [key: string]: FeatureRequest }>({});

  public clientId = '';

  constructor() {
    this.fetchMetaData().catch(console.error);
  }

  async fetchMetaData(): Promise<void> {
    const result: ResponseData<MetaData> = await fetch('http://localhost:8080/getMetaData', {
      method: 'GET'
    }).then(resp => resp.json());
    if (result.data) {
      this.metaData.next(result.data);
    }
  }

  async fetchFeatureRequestByClient(clientId: string): Promise<void> {
    this.clientId = clientId;
    const result: ResponseData<Array<FeatureRequest>> = await fetch(`http://localhost:8080/getFeatureRequest/${clientId}`, {
      method: 'GET'
    }).then(resp => resp.json());
    if (result.data) {
      const map: { [key: string]: FeatureRequest } = {};
      result.data.forEach(r => {
        map[r.id] = r;
      });
      this.featureRequests.next(map);
    }
  }

  async saveFeatureRequest(featureRequest: FeatureRequest): Promise<ResponseData<FeatureRequest>> {
    return await fetch(`http://localhost:8080/saveFeatureRequest`, {
      method: 'POST',
      body: JSON.stringify(featureRequest),
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(resp => resp.json());
  }
}
