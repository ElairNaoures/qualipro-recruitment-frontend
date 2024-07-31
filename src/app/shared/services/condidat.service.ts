import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { HttpClient } from '@angular/common/http';
import { CondidatModel } from '../models/Condidat.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CondidatService {

  url = `${environment.baseUrl}/api/Condidat`;

  constructor(private http: HttpClient) { }
    getAllCondidats() {
      
      let url = `${this.url}`;
       return this.http.get<CondidatModel[]>(url);
    }


    // getAllCondidatById(condidatId: number) {
    //   let url = `${this.url}/${condidatId}`;
    //   return this.http.get<CondidatModel>(url);
    // }
    getCondidatById(condidatId: number): Observable<CondidatModel> {
      return this.http.get<CondidatModel>(`${this.url}/${condidatId}`);
    }

    updateCondidat(condidatId: number, condidat: CondidatModel) {
      let url = `${this.url}/${condidatId}`;
      return this.http.put<CondidatModel>(url, condidat);
    }

    deleteCondidat(condidatId: number) {
      let url = `${this.url}/${condidatId}`;
      return this.http.delete<any>(url);
    }
}
