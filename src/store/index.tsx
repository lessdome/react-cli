import {FC, PropsWithChildren} from 'react'
import {Provider} from 'react-redux'
import {configureStore} from '@reduxjs/toolkit'
import {TypedUseSelectorHook, useDispatch as useDispatchNative, useSelector as useSelectorNative} from 'react-redux'
import {name as nameCounter, reducer as reducerCounter} from './counter'

export const store = configureStore({
  reducer: {
    [nameCounter]: reducerCounter,
  },
})

export const useDispatch = () => useDispatchNative<typeof store.dispatch>()
export const useSelector: TypedUseSelectorHook<ReturnType<typeof store.getState>> = useSelectorNative

const Store: FC<PropsWithChildren> = ({children}) => <Provider store={store}>{children}</Provider>

export default Store
