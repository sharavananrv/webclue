import { fetchNumber } from "./api";
import { call, put, takeEvery } from "redux-saga/effects";
import { addCount, mulCount } from "./store";

function* computeCount(action) {
  const random1 = yield call(fetchNumber); // fetchNumber 호출
  yield put(addCount(random1)); // addCount(random1) 액션을 dispatch
}

export default function*() {
  // COMPUTE 타임 액션이 dispatch 되면 computeCount 제너레이터를 실행한다
  yield takeEvery("COMPUTE", computeCount);
}
