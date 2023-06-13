import { DataSource } from '@angular/cdk/collections';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { map } from 'rxjs/operators';
import { Observable, of as observableOf, merge } from 'rxjs';

// TODO: Replace this with your own data model type
export interface Repository {
  full_name: string;
  id: number;
  stargazers_count: number
}

// TODO: replace this with real data from your application
const string = '[1,[{"full_name":"freeCodeCamp/freeCodeCamp","id":28457823,"stargazers_count":368560},{"full_name":"EbookFoundation/free-programming-books","id":13491895,"stargazers_count":283328},{"full_name":"996icu/996.ICU","id":177736533,"stargazers_count":266050},{"full_name":"jwasham/coding-interview-university","id":60493101,"stargazers_count":259487},{"full_name":"sindresorhus/awesome","id":21737465,"stargazers_count":257640},{"full_name":"public-apis/public-apis","id":54346799,"stargazers_count":243421},{"full_name":"kamranahmedse/developer-roadmap","id":85077558,"stargazers_count":241766},{"full_name":"donnemartin/system-design-primer","id":83222441,"stargazers_count":222069},{"full_name":"facebook/react","id":10270250,"stargazers_count":208900},{"full_name":"codecrafters-io/build-your-own-x","id":132750724,"stargazers_count":204125}]]'
const EXAMPLE_DATA: Repository[] = JSON.parse(string)[1];

export class TopTableDataSource extends DataSource<Repository> {
  data: Repository[] = EXAMPLE_DATA;
  sort: MatSort | undefined;

  constructor() {
    super();
  }

  /**
   * Connect this data source to the table. The table will only update when
   * the returned stream emits new items.
   * @returns A stream of the items to be rendered.
   */
  connect(): Observable<Repository[]> {
    if (this.sort) {
      // Combine everything that affects the rendered data into one update
      // stream for the data-table to consume.
      return merge(observableOf(this.data), this.sort.sortChange)
        .pipe(map(() => {
          return this.getSortedData([...this.data ]);
        }));
    } else {
      throw Error('Please set the paginator and sort on the data source before connecting.');
    }
  }

  /**
   *  Called when the table is being destroyed. Use this function, to clean up
   * any open connections or free any held resources that were set up during connect.
   */
  disconnect(): void {}

  /**
   * Paginate the data (client-side). If you're using server-side pagination,
   * this would be replaced by requesting the appropriate data from the server.
   */

  /**
   * Sort the data (client-side). If you're using server-side sorting,
   * this would be replaced by requesting the appropriate data from the server.
   */
  private getSortedData(data: Repository[]): Repository[] {
    if (!this.sort || !this.sort.active || this.sort.direction === '') {
      return data;
    }

    return data.sort((a, b) => {
      const isAsc = this.sort?.direction === 'asc';
      switch (this.sort?.active) {
        case 'full_name': return compare(a.full_name, b.full_name, isAsc);
        case 'id': return compare(+a.id, +b.id, isAsc);
        case 'stargazers_count': return compare(+a.stargazers_count, +b.stargazers_count, isAsc);
        default: return 0;
      }
    });
  }
}

/** Simple sort comparator for example ID/Name columns (for client-side sorting). */
function compare(a: string | number, b: string | number, isAsc: boolean): number {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}
