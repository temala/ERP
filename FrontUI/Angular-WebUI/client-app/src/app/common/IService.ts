import { Observable } from "rxjs";


export interface ISearchService<ISearchable> {
  find(keyword: string): Observable<ISearchable[]>;
}
