import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { ContractTypeModel } from '../models/ContractType.model';

@Injectable({
  providedIn: 'root'
})
export class ContractTypeService {

  url = `${environment.baseUrl}/api/ContractType`;

  constructor(private http: HttpClient) { }
    getAllContractTypes() {
      
      let url = `${this.url}`;
       return this.http.get<ContractTypeModel[]>(url);
    }


    getAllContractTypeById(ContractTypeId: number) {
      let url = `${this.url}/${ContractTypeId}`;
      return this.http.get<ContractTypeModel>(url);
    }
  
  
    addContractType(contractType: ContractTypeModel) {
      let url = `${this.url}`;
      return this.http.post<ContractTypeModel>(url, contractType);
    }
  
  
    updateContractType(contractTypeId: number, contractType: ContractTypeModel) {
      let url = `${this.url}/${contractTypeId}`;
      return this.http.put<ContractTypeModel>(url, contractType);
    }

    
  

    deleteContractType(contractTypeId: number) {
      let url = `${this.url}/${contractTypeId}`;
      return this.http.delete<any>(url);
    }
  
}

