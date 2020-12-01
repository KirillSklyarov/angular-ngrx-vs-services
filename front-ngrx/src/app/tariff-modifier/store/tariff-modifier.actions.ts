import { createAction, props } from '@ngrx/store';
import { TariffModifier } from '../../models/tariff-modifier';

export const loadAllTariffModifierListAction = createAction(
  '[Tariff Modifier] loadAllTariffModifierListAction',
);

export const loadAllTariffModifierListSuccessAction = createAction(
  '[Tariff Modifier] loadAllTariffModifierListSuccessAction',
  props<{ tariffModifierList: TariffModifier[] }>(),
);

export const deleteUserTariffModifierAction = createAction(
  '[Tariff Modifier] deleteUserTariffModifierAction',
  props<{ id: string }>(),
);

export const deleteUserTariffModifierSuccessAction = createAction(
  '[Tariff Modifier] deleteUserTariffModifierSuccessAction',
);
