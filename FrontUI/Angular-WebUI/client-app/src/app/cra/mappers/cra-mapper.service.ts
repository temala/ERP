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
      days: response.days,
      month: response.month,
      mission:response.mission,    
    };

    return result;
  }

  MapCraListItem(serviceResponsItem: any): CraListItem {
    return new CraListItem(serviceResponsItem.id, serviceResponsItem.month)
  }

  MapCraNextId(response: any): number {
    return response.nextCraId;
  }

  Map(serviceRespons: any): CraListItem[] {

    let result: CraListItem[] = [];
    serviceRespons.items.forEach((serviceResponsItem: any) => {
      result.push(new CraListItem(serviceResponsItem.id, serviceResponsItem.month));
    });


    return result;
  }
}
