import {Action as HAAction, Dispatch as HADispatch, Effect as HAEffect, Subscription as HASubscription} from 'hyperapp'
declare global {
  
  // inject useful hyperapp types
  type Action<S,P=any> = HAAction<S,P>
  type Dispatch<S> = HADispatch<S>
  type Effect<S,P=any> = HAEffect<S,P>
  type Subscription<S, P=any> = HASubscription<S,P>
  
  // useful global types for this app
  type State = {counter: number}
  type AppAction<P=any> = Action<State, P>
}
