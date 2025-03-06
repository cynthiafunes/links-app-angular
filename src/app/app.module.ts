import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { DetailComponent } from './detail/detail.component';
import { AddLinkComponent } from './add-link/add-link.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    DetailComponent,
    AddLinkComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot([
      { path: '', component: HomeComponent },
      { path: 'link/:id', component: DetailComponent },
      { path: 'add', component: AddLinkComponent },
      { path: '**', redirectTo: '' }
    ])
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
