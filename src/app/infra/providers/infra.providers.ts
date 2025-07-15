import { Provider } from '@angular/core';

import { UserRepository } from '@domain/interfaces/user.repository';
import { ProductRepository } from '@domain/interfaces/product.repository';
import { OrderRepository } from '@domain/interfaces/order.repository';

import { UserApiService } from '@infra/http/user-api.service';
import { ProductApiService } from '@infra/http/product-api.service';
import { OrderApiService } from '@infra/http/order-api.service';

export const infraProviders = [
  Provider(UserRepository, { useClass: UserApiService }),
//   Provider(ProductRepository, { useClass: ProductApiService }),
//   Provider(OrderRepository, { useClass: OrderApiServiceP}),
];