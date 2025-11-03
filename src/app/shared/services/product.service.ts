import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import {
  ProductsResponse,
  ApiProductsResponse,
  PaginationParams,
  ProductFilters,
} from '../types/product.types';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private readonly http = inject(HttpClient);
  private readonly apiUrl = '/api';

  getProducts(
    paginationParams?: PaginationParams,
    filters?: ProductFilters
  ): Observable<ProductsResponse> {
    let params = new HttpParams();

    if (paginationParams) {
      // Using _page and _per_page for pagination
      params = params.set('_page', paginationParams.page.toString());
      params = params.set('_per_page', paginationParams.pageSize.toString());
    }

    if (filters?.name) {
      // Using name_like parameter for partial name matching (json-server convention)
      params = params.set('name', filters.name);
    }

    return this.http
      .get<ApiProductsResponse>(`${this.apiUrl}/products`, {
        params,
      })
      .pipe(
        map(response => {
          return {
            products: response.data || [],
            total: response.items || 0,
            page: paginationParams?.page || 1,
            pageSize: paginationParams?.pageSize || response.data?.length || 0,
          };
        })
      );
  }
}
