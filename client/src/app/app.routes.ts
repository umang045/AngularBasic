import { Routes } from '@angular/router';
import { LoginComponent } from './pages/login/login.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { RegisterComponent } from './pages/register/register.component';
import { ProductsComponent } from './pages/products/products.component';
import { SingleprodComponent } from './pages/singleprod/singleprod.component';
import { CartComponent } from './pages/cart/cart.component';
import { AccountComponent } from './pages/account/account.component';
import { CheckoutComponent } from './pages/checkout/checkout.component';
import { ResetpassComponent } from './pages/resetpass/resetpass.component';
import { AdminDashBoardComponent } from './pages/adminDashBoard/admin-dash-board/admin-dash-board.component';
import { SellerDashBoardComponent } from './pages/sellerDashBoard/seller-dash-board/seller-dash-board.component';
import { authGuardGuard } from './core/guards/auth-guard.guard';
import { AdminAddProdComponent } from './pages/adminAddProd/admin-add-prod/admin-add-prod.component';
import { AddSellerProdComponent } from './pages/addSellerProd/add-seller-prod/add-seller-prod.component';
import { SellerProdListComponent } from './pages/sellerProdList/seller-prod-list/seller-prod-list.component';
import { MyorderComponent } from './pages/myorder/myorder/myorder.component';
import { ProdTransComponent } from './pages/prodTrans/prod-trans/prod-trans.component';
import { SellerorderlistComponent } from './pages/sellerorderlist/sellerorderlist/sellerorderlist.component';
import { SellerSingleOrderComponent } from './pages/sellerSingleOrder/seller-single-order/seller-single-order.component';
import { SellerHomeComponent } from './pages/sellerHome/seller-home/seller-home.component';
import { ReviewListComponent } from './pages/reviewList/review-list/review-list.component';
import { AdminHomeComponent } from './pages/adminHome/admin-home/admin-home.component';
import { UserListComponent } from './pages/userList/user-list/user-list.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'home',
    component: HomepageComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: 'product',
    component: ProductsComponent,
  },
  {
    path: 'product/:id',
    component: SingleprodComponent,
  },
  {
    path: 'cart',
    component: CartComponent,
    canActivate: [authGuardGuard],
  },
  {
    path: 'account',
    component: AccountComponent,
    canActivate: [authGuardGuard],
  },
  {
    path: 'checkout',
    component: CheckoutComponent,
    canActivate: [authGuardGuard],
  },
  {
    path: 'reset/:token',
    component: ResetpassComponent,
  },
  {
    path: 'order/:id',
    component: MyorderComponent,
    canActivate: [authGuardGuard],
  },
  {
    path: 'seller',
    component: SellerDashBoardComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'sellerDash',
        component: SellerDashBoardComponent,
        canActivate: [authGuardGuard],
      },
      {
        path: 'home',
        component: SellerHomeComponent,
        canActivate: [authGuardGuard],
      },
      {
        path: 'addProd',
        component: AddSellerProdComponent,
        canActivate: [authGuardGuard],
      },
      {
        path: 'addProd/:id',
        component: AddSellerProdComponent,
        canActivate: [authGuardGuard],
      },
      {
        path: 'prodList',
        component: SellerProdListComponent,
        canActivate: [authGuardGuard],
      },
      {
        path: 'orderList',
        component: SellerorderlistComponent,
        canActivate: [authGuardGuard],
      },
      {
        path: 'orderList/:order_id',
        component: SellerSingleOrderComponent,
        canActivate: [authGuardGuard],
      },
      {
        path: 'prodList/:id',
        component: ProdTransComponent,
        canActivate: [authGuardGuard],
      },
      {
        path: 'review/:id',
        component: ReviewListComponent,
        canActivate: [authGuardGuard],
      },
    ],
  },
  {
    path: 'superadmin',
    component: AdminDashBoardComponent,
    children: [
      {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full',
      },
      {
        path: 'home',
        component: AdminHomeComponent,
        canActivate: [authGuardGuard],
      },
      {
        path: 'userList',
        component: UserListComponent,
        canActivate: [authGuardGuard],
      },
      {
        path: 'adminDash',
        component: AdminDashBoardComponent,
        canActivate: [authGuardGuard],
      },
      {
        path: 'addProd',
        component: AdminAddProdComponent,
        canActivate: [authGuardGuard],
      },
    ],
  },
  {
    path: 'adminDash',
    component: AdminDashBoardComponent,
    canActivate: [authGuardGuard],
  },
  {
    path: '**',
    component: HomepageComponent,
  },
];
