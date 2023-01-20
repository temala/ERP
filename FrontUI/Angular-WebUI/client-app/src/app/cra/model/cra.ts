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
        mission!: Mission;
}

export class craDay {
        public id!:number;
        public day!: number;
        public month!: number;
        public year!: number;
        public isHalfDay: boolean = false;        

        constructor(date: Date) {
                this.day = date.getDate();
                this.month = date.getMonth() + 1;
                this.year = date.getFullYear();
        }

        public getValue() {
                return `${this.day}/${this.month}/${this.year}`;
        }
}

export class craPeriod {
        month: number = 0;
        year: number = 0;
}