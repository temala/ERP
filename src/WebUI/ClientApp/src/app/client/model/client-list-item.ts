import { ISearchable } from "src/app/common/ISearchable";


export class ClientListItem implements ISearchable {

        private _id: string;
        private _name: string;
        private _openInvoicesGrossTotal: number;
        private _paidInvoicesGrossTotal: number;

        /**
         *
         */
        constructor(id: string, name: string, openInvoicesGrossTotal: number, PaidInvoicesGrossTotal: number) {
                this._id = id;
                this._name = name;
                this._openInvoicesGrossTotal = openInvoicesGrossTotal;
                this._paidInvoicesGrossTotal = PaidInvoicesGrossTotal;

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

        public get openInvoicesGrossTotal(): number {
                return this._openInvoicesGrossTotal;
        }
        public set openInvoicesGrossTotal(v: number) {
                this._openInvoicesGrossTotal = v;
        }


        public get paidInvoicesGrossTotal(): number {
                return this._paidInvoicesGrossTotal;
        }
        public set paidInvoicesGrossTotal(v: number) {
                this._paidInvoicesGrossTotal = v;
        }
}
