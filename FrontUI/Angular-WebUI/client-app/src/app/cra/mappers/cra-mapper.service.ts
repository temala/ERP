import { craDay } from './../model/cra';
import {Injectable} from "@angular/core";
import {Cra} from "../model/cra";
import {CraListItem} from "../model/cra-list-item";


@Injectable({
  providedIn: 'root'
})
export class CraMapper {

  MapCra(response: any): Cra {
    let result: Cra = {
      id: response.id,
      days: response.days.map(d => {
        const day: craDay = {id:d.id, day:d.day,month: d.month,year:d.year,isHalfDay: d.isHalfDay,getValue: craDay.prototype.getValue };
        return day;
      } ),
      month: response.month,
      year: response.year,
      mission:response.mission,
      missionId:response.missionId,    
    };

    if(response.days==null)
    {
      result.days=[];
    }

    return result;
  }

  MapCraListItem(serviceResponsItem: any): CraListItem {
    var craItem =  new CraListItem(serviceResponsItem.id, serviceResponsItem.period);
    craItem.mission=serviceResponsItem.mission;
    craItem.days=serviceResponsItem.days.map(d => {
      const day: craDay = {id:d.id, day:d.day,month: d.month,year:d.year,isHalfDay: d.isHalfDay,getValue: craDay.prototype.getValue };
      return day;
    } );

    return craItem;
  }

  MapCraNextId(response: any): number {
    return response.nextCraId;
  }

  Map(serviceRespons: any): CraListItem[] {

    let result: CraListItem[] = [];
    serviceRespons.items.forEach((serviceResponsItem: any) => {
      var craItem = new CraListItem(serviceResponsItem.id, serviceResponsItem.period) ;
      craItem.mission=serviceResponsItem.mission;
      craItem.days=serviceResponsItem.days;
      result.push(craItem);
    });


    return result;
  }
}
