import { NgModule } from '@angular/core';
import { RouteReuseStrategy, RouterModule, Routes } from '@angular/router';
import { ActiveGroupMember } from 'src/apiAndObjects/gaurds/auth.guard';
import { AppRouteReuseStrategy } from './app-route-reuse-strategy';

const appRoutes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('../pages/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'browse',
    loadChildren: () => import('../pages/browse/browse.module').then((m) => m.BrowseModule),
    canActivate: [ActiveGroupMember],
  },
  {
    path: 'groups',
    loadChildren: () => import('../pages/groups/groups.module').then((m) => m.GroupsModule),
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
    path: 'internal-server-error',
    loadComponent: () =>
      import('../pages/internal-server-error/internal-server-error.component').then(
        (m) => m.InternalServerErrorComponent,
      ),
  },
  {
    path: 'last-page-redirect',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: '**',
    loadComponent: () => import('../pages/not-found/not-found.component').then((m) => m.NotFoundComponent),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule],
  providers: [{ provide: RouteReuseStrategy, useClass: AppRouteReuseStrategy }],
})
export class AppRoutingModule {}
