import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { MapsComponent } from '../../pages/maps/maps.component';
import { UserProfileComponent } from '../../pages/user-profile/user-profile.component';
import { TablesComponent } from '../../pages/tables/tables.component';

import { AdvertisementsComponent } from './../../pages/advertisements/advertisements.component';
import { RulesComponent } from './../../pages/rules/rules.component';
import { EventsComponent } from './../../pages/events/events.component';
import { ComplaintsComponent } from './../../pages/complaints/complaints.component';
import { DivisionComponent } from './../../pages/division/division.component';
import { UserUiComponent } from 'src/app/pages/user-ui/user-ui.component';
import {PayComponent} from '../../pages/user-ui/pay/pay.component';
import { RecordComponent } from './../../pages/user-ui/record/record.component';
import { ServicesComponent } from 'src/app/pages/user-ui/services/services.component';
import { VotingComponent } from './../../pages/voting/voting.component';
import { PaymentsComponent } from './../../pages/payments/payments.component';
import { OrdersComponent } from './../../pages/orders/orders.component';
import { HistoryComponent } from './../../pages/user-ui/history/history.component';


export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'user-profile',   component: UserProfileComponent },
    { path: 'tables',         component: TablesComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'maps',           component: MapsComponent },
    { path: 'advertisements', component: AdvertisementsComponent },
    { path: 'rules',          component: RulesComponent } ,
    { path: 'events',         component: EventsComponent },
    { path: 'complaints',     component: ComplaintsComponent },
    { path: 'division',       component: DivisionComponent },
    { path: 'ui',             component: UserUiComponent },
    { path: 'pay',            component: PayComponent },
    { path: 'record',         component: RecordComponent },
    { path: 'services',       component: ServicesComponent },
    { path: 'voting',         component: VotingComponent},
    { path: 'payments',       component: PaymentsComponent},
    { path: 'orders',         component: OrdersComponent},
    { path: 'history',         component: HistoryComponent},





];
