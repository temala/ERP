import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import { environment } from 'src/environments/environment';
import { MissionMapper } from '../mappers/mission-mapper.service';
import { Mission } from '../model/mission';

@Injectable({
  providedIn: 'root'
})
export class MissionService {

  constructor(private http: HttpClient, private mapper: MissionMapper) { }
  
  find(keyword: string) {
    return this.http.get(`${environment.fakeApiURL}/find-missions?keyword=${keyword}`).pipe(map(response => this.mapper.Map(response)));
  }

  getlist() {
    return this.http.get(`${environment.apiURL}/missions?PageNumber=1&PageSize=10`).pipe(map(response => this.mapper.Map(response)));
  }

  getMission(id: string) {
    return this.http.get(`${environment.apiURL}/missions/GetMissionDetails?id=${id}`).pipe(map(response => this.mapper.MapMission(response)));
  }

  Update(mission:Mission){
    return this.http.put(`${environment.apiURL}/missions?id=${mission.id}`,mission).pipe(map(response => this.mapper.MapMission(response)));
  }

  Add(mission:Mission){
    return this.http.post(`${environment.apiURL}/missions`,mission).pipe(map(response => this.mapper.MapMissionListItem(response)));
  }

  Delete(id:string){
    return this.http.delete(`${environment.apiURL}/missions/${id}`);
  }
}
