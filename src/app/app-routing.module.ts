import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const appRoutes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('../pages/home/home.module').then((m) => m.HomeModule),
    // canMatch: [() => inject(AaaiService).isAuthenticated()],
  },
  {
    path: 'browse',
    loadChildren: () => import('../pages/browse/browse.module').then((m) => m.BrowseModule),
    // canMatch: [() => inject(AaaiService).checkForAuth()],
  },
  {
    path: 'import',
    loadChildren: () => import('../pages/import/import.module').then((m) => m.ImportModule),
    // canMatch: [() => inject(AaaiService).checkForAuth()],
  },
  {
    path: 'login',
    loadChildren: () => import('../pages/login/login.module').then((m) => m.LoginModule),
  },
  // {
  //   path: 'last-page-redirect',
  //   redirectTo: 'home',
  //   pathMatch: 'full',
  // },
  {
    path: '**',
    redirectTo: 'home',
    pathMatch: 'full',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}
