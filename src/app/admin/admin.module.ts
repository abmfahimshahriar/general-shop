import { AdminAuthGuardService } from './services/admin-auth-guard.service';
import { CoreModule } from './../core/core.module';
import { RouterModule } from '@angular/router';
import { SharedModule } from './../shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminProductsComponent } from './components/admin-products/admin-products.component';
import { AdminAuthGuardService as AdminAuthGuard } from './services/admin-auth-guard.service';
import { AuthGuardService as AuthGuard } from '../core/services/auth-guard.service';

@NgModule({
  declarations: [AdminProductsComponent],
  imports: [
    CommonModule,
    SharedModule,
    CoreModule,
    RouterModule.forChild([
      {
        path: 'admin/products',
        component: AdminProductsComponent,
        canActivate: [AuthGuard,AdminAuthGuard]
      }
    ])
  ],
  providers: [
    AdminAuthGuardService
  ]
})
export class AdminModule { }
