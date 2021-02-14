import { BrowserModule, } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { RouterModule   } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { CanvasComponent } from './components/canvas/canvas.component';
import { RecepcionComponent } from './components/recepcion/recepcion.component';
import { LoginComponent } from './components/login/login.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { PabellonComponent } from './components/pabellon/pabellon.component';
import { StandComponent } from './components/stand/stand.component';
import { AnfiteatroComponent } from './components/anfiteatro/anfiteatro.component';
import { RuedaNegociosComponent } from './components/rueda-negocios/rueda-negocios.component';
import { ButtonComponent } from './components/controles/button/button.component';
import { ImagenButtonComponent } from './components/controles/imagen-button/imagen-button.component';
import { DirectorioComponent } from './components/directorio/directorio.component';
import { RegistroComponent } from './components/registro/registro.component';
import { EventosComponent } from './components/eventos/eventos.component';
import { AudioComponent } from './components/controles/audio/audio.component';
import { BienvenidoComponent } from './components/bienvenido/bienvenido.component';
import { PaginacionComponent } from './components/controles/paginacion/paginacion.component';
import { AppConfig } from './services/app-config.service';
import { BusquedaComponent } from './components/controles/busqueda/busqueda.component';
import { RecursosComponent } from './components/recursos/recursos.component';
import { SanitizeHtmlPipe } from './pipes/sanitize-html.pipe';
import { ContactenosComponent } from './components/contactenos/contactenos.component';
import { QuienesSomosComponent } from './components/quienes-somos/quienes-somos.component';
const appInitializerFn = (appConfig: AppConfig) => {
  return () => {
    return appConfig.loadAppConfig();
  };
};

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    CanvasComponent,
    RecepcionComponent,
    LoginComponent,
    InicioComponent,
    PabellonComponent,
    StandComponent,
    AnfiteatroComponent,
    RuedaNegociosComponent,
    ButtonComponent,
    ImagenButtonComponent,
    DirectorioComponent,
    RegistroComponent,
    EventosComponent,
    AudioComponent,
    BienvenidoComponent,
    PaginacionComponent,
    BusquedaComponent,
    RecursosComponent,
    SanitizeHtmlPipe,
    ContactenosComponent,
    QuienesSomosComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule
  ],
  providers: [ AppConfig, 
  {
    provide: APP_INITIALIZER,
    useFactory: appInitializerFn,
    multi: true,
    deps: [AppConfig]
  } ],
  bootstrap: [AppComponent]
})
export class AppModule { }
