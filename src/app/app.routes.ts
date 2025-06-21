import { Routes } from '@angular/router';
import { HomeComponent } from './componentes/home/home.component';
import { QuienSoyComponent } from './componentes/quien-soy/quien-soy.component';
import { LoginComponent } from './componentes/login/login.component';
import { AhorcadoComponent } from './componentes/ahorcado/ahorcado.component';
import { MayorOMenorComponent } from './componentes/mayor-omenor/mayor-omenor.component';
import { PreguntadosComponent } from './componentes/preguntados/preguntados.component';
import { CaraOSecaComponent } from './componentes/cara-oseca/cara-oseca.component';
import { RegistroComponent } from './componentes/registro/registro.component';
import { AuthGuard } from './guards/auth.guard';
import { SalaDeChatComponent } from './componentes/sala-de-chat/sala-de-chat.component';
import { ListadoResultadosComponent } from './componentes/listado-resultados/listado-resultados.component';
import { EncuestaComponent } from './componentes/encuesta/encuesta.component';
import { ListadoEncuestaComponent } from './componentes/listado-encuesta/listado-encuesta.component';
import { AdminGuard } from './guards/admin.guard';

export const routes: Routes = [
    { path: '', 
        loadChildren: () => import('./componentes/home/home.module').then(mod => mod.HomeModule),
        canActivate: [AuthGuard] 
     },
    { path: 'QuienSoy', component: QuienSoyComponent },
    { path: 'Registro', component: RegistroComponent },
    { path: 'Login', component: LoginComponent },      
    { 
        path: 'Home', 
        loadChildren: () => import('./componentes/home/home.module').then(mod => mod.HomeModule),
        canActivate: [AuthGuard] 
    },  
    { path: 'Ahorcado', component: AhorcadoComponent },      
    { path: 'MayorOMenor', component: MayorOMenorComponent },      
    { path: 'Preguntados', component: PreguntadosComponent },      
    { path: 'Caraoseca', component: CaraOSecaComponent },      
    { path: 'ListadoResultados', component: ListadoResultadosComponent },      
    { path: 'Chat', component: SalaDeChatComponent, canActivate: [AuthGuard] }, 
    { path: 'Encuesta', component: EncuestaComponent, canActivate: [AuthGuard] }, 
    { path: 'ListadoEncuestas', component: ListadoEncuestaComponent, canActivate: [AdminGuard] }, 
    
    { path: '**', redirectTo: 'Home', pathMatch: 'full' } 

];
