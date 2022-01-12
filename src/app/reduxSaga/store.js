import { createStore, applyMiddleware } from "redux";
import createSaga from "redux-saga";
import saga from "./saga";
const sagaMiddleWare = createSaga();
var localItem = localStorage.getItem('webClueForm')? localStorage.getItem('webClueForm'): [];

function reducer(state, action) {
  switch (action.type) {
    case "ADD":
      return localStorage.getItem('webClueForm');
    default:
      return state;
  }
}

export function addCount(value) {
  return {
    type: "ADD",
    value
  };
}


export const store = createStore(reducer, localItem, applyMiddleware(sagaMiddleWare));
sagaMiddleWare.run(saga);
