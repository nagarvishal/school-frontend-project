import { Injectable } from '@angular/core';
import { HttpClient,HttpHeaders } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class CommonserviceService {

  constructor(private http: HttpClient) {  }
  defaultHeader(temp=undefined){
    if(temp){
      const headers:any = new HttpHeaders({
        'Authorization': 'Bearer YOUR_ACCESS_TOKEN',
        'in-auth-token': sessionStorage.getItem('in-auth-token') || ""
      });
      return headers;
    }
    else{
      const headers = new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer YOUR_ACCESS_TOKEN',
        'in-auth-token': sessionStorage.getItem('in-auth-token') || ""
      });
      return headers;
    }
}
  deleteAPICall(url:string, headers:any):Observable<any>{
    return this.http.delete<any>(url, { headers });
  }
  putAPICall(url: string, request: any, headers:any): Observable<any> {
      return this.http.put<any>(url, request, { headers });
  }
  postAPICall(url:string,data: any,headers:any): Observable<any> {/* New function We Making for calling API*/
    return this.http.post<any>(url, data, { headers });
  }
  getAPICall(url:string,headers:any):Observable<any> {/* New function We Making for calling API*/
    return this.http.get<any>(url, { headers: headers } ); 
  }
}
