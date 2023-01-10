import {Injectable} from "@angular/core";
import {Mission} from "../model/mission";
import {MissionListItem} from "../model/mission-list-item";


@Injectable()
export class MissionMapper {

  MapMission(response: any): Mission {
    let result: Mission = {
      id: response.id,
      name: response.name,
      priceHT: response.priceHT,
      tva: response.tva,    
    };

    return result;
  }

  MapMissionListItem(serviceResponsItem: any): MissionListItem {
    return new MissionListItem(serviceResponsItem.id, serviceResponsItem.name, serviceResponsItem.openInvoicesGrossTotal, serviceResponsItem.paidInvoicesGrossTotal)
  }

  MapMissionNextId(response: any): number {
    return response.nextMissionId;
  }

  Map(serviceRespons: any): MissionListItem[] {

    let result: MissionListItem[] = [];
    serviceRespons.items.forEach((serviceResponsItem: any) => {
      result.push(new MissionListItem(serviceResponsItem.id, serviceResponsItem.name, serviceResponsItem.openInvoicesGrossTotal, serviceResponsItem.paidInvoicesGrossTotal));
    });


    return result;
  }
}
