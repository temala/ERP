import { ISearchable } from "src/app/common/ISearchable";

export class Product implements ISearchable {
        id!: string;
        name!: string;                              
        priceHT: number =0;           
        TTC: number =0;           
        tva: number = 0;
}