import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { AccountModel } from '../models/account.model';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  url = `${environment.baseUrl}/api/Account`;

  constructor(private http: HttpClient) { }


  getAllAccounts(){
    let url = `${this.url}`;
    return this.http.get<AccountModel[]>(url);


  }

  getAllAccountById(accountId: number) {
    let url = `${this.url}/${accountId}`;
    return this.http.get<AccountModel>(url);
  }

  addAccount(account: AccountModel) {
    let url = `${this.url}`;
    return this.http.post<AccountModel>(url, account);
  }

  updateAccount(accountId: number, account: AccountModel) {
    let url = `${this.url}/${accountId}`;
    return this.http.put<AccountModel>(url, account);
  }

  deleteAccount(accountId: number) {
    let url = `${this.url}/${accountId}`;
    return this.http.delete<any>(url);
  }
}
