import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { UiModule } from '@finance-dashboard/ui'
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { AddmemberComponent } from './dashboard/addmember/addmember.component';
import { AddInvestorComponent } from './dashboard/add-investor/add-investor.component';
import { ViewAllMemberComponent } from './dashboard/view-all-member/view-all-member.component';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'; 
import { FlexLayoutModule } from '@angular/flex-layout';
import { HttpClientModule } from '@angular/common/http';
import { PopupAddMemberComponent } from './dashboard/popup-add-member/popup-add-member.component';
import { ViewAllInvestorsComponent } from './dashboard/view-all-investors/view-all-investors.component';
import { PopupAddInvestorComponent } from './dashboard/popup-add-investor/popup-add-investor.component';
import { PopupMemberProfileComponent } from './dashboard/popup-member-profile/popup-member-profile.component';

@NgModule({
  declarations: [AppComponent, LoginComponent, DashboardComponent, AddmemberComponent, AddInvestorComponent, ViewAllMemberComponent, PopupAddMemberComponent, ViewAllInvestorsComponent, PopupAddInvestorComponent, PopupMemberProfileComponent],
  imports: [
    BrowserModule, 
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    HttpClientModule, 
    AppRoutingModule, 
    UiModule
    ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
