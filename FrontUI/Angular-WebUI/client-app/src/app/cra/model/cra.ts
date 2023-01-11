import { Mission } from 'src/app/mission/model/mission';
import { ISearchable } from './../../common/ISearchable';

export class Cra implements ISearchable {

        constructor(id: number, month: string) {
                this.id = id;
                this.month = month;
        }

        id: number;
        month: string;        
        days: Date[] =[];           
        mission!:Mission;
}