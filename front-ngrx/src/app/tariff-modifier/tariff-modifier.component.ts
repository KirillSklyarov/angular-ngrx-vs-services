import { ChangeDetectorRef, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { UserFacadeService } from '../services/user-facade.service';
import { TariffModifierFacadeService } from './services/tariff-modifier-facade.service';
import { TariffModifier } from '../models/tariff-modifier';
import { filter, takeUntil } from 'rxjs/operators';
import { UserTariffModifier } from '../models/user-tariff-modifier';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { DeleteTariffModifierModalComponent } from './delete-tariff-modifier-modal/delete-tariff-modifier-modal.component';

@Component({
  selector: 'app-tariff-modifier',
  templateUrl: './tariff-modifier.component.html',
  styleUrls: ['./tariff-modifier.component.scss']
})
export class TariffModifierComponent implements OnInit, OnDestroy {

  public userTariffModifierList: TariffModifier[] | null = null;
  public allTariffModifierList: UserTariffModifier[] | null = null;

  private destroy$: Subject<void> = new Subject<void>();

  constructor(
    private cdr: ChangeDetectorRef,
    private userFacadeService: UserFacadeService,
    private tariffModifierFacadeService: TariffModifierFacadeService,
    private modalService: NgbModal,
  ) {
  }

  ngOnInit(): void {
    this.tariffModifierFacadeService.loadAllTariffModifierList();

    this.userFacadeService.userTariffModifiersValue$
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe((userTariffModifierList: TariffModifier[]) => {
        this.userTariffModifierList = userTariffModifierList;
        this.cdr.detectChanges();
      });

    this.tariffModifierFacadeService.allTariffModifierListValueWithUserData$
      .pipe(
        takeUntil(this.destroy$),
      )
      .subscribe((allTariffModifierList: UserTariffModifier[]) => {
        this.allTariffModifierList = allTariffModifierList;
        this.cdr.detectChanges();
      });

  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public openDeleteModal(userTariffModifier: TariffModifier): void {
    const modalRef = this.modalService.open(DeleteTariffModifierModalComponent);

    modalRef.closed.pipe(
      takeUntil(this.destroy$),
      filter(result => result === true),
    ).subscribe(() => {
      this.tariffModifierFacadeService.deleteTariffModifier(userTariffModifier.id);
    });
  }

}
