import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormBuilder } from '@angular/forms';
import { MatSelectChange } from '@angular/material/select';
import { MissionService } from 'src/app/mission/services/mission.service';
import { InvoiceLine } from '../model/InvoiceLine';
import { Product } from '../model/product';
import { unit } from '../model/unit';

@Component({
  selector: 'app-invoice-line-detail',
  templateUrl: './invoice-line-detail.component.html',
  styleUrls: ['./invoice-line-detail.component.scss']
})
export class InvoiceLineDetailComponent implements OnInit {


  @Input() invoiceLine!: InvoiceLine;

  products: Product[] = [];

  units: unit[] = Object.values(unit);

  constructor(private missionServices: MissionService, private formBuilder: UntypedFormBuilder) {

  }

  ngOnInit(): void {
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
}
