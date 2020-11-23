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

## Why to use this library

Basically, when we interact with an api, for each api call, we have 2 steps:

- call the api
- manage the api call result (success or error)

With redux-observable, we can convert these steps to 3 actions:
Redux action | Description
--- | ---
`fetch` |this action will trigger the api call
`fetchSuccess` |manage a successfull api call
`fetchError` |manage a failed api call

These steps exist for each interaction with the api. If we have a read and an update api call, we will have 6 actions ( 3 for the read api call, 3 for the update api call)

1. read_fetch ==> call the api
2. read_fetchSuccess ==> manage the sucess call
3. read_fetchError ==> manage the error call
4. update_fetch ==> call the api
5. update_fetchSuccess ==> manage the sucess call
6. update_fetchError ==> manage the error call

The library will create and manage for you these steps. All you have to do is to create the reducers for these actions.

## <ins>More information</ins>

### <ins>AbstractEpicReducer</ins>

This class represents your action reducers (fetch, fetchSuccess, fetchError) + the api call. By extending the class you will implement 4 methods:

| Method         | Description                         |
| -------------- | ----------------------------------- |
| `fetchApiCall` | call the api                        |
| `fetch`        | reducer for the fetch action        |
| `fetchSuccess` | reducer for the fetch sucess action |
| `fetchError`   | reducer for the fetch error action  |

### <ins>AbstractSingleReducer</ins>

<b>This class represents the reducer for a single action. </b>

You can of course create an action which does not interact with redux-observable. You will use this class in order to manage a single action. By extending the class you will implement one method:

| Method          | Description             |
| --------------- | ----------------------- |
| `consumeAction` | reducer for your action |

### <ins>AbstractStateSlice</ins>

This class represents your state slice. It will generate the actions and the epics. By extending the class you will implement two methods:

| Method            | Description                        |
| ----------------- | ---------------------------------- |
| `getSliceName`    | define the reduxtoolkit slice name |
| `getInitialState` | get the inital state               |

The constructor will take 2 parameters.

```javascript
constructor(
  (epicReducers: Array<AbstractEpicReducer<State, any, any>> | null),
  (singleReducers: Array<AbstractSingleReducer<State, any>> | null),
);
```

### <ins><b>Use case</b></ins>

#### 1. <ins>Api information</ins>

In our example, we will work with the rest point https://jsonplaceholder.typicode.com/posts/{postId}

This request will return a json with 4 information ( userId, id, title, body)

```javascript
/*  https://jsonplaceholder.typicode.com/posts/1 */
{
  "userId": 1,
  "id": 1,
  "title": "sunt aut facere repellat provident occaecati excepturi optio reprehenderit",
  "body": "quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto"
}
```

#### 2. <ins>App requirements and behaviours<ins>

a) the user will search a post by encoding a digit

b) In addition to displaying the post information, we want to inform the user of the request status. The request status can be:

| Request status | Description      |
| -------------- | ---------------- |
| pending        | request on going |
| success        | request succeded |
| error          | request failed   |

c) If an error occured, we want to display the error message.

d) Via a reset button the user will be able to clear the screen

#### 3. <ins>Actions</ins>

Regarding the app requirements and behaviours, we will have four actions:

| Action Type            | Action Payload                | Description                                                                     |
| ---------------------- | ----------------------------- | ------------------------------------------------------------------------------- |
| post/read_fetch        | post id to search             | this action will trigger the request call                                       |
| post/read_fetchSuccess | contains the post information | this action will be triggered if the request succeds                            |
| post/read_fetchError   | request has failed            | this action will be triggered if the request fails                              |
| post/reset             | null                          | this action will be triggered when the user wants to clear the post information |

Action types are generated by redux-toolkit. For more information about how it works please visit https://redux-toolkit.js.org/

#### 4. <ins>Designing the state</ins>

In addition of the post information, we will add:

- the request status information.
- the error message if the request has failed

| State field  | Description                                   |
| ------------ | --------------------------------------------- |
| userId       | post information                              |
| id           | post information                              |
| title        | post information                              |
| body         | post information                              |
| errorMessage | error message to display if the request fails |
| fetchStatus  | request status                                |

```javascript
/* represents the request possibles status */
enum EFetchStatus {
  NONE = 'NONE',
  PENDING = 'PENDING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

/* represents the request success result */
interface PostInfos {
  userId: Number;
  id: Number;
  title: string;
  body: string;
}

/* represents our slice state */
interface PostState extends PostInfos {
  errorMessage: string;
  fetchStatus: EFetchStatus;
}
```

#### 5. <ins>Manage the api call</ins>

When the user searches a post

<b>1</b> an action post/read_fetch is triggered<br />
<b>2,7</b> the reducer consumes the action<br />
<b>3,8</b> the reducer updates the state<br />
<b>4</b> check if a side effect exists for the action<br />
<b>5</b> make the api call<br />
<b>6a</b> Request succeded -> trigger a post/read_fetchSuccess action<br />
<b>6b</b> Request failed -> trigger a post/read_fetchError action<br />

![alt text](vdr-reduxtool-observable.jpg 'Redux-observalble schema')

<b>The redux-observable part is managed by the library.</b>

To manage our api call, we will use the class <b><ins>AbstractEpicReducer</ins></b>.
By using this class we will implement four methods:

| Method         | Description                         | schema step |
| -------------- | ----------------------------------- | ----------- | --- |
| `fetchApiCall` | call the api                        | 5           |     |
| `fetch`        | reducer for the fetch action        | 3           |
| `fetchSuccess` | reducer for the fetch sucess action | 8           |
| `fetchError`   | reducer for the fetch error action  | 8           |

