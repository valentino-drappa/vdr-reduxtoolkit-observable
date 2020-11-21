# vdr-reduxtoolkit-observable

This library facilitates the use of redux-observable with redux-toolkit.

## Installation

- npm
  - npm install vdr-reduxtoolkit-observable
- yarn
  - yarn add vdr-reduxtoolkit-observable

## prerequisite

To know more about redux-toolkit and redux-observable, please visit:

https://redux-toolkit.js.org/

https://redux-observable.js.org/

## Why to use the library

Basically, when we interact with an api, for each api call, we have 2 steps:

- call the api
- manage the api call result (success or error)

With redux-observable, we can convert these steps to 3 actions:
Redux action | Description
--- | ---
`fetch` |this action will trigger the api call
`fetchSuccess` |manage a successfull api call
`fetchError` |manage an api error call

These steps exist for each interaction with the api. If we have a read and update api call, we will have 6 actions ( 3 for the read api calls, 3 for the update api calls)

1. read_fetch ==> call the api
2. read_fetchSuccess ==> manage the sucess call
3. read_fetchError ==> manage the error call
4. update_fetch ==> call the api
5. update_fetchSuccess ==> manage the sucess call
6. update_fetchError ==> manage the error call

The library will create and manage for you these steps. All you have to do is to create the reducers for theses action.

## <ins>How to use it</ins>

### <ins>AbstractEpicReducer</ins>

This class represents your action reducers (fetch, fetchSuccess, fetchError). By extending the class you will implement 4 methods:

| Method         | Description                         |
| -------------- | ----------------------------------- |
| `fetchApiCall` | call the api                        |
| `fetch`        | reducer for the fetch action        |
| `fetchSuccess` | reducer for the fetch sucess action |
| `fetchError`   | reducer for the fetch error action  |

### <ins>AbstractSingleReducer</ins>

[TDB]

### <ins>AbstractStateSlice</ins>

[TDB]

### <ins>show it in action</ins>

Visit `https://github.com/valentino-drappa/vdr-reduxtoolkit-epic-example` to see how to use the library.

#react #redux-toolkit #axios #redux-observable #rxjs
