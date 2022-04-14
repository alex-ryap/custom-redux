/*
  Реализуйте функцию createStore, которая возвращает объект store.
  createStore должна принимать на вход reducer и initialState.
  В store должна быть функция subscribe, подписывающая на себя переданного в неё listener.
  При обновлении данных в store, он (store) должен уведомить об обновлении всех listeners.
  В приложении есть 2 "компонента", каждый подписывается на обновления в store.
  Они отображают содержимое стора и кнопки.
  Нажатие на кнопку increment/decrement изменяет состояние стора, соответственно UI должен обновиться.
  При нажатии кнопки unsubscribe в одном из компонентов должен отписаться только этот компонент.
  То есть второй компонент при этом сохраняет свою возможность получать обновления из стора.
*/
import { v4 as uuid4 } from 'uuid';

export function createStore(reducer, initialState) {
  let currentReducer = reducer;
  let currentState = initialState;
  let listeners = {};

  function getState() {
    return currentState;
  }

  function dispatch(action) {
    currentState = currentReducer(currentState, action);
    Object.keys(listeners).forEach((id) => listeners[id]());
    return action;
  }

  function subscribe(newListener) {
    const id = uuid4();
    listeners[id] = newListener;
    return () => unsubscribe(id);
  }

  function unsubscribe(id) {
    console.log('unsubscribe ', id);
    delete listeners[id];
  }

  return { getState, dispatch, subscribe };
}
