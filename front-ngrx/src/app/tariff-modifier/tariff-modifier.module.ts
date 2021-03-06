import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { TariffModifierComponent } from './tariff-modifier.component';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { tariffModifierReducer } from './store/tariff-modifier.reducers';
import { TariffModifierEffects } from './store/tariff-modifier.effects';
import { TariffModifierService } from './services/tariff-modifier.service';
import { TariffModifierFacadeService } from './services/tariff-modifier-facade.service';
import { DeleteTariffModifierModalComponent } from './components/delete-tariff-modifier-modal/delete-tariff-modifier-modal.component';
import { ModalModule } from '../shared/modal/modal.module';
import { TooltipPipe } from './pipes/tooltip.pipe';
import { AddTariffModifierModalComponent } from './components/add-tariff-modifier-modal/add-tariff-modifier-modal.component';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { TariffModifierCardComponent } from './components/tariff-modifier-card/tariff-modifier-card.component';
import { UserTariffModifierCardComponent } from './components/user-tariff-modifier-card/user-tariff-modifier-card.component';
import { BillableCardModule } from '../shared/billable-card/billable-card.module';

const routes: Routes = [
  {
    path: '',
    component: TariffModifierComponent,
  },
];

@NgModule({
  declarations: [
    TariffModifierComponent,
    DeleteTariffModifierModalComponent,
    TooltipPipe,
    AddTariffModifierModalComponent,
    TariffModifierCardComponent,
    UserTariffModifierCardComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    StoreModule.forFeature('tariff-modifier', tariffModifierReducer),
    EffectsModule.forFeature([
      TariffModifierEffects,
    ]),
    ModalModule,
    NgbTooltipModule,
    BillableCardModule,
  ],
  providers: [
    TariffModifierService,
    TariffModifierFacadeService,
  ],
  exports: [
    RouterModule,
  ],
})
export class TariffModifierModule { }
