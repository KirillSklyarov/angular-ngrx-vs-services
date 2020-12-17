import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { UserFacadeService } from '../services/user-facade.service';
import { TariffModifierFacadeService } from './services/tariff-modifier-facade.service';
import { TariffModifier } from '../models/tariff-modifier';
import { filter, takeUntil } from 'rxjs/operators';
import { UserTariffModifier } from '../models/user-tariff-modifier';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteTariffModifierModalComponent } from './components/delete-tariff-modifier-modal/delete-tariff-modifier-modal.component';
import { AddTariffModifierModalComponent } from './components/add-tariff-modifier-modal/add-tariff-modifier-modal.component';
import { BaseComponent } from '../core/base.component';

@Component({
  selector: 'app-tariff-modifier',
  templateUrl: './tariff-modifier.component.html',
  styleUrls: ['./tariff-modifier.component.scss']
})
export class TariffModifierComponent extends BaseComponent implements OnInit {

  public userTariffModifierList: TariffModifier[] | null = null;
  public allTariffModifierList: UserTariffModifier[] | null = null;

  constructor(
    private cdr: ChangeDetectorRef,
    private userFacadeService: UserFacadeService,
    private tariffModifierFacadeService: TariffModifierFacadeService,
    private modalService: NgbModal,
  ) {
    super();
  }

  ngOnInit(): void {
    this.tariffModifierFacadeService.loadAllTariffModifierList();

    this.userFacadeService.userTariffModifierList$
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe((userTariffModifierList: TariffModifier[]) => {
        this.userTariffModifierList = userTariffModifierList;
        this.cdr.detectChanges();
      });

    this.tariffModifierFacadeService.allTariffModifierListWithUserData$
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe((allTariffModifierList: UserTariffModifier[]) => {
        this.allTariffModifierList = allTariffModifierList;
        this.cdr.detectChanges();
      });

  }

  public onAddClick(tariffModifier: TariffModifier): void {
    const modalRef = this.modalService.open(AddTariffModifierModalComponent);

    modalRef.closed.pipe(
      takeUntil(this.destroy$),
      filter(result => result === true),
    ).subscribe(() => {
      this.tariffModifierFacadeService.addTariffModifier(tariffModifier.id);
    });
  }

  public onDeleteClick(tariffModifier: TariffModifier): void {
    const modalRef = this.modalService.open(DeleteTariffModifierModalComponent);

    modalRef.closed.pipe(
      takeUntil(this.destroy$),
      filter(result => result === true),
    ).subscribe(() => {
      this.tariffModifierFacadeService.deleteTariffModifier(tariffModifier.id);
    });
  }
}
