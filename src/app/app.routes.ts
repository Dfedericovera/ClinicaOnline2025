import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './guards/auth.guard';
import { AdminGuard } from './guards/admin.guard';
import { BienvenidoComponent } from './pages/bienvenido/bienvenido.component';
import { LoginComponent } from './pages/login/login.component';
import { RegistroComponent } from './pages/registro/registro.component';

export const routes: Routes = [
    { path: '', redirectTo: 'bienvenido', pathMatch: 'full' },
    { path: 'bienvenido', component: BienvenidoComponent },
    { path: 'login', component: LoginComponent },
    { path: 'registro', component: RegistroComponent },

    { path: '**', redirectTo: 'bienvenido', pathMatch: 'full' }

];
