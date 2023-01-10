import { ISearchable } from "src/app/common/ISearchable";


export class MissionListItem implements ISearchable {

        private _id: string;
        private _name: string;
        private _HT: number;
        private _TVA: number;

        /**
         *
         */
        constructor(id: string, name: string, priceHT: number, TVA: number) {
                this._id = id;
                this._name = name;
                this._HT =priceHT;
                this._TVA =TVA;
        }

        public get id(): string {
                return this._id;
        }
        public set id(v: string) {
                this._id = v;
        }

        public get name(): string {
                return this._name;
        }
        public set name(v: string) {
                this._name = v;
        }

        public get HT(): number {
                return this._HT;
        }
        public set HT(v: number) {
                this._HT = v;
        }

        public get TVA(): number {
                return this._TVA;
        }
        public set TVA(v: number) {
                this._TVA = v;
        }

        public get TTC(): number {
                return (this._TVA*this._HT)/100 + this._HT;
        }
}
