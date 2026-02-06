import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthorizeService } from 'src/api-authorization/authorize.service';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss']
})
export class AppHeaderComponent implements OnInit {

  @Output() menuToggled = new EventEmitter<boolean>();

  user$!: Observable<string | null | undefined>;

  constructor(private authorizeService: AuthorizeService, private router: Router) { }

  ngOnInit(): void {
    this.user$ = this.authorizeService.getUser().pipe(map(u => u && u.name));
  }

  logout(): void {
    this.router.navigate(['/authentication/logout']);
  }

}
