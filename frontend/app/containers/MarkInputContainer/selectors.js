import { createSelector } from 'reselect';

export const selectAlertConfigurationForms = (state) =>
  state.get('alertConfigurationForm');

export const makeSelectAlertConfigurationLoading = () =>
  createSelector(selectAlertConfigurationForms, (alertConfigurationFormState) =>
    alertConfigurationFormState.get('loading'));

export const makeSelectError = () =>
  createSelector(selectAlertConfigurationForms, (alertConfigurationFormState) =>
    alertConfigurationFormState.get('error'));

export const makeSelectSuccess = () =>
  createSelector(selectAlertConfigurationForms, (alertConfigurationFormState) =>
    alertConfigurationFormState.get('success'));
