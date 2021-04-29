import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AnfiteatroComponent } from './components/anfiteatro/anfiteatro.component';
import { BienvenidoComponent } from './components/bienvenido/bienvenido.component';
import { DirectorioComponent } from './components/directorio/directorio.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { PabellonComponent } from './components/pabellon/pabellon.component';
import { RecepcionComponent } from './components/recepcion/recepcion.component';
import { RegistroComponent } from './components/usuario/registro/registro.component';
import { RuedaNegociosComponent } from './components/rueda-negocios/rueda-negocios.component';
import { StandComponent } from './components/stand/stand.component';
import { ContactenosComponent } from './components/contactenos/contactenos.component';
import { QuienesSomosComponent } from './components/quienes-somos/quienes-somos.component';
import { RecuperarPasswordComponent } from './components/usuario/recuperar-password/recuperar-password.component';
import { EventoActualesFuturosComponent } from './components/evento-actuales-futuros/evento-actuales-futuros.component';
import { CambioPasswordComponent } from './components/usuario/cambio-password/cambio-password.component';
import { ConfirmarComponent } from './components/confirmar/confirmar.component';

const routes: Routes = [
  { path: 'recepcion', component: RecepcionComponent, data: { page: 'recepcion' }  },
  { path: 'inicio', component: InicioComponent, data: { page: 'inicio' }  },
  { path: 'bienvenido', component: BienvenidoComponent, data: { page: 'bienvenido' }  },
  { path: 'pabellones/:idFeria', component: PabellonComponent, data: { page: 'pabellon' }  },
  { path: 'pabellones/pabellon/:idPabellon/:idFeria', component: PabellonComponent, data: { page: 'pabellon' }  },
  { path: 'stand/:idStand/:idParticipante/:idPabellon/:idFeria', component: StandComponent, data: { page: 'stand' }  },
  { path: 'anfiteatro', component: AnfiteatroComponent, data: { page: 'anfiteatro' }  },
  { path: 'directorio', component: DirectorioComponent, data: { page: 'directorio' }  },
  { path: 'registro', component: RegistroComponent, data: { page: 'registro' }  },
  { path: 'rueda-negocios', component: RuedaNegociosComponent, data: { page: 'rueda-negocios' }  },
  { path: 'contactenos', component: ContactenosComponent, data: { page: 'contactenos' }  },
  { path: 'quienes-somos', component: QuienesSomosComponent, data: { page: 'quienes-somos' }  },
  { path: 'recuperarPassword', component: RecuperarPasswordComponent, data: { page: 'recuperarPassword' }  },
  { path: 'cambioPassword', component: CambioPasswordComponent, data: { page: 'cambioPassword' }  },
  { path: 'eventosActuales', component: EventoActualesFuturosComponent, data: { page: 'eventosActuales' }  },
  { path: 'confirmar/:token_confirm', component: ConfirmarComponent, data: { page: 'confirmar' }  },
  { path: '**', pathMatch: 'full', redirectTo: 'bienvenido' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule]
})
export class AppRoutingModule { }
