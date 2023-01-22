import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { CraMapper } from 'src/app/cra/mappers/cra-mapper.service';
import { Cra } from 'src/app/cra/model/cra';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CraService {

  constructor(private http: HttpClient, private mapper: CraMapper) { }
  
  find(keyword: string) {
    return this.http.get(`${environment.fakeApiURL}/find-craList?keyword=${keyword}`).pipe(map(response => this.mapper.Map(response)));
  }

  getlist() {
    return this.http.get(`${environment.apiURL}/craList?PageNumber=1&PageSize=10`).pipe(map(response => this.mapper.Map(response)));
  }

  getCra(id: number) {
    return this.http.get(`${environment.apiURL}/craList/GetCraDetails?id=${id}`).pipe(map(response => this.mapper.MapCra(response)));
  }

  Update(cra:Cra){
    return this.http.put(`${environment.apiURL}/craList?id=${cra.id}`,cra).pipe(map(response => this.mapper.MapCra(response)));
  }

  Add(cra:Cra){
    return this.http.post(`${environment.apiURL}/craList`,cra).pipe(map(response => this.mapper.MapCraListItem(response)));
  }

  Delete(id:number){
    return this.http.delete(`${environment.apiURL}/craList/${id}`);
  }

  Print(id:number){
    const httpOptions = {
      responseType: 'blob' as 'json'
    };
    return this.http.get(`${environment.apiURL}/craList/Print?id=${id}`,httpOptions);
  }
}
