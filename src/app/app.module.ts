import { BrowserModule, } from '@angular/platform-browser';
import { LOCALE_ID } from '@angular/core';
import es from '@angular/common/locales/es';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { APP_INITIALIZER, NgModule } from '@angular/core';
import { RouterModule   } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS  } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HeaderComponent } from './components/header/header.component';
import { CanvasComponent } from './components/canvas/canvas.component';
import { RecepcionComponent } from './components/recepcion/recepcion.component';
import { LoginComponent } from './components/usuario/login/login.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { PabellonComponent } from './components/pabellon/pabellon.component';
import { StandComponent } from './components/stand/stand.component';
import { AnfiteatroComponent } from './components/anfiteatro/anfiteatro.component';
import { RuedaNegociosComponent } from './components/rueda-negocios/rueda-negocios.component';
import { ButtonComponent } from './components/controles/button/button.component';
import { ImagenButtonComponent } from './components/controles/imagen-button/imagen-button.component';
import { DirectorioComponent } from './components/directorio/directorio.component';
import { RegistroComponent } from './components/usuario/registro/registro.component';
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
import { AuditoriaInterceptorService } from './services/auditoria-interceptor.service';
import { RecuperarPasswordComponent } from './components/usuario/recuperar-password/recuperar-password.component';
import { LoadingComponent } from './components/controles/loading/loading.component';
import { EventoActualesFuturosComponent } from './components/evento-actuales-futuros/evento-actuales-futuros.component';
import { registerLocaleData } from '@angular/common';
import { UrlVideoPipe } from './pipes/url-video.pipe';
import { RecaptchaFormsModule, RecaptchaModule } from 'ng-recaptcha';
import { CambioPasswordComponent } from './components/usuario/cambio-password/cambio-password.component';
import { FacebookModule } from 'ngx-facebook';
import { ConfirmarComponent } from './components/confirmar/confirmar.component';
import { MaterialModule } from './material/material.module';
import { ContactoEmpresaComponent } from './components/eventos/contacto-empresa/contacto-empresa.component';
import { DatetimepickerComponent } from './components/controles/datetimepicker/datetimepicker.component';
import { ContactoOrganizadorComponent } from './components/eventos/contacto-organizador/contacto-organizador.component';
import { FormularioComponent } from './components/eventos/formulario/formulario.component';
import { EventoComponent } from './components/eventos/evento/evento.component';
const appInitializerFn = (appConfig: AppConfig) => {
  return () => {
    return appConfig.loadAppConfig();
  };
};
registerLocaleData(es, "es");

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
    QuienesSomosComponent,
    RecuperarPasswordComponent,
    LoadingComponent,
    EventoActualesFuturosComponent,
    UrlVideoPipe,
    CambioPasswordComponent,
    ConfirmarComponent,
    ContactoEmpresaComponent,
    DatetimepickerComponent,
    ContactoOrganizadorComponent,
    FormularioComponent,
    EventoComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    RecaptchaModule,
    RecaptchaFormsModule,
    FacebookModule.forRoot(),
    MaterialModule
  ],
  providers: [ AppConfig,
    {
       provide: LOCALE_ID, useValue: "es"
    },
  {
    provide: APP_INITIALIZER,
    useFactory: appInitializerFn,
    multi: true,
    deps: [AppConfig]
  },
  {
    provide: HTTP_INTERCEPTORS,
    useClass: AuditoriaInterceptorService,
    multi: true
  }

],
  bootstrap: [AppComponent]
})
export class AppModule { }
