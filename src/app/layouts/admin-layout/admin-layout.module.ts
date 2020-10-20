import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { ClipboardModule } from 'ngx-clipboard';

import { AdminLayoutRoutes } from './admin-layout.routing';
import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent, NgbdModalConfirmAutofocus } from '../../pages/tables/tables.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { DataTablesModule } from 'angular-datatables';

import { AdvertisementsComponent } from './../../pages/advertisements/advertisements.component';
import { RulesComponent } from './../../pages/rules/rules.component';
import { EventsComponent } from './../../pages/events/events.component';
import { ComplaintsComponent } from './../../pages/complaints/complaints.component';
import { DivisionComponent, NgbdModalDivision } from './../../pages/division/division.component';
import { UserUiComponent } from 'src/app/pages/user-ui/user-ui.component';
import { PayComponent} from '../../pages/user-ui/pay/pay.component';
import { RecordComponent } from './../../pages/user-ui/record/record.component';
import { FileSelectDirective, FileUploadModule  } from 'ng2-file-upload';
import { ServicesComponent } from './../../pages/user-ui/services/services.component';
import { NgbdModalAdvertisements } from './../../pages/advertisements/advertisements.component';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';

// import { ToastrModule } from 'ngx-toastr';

@NgModule({
  imports: [
    CommonModule,
    ReactiveFormsModule,
    DataTablesModule,
    RouterModule.forChild(AdminLayoutRoutes),
    FormsModule,
    HttpClientModule,
    NgbModule,
    ClipboardModule,
    FileUploadModule,
  ],
  declarations: [
    NgbdModalDivision,
    UserUiComponent,
    DashboardComponent,
    UserProfileComponent,
    TablesComponent,
    NgbdModalConfirmAutofocus,
    IconsComponent,
    MapsComponent,
    AdvertisementsComponent,
    RulesComponent,
    EventsComponent,
    ComplaintsComponent,
    DivisionComponent,
    PayComponent,
    RecordComponent,
    ServicesComponent,
    NgbdModalAdvertisements
  ],
  providers: [
    NgbActiveModal,
  ]
})

export class AdminLayoutModule {}
