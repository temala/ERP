import { Product } from "./product";
import { unit } from "./unit";


export class InvoiceLine {
        id!:number;
        product!: Product;
        date!: Date;
        quantity: number = 0;
        unit: unit = unit.day;


        public get priceHT(): number {
                if (this.product) {
                        return this.product.priceHT * this.quantity;
                }
                return 0;
        }

        public set priceHT(v: number) {
                if (this.quantity > 0 && this.product) {
                        let unitPrice = v / this.quantity;
                        this.product.priceHT = unitPrice;
                }
        }


        public get TTC(): number {
                if (this.product) {
                        return ((this.priceHT * this.product.tva) / 100)+this.priceHT;
                }
                return 0;
        }

        public get tva(): number {
                if (this.product) {
                        return this.product.tva;
                }
                return 0;
        }

        public set tva(v: number) {
                if (this.product) {
                        this.product.tva = v;
                }
        }
}
