import {Injectable} from "@angular/core";
import {Mission} from "../model/mission";
import {MissionListItem} from "../model/mission-list-item";


@Injectable()
export class MissionMapper {

  MapMission(response: any): Mission {
    let result =new  Mission(response.id,response.name);
    
    result.priceHT= response.priceHT;
    result.tva= response.tva;
    result.client=response.client;
    
    return result;
  }

  MapMissionListItem(serviceResponsItem: any): MissionListItem {
    return new MissionListItem(serviceResponsItem.id, serviceResponsItem.name, serviceResponsItem.priceHT, serviceResponsItem.tva,serviceResponsItem.client)
  }

  MapMissionNextId(response: any): number {
    return response.nextMissionId;
  }

  Map(serviceRespons: any): MissionListItem[] {

    let result: MissionListItem[] = [];
    serviceRespons.items.forEach((serviceResponsItem: any) => {
      result.push(new MissionListItem(serviceResponsItem.id, serviceResponsItem.name, serviceResponsItem.priceHT, serviceResponsItem.tva,serviceResponsItem.client));
    });


    return result;
  }
}
