import { Injectable } from '@angular/core';
import { ApiService } from 'src/apiAndObjects/api/api.service';
import { DataProductDataSource } from 'src/apiAndObjects/objects/dataProductDataSource';

@Injectable({
  providedIn: 'root',
})
export class DataProductsService {
  constructor(private apiService: ApiService) {}

  public getDataProducts(): Promise<DataProductDataSource[]> {
    return this.apiService.endpoints.dataProduct.getDataProducts.call();
  }
}