<div style="background-color:#EFEFEF; color:black;padding:10px">

```
 extends AbstractEpicReducer<A,B,C>
```

| State field | Description                       |
| ----------- | --------------------------------- |
| A           | state type                        |
| B           | fetch action payload type         |
| C           | fetch action success payload type |

 </div>

```javascript
// represents the post/read_fetch action payload */
interface ReadPostFetchPayload {
  postId: number;
}

// represents the post/read_fetchSuccess action payload */
interface ReadPostFetchSuccessPayload extends PostInfos {}

// /!\ This interface is provided by the library
// represents the post/read_fetchError action payload
interface FetchErrorPayload {
  errorCode: string;
  errorMsg: string;
  errorData: any;
}

class ReadPostReducer extends AbstractEpicReducer<PostState, ReadPostFetchPayload, ReadPostFetchSuccessPayload> {
  /* Step 5 - make the api call */
  fetchApiCall = (data: ReadPostFetchPayload) => findPostById(data.postId);

  /* Step 3 - reducer for the post/read_fetch action */
  fetch = (state: PostState, data: ReadPostFetchPayload) => ({
    ...POST_STATE_INTITIAL_STATE,
    fetchStatus: EFetchStatus.PENDING,
  });

  /* Step 8 - reducer for the post/read_fetchSuccess action */
  fetchSuccess = (state: PostState, data: ReadPostFetchSuccessPayload): PostState => ({
    ...data,
    errorMessage: '',
    fetchStatus: EFetchStatus.SUCCESS,
  });

  /*  Step 8 - reducer for the post/read_fetchError action */
  fetchError = (state: PostState, data: FetchErrorPayload) => {
    return {
      ...POST_STATE_INTITIAL_STATE,
      errorMessage: data.errorMsg,
      fetchStatus: EFetchStatus.ERROR,
    };
  };
}
```

#### 6. <ins>Manage the reset button with AbstractSingleReducer</ins>

When the user clicks on the reset button.

<b>1</b> an action post/reset is triggered<br />
<b>2</b> the reducer consumes the action<br />
<b>3</b> the reducer updates the state<br />

![alt text](vdr-reduxtool-observable-singleaction.jpg 'Redux-observalble schema')

To manage this action, we will use the class <b><ins>AbstractSingleReducer</ins></b>.
By using this class we will implement one method:

| Method                         | Description            | schema step |
| ------------------------------ | ---------------------- | ----------- |
| `consumeAction(state, action)` | reducer for the action | 3           |

<br />

<div style="background-color:#EFEFEF; color:black;padding:10px">

```javascript
 extends AbstractSingleReducer<A,B>
```

| State field | Description         |
| ----------- | ------------------- |
| A           | state type          |
| B           | action payload type |

 </div>
 
<br />

```javascript
/* Provided by the library */
export interface SingleAction<SingleActionPayload> {
  type: String;
  payload: SingleActionPayload;
}

export class ResetPostReducer extends AbstractSingleReducer<PostState, null> {
  consumeAction = (state: PostState, action: SingleAction<null>): PostState => POST_STATE_INTITIAL_STATE;
}
```

#### 7.<b><ins>Create your state slice</ins></b>

Now that we have our reducers, we want to glue them with our store.
We will use the <b>AbstractStateSlice</b>

```javascript
const SLICE_NAME = 'post';
class PostStateSlice extends AbstractStateSlice<PostState> {
  // all our actions will be prefixed by this value
  getSliceName = () => SLICE_NAME;
  // provide the initial state
  getInitialState = () => POST_STATE_INTITIAL_STATE;
}

const postSlice = new PostStateSlice(
  [
    //provide a list of AbstractEpicReducer
    // the library will generate and manage three actions  post/read_fetch, post/read_fetchSuccess, post/read_fetchError,
    new ReadPostReducer(SLICE_NAME, 'read'),
  ],
  [
    //provide a list of  AbstractSingleReducer
    new ResetPostReducer('reset'), // the library will generate an action 'reset'
  ],
);

//get the reducers in order to add them to the state
export const postReducers = postSlice.slice.reducer;

//get the epics in order to add them to the state epic
export const postEpic = postSlice.epic;

//action to trigger to load a post
export const getActionFindPostById = (x: ReadPostFetchPayload) => postSlice.slice.actions.read_fetch(x);

//action to trigger to reset the state
export const getActionResetPost = () => postSlice.slice.actions.reset(null);
```

<div style="background-color:#EFEFEF; color:black;padding:10px">

```javascript
 extends AbstractStateSlice<A>
```

| State field | Description |
| ----------- | ----------- |
| A           | state type  |

 </div>

#### 8. Configure our store (app.store.ts)

We configure our store with the epic and reducer generated by the class PostStateSlice

```javascript
const epicMiddleware = createEpicMiddleware();

const appStore = configureStore({
  devTools: true,
  reducer: combineReducers({
    post: postReducers,
  }),
  middleware: [epicMiddleware],
});

epicMiddleware.run(combineEpics(postEpic));

export default appStore;
```

8. Add the store to our application (index.tsx)

```javascript
ReactDOM.render(
  <Provider store={appStore}>
    <App />
  </Provider>,
  document.getElementById('root'),
);
```

#### 9. Screenshots

![alt text](Screenshot1.png 'Screenshot 1')

![alt text](Screenshot2.png 'Screenshot 2')

![alt text](Screenshot3.png 'Screenshot 3')

#### 10. Code

Full code is here: https://github.com/valentino-drappa/vdr-reduxtoolkit-epic-example

#react #redux-toolkit #axios #redux-observable #rxjs
