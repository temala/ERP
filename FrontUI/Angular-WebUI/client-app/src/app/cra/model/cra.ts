import { Mission } from 'src/app/mission/model/mission';
import { ISearchable } from './../../common/ISearchable';

export class Cra implements ISearchable {

        constructor(id: number, year: number, month: number) {
                this.id = id;
                this.year = year;
                this.month = month;
        }

        id: number;
        year: number;
        month: number;
        days: craDay[] = [];
        missionId!: number;
}

export class craDay extends Date {
        public isHalfDay: boolean = false;
}

export class craPeriod {
        month: number = 0;
        year: number = 0;
}