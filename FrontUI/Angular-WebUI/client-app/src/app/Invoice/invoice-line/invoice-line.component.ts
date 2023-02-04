import { Product } from '../model/product';
import { unit } from "../model/unit";
import { InvoiceLine } from "../model/InvoiceLine";
import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { FormGroup, UntypedFormBuilder, UntypedFormGroup, Validators } from '@angular/forms';
import { MissionService } from 'src/app/mission/services/mission.service';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-invoice-line',
  templateUrl: './invoice-line.component.html',
  styleUrls: ['./invoice-line.component.scss']
})
export class InvoiceLineComponent implements OnInit, AfterViewInit {

  @Input() invoiceLine!: InvoiceLine;

  products: Product[] = [];

  units: unit[] = Object.values(unit);

  constructor(private missionServices: MissionService, private formBuilder: UntypedFormBuilder) {

  }

  ngOnInit(): void {
    this.invoiceLine.product = new Product();
    this.invoiceLine.quantity = 1;
    this.invoiceLine.unit = unit.day;
    this.invoiceLine.date = new Date();
  }

  ngAfterViewInit(): void {
    this.missionServices.getlist().subscribe(missions => {
      missions.forEach(mission => {
        let product = new Product();
        product.id = mission.id;
        product.name = mission.name;
        product.priceHT = mission.HT;
        product.tva = mission.TVA;
        product.TTC = mission.TTC;
        this.products.push(product);
      })
    });
  }

  productSelectionChange(event: MatSelectChange) {
    let selectedProduct = event.value as Product;

    this.invoiceLine.product = selectedProduct;
  }

  addProduct(arg0: any) {
    throw new Error('Method not implemented.');
  }
}
