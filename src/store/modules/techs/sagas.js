import { call, put } from 'redux-saga/effects';
import api from '~/services/api';

import * as Techs from './actions';

export function* getTechs() {
  try {
    const response = yield call(api.get, 'techs');
    yield put(Techs.getTechsSuccess(response.data));
  } catch (err) {
    yield put(Techs.getTechsFailure());
  }
}
