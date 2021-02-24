import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForbiddenComponent } from '@auth/components/forbidden/forbidden.component';

const routes: Routes = [
    { path: 'forbidden', data: { breadcrumb: null }, component: ForbiddenComponent },
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class AuthRoutingModule { }
