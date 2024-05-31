import { NgModule, inject } from '@angular/core';
import { Router, RouterModule, Routes } from '@angular/router';
// import { authGuard } from 'src/guards/auth.guard';

const appRoutes: Routes = [
  // {
  //   path: '',
  //   redirectTo: 'login',
  //   pathMatch: 'full',
  // },
  {
    path: 'home',
    loadChildren: () => import('../pages/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'browse',
    loadChildren: () => import('../pages/browse/browse.module').then((m) => m.BrowseModule),
    // canActivate: [async () => await authGuard()],
  },
  {
    path: 'import',
    loadChildren: () => import('../pages/import/import.module').then((m) => m.ImportModule),
    // canActivate: [async () => await authGuard()],
  },
  {
    path: 'login',
    loadChildren: () => import('../pages/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'error',
    loadChildren: () => import('../pages/error/error.module').then((m) => m.ErrorModule),
  },
  {
    path: 'last-page-redirect',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '**',
    loadChildren: () => import('../pages/not-found/not-found.module').then((m) => m.NotFoundModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
  providers: [],
})
export class AppRoutingModule {}
