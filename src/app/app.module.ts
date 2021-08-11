import { LojaService } from './services/loja/loja.service';
import { ProdutoService } from './services/produto/produto.service';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {LOCALE_ID} from '@angular/core';
import localePt from '@angular/common/locales/pt';
import {registerLocaleData} from '@angular/common';

registerLocaleData(localePt, 'pt');

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CatalogoComponent } from './components/catalogo/catalogo.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import {DataViewModule} from 'primeng/dataview';
import {ButtonModule} from 'primeng/button';
import {PanelModule} from 'primeng/panel';
import {DropdownModule} from 'primeng/dropdown';
import {DialogModule} from 'primeng/dialog';
import {InputTextModule} from 'primeng/inputtext';
import {RippleModule} from 'primeng/ripple';
import {BadgeModule} from 'primeng/badge';
import {ToolbarModule} from 'primeng/toolbar';
import {CardModule} from 'primeng/card';
import {MenuModule} from 'primeng/menu';
import {TabViewModule} from 'primeng/tabview';
import {InputSwitchModule} from 'primeng/inputswitch';
import {FieldsetModule} from 'primeng/fieldset';
import {InputTextareaModule} from 'primeng/inputtextarea';
import {AutoCompleteModule} from 'primeng/autocomplete';
import {ToastModule} from 'primeng/toast';
import {PasswordModule} from 'primeng/password';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmPopupModule} from 'primeng/confirmpopup';
import {MessagesModule} from 'primeng/messages';
import {MessageModule} from 'primeng/message';
import {InputMaskModule} from 'primeng/inputmask';

import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HeaderComponent } from './components/catalogo/header/header.component';
import { ProdutoComponent } from './components/catalogo/produto/produto.component';
import { ProdutosComponent } from './components/catalogo/produtos/produtos.component';
import { LojaComponent } from './components/dashboard/loja/loja.component';
import { ItensComponent } from './components/dashboard/itens/itens.component';
import { AdicionarProdutoComponent } from './components/dashboard/adicionar-produto/adicionar-produto.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/home/login/login.component';
import { CadastroComponent } from './components/home/cadastro/cadastro.component';

import {NgxImageCompressService} from 'ngx-image-compress';
import { EditarProdutoComponent } from './components/dashboard/editar-produto/editar-produto.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    CatalogoComponent,
    DashboardComponent,
    HeaderComponent,
    ProdutoComponent,
    ProdutosComponent,
    LojaComponent,
    ItensComponent,
    AdicionarProdutoComponent,
    HomeComponent,
    LoginComponent,
    CadastroComponent,
    EditarProdutoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    DataViewModule,
    PanelModule,
    DialogModule,
    DropdownModule,
    InputTextModule,
    MessageModule,
    MessagesModule,
    ButtonModule,
    RippleModule,
    ToolbarModule,
    FieldsetModule,
    InputMaskModule,
    InputTextareaModule,
    ConfirmDialogModule,
    ToastModule,
    PasswordModule,
    CardModule,
    MenuModule,
    AutoCompleteModule,
    InputSwitchModule,
    ConfirmPopupModule,
    TabViewModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    BadgeModule,
    AppRoutingModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the app is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })
  ],
  providers: [
    ProdutoService,
    LojaService,
    NgxImageCompressService,
    {
      provide: LOCALE_ID,
      useValue: "pt"
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
