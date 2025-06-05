  import { configureStore } from '@reduxjs/toolkit'
  import { persistStore, persistReducer } from 'redux-persist'
  import storage from 'redux-persist/lib/storage' 
  import { combineReducers } from 'redux'
  import userReducer from '../store/slice/user/user.slice'
  import socketReducer from '../store/slice/socket/socket.slice'
  import messageReducer from '../store/slice/message/message.slice'

  const persistConfig = {
    key: 'root',
    storage,
    blacklist: ['socket'] 
  }

  const rootReducer = combineReducers({
    user: userReducer,
    socket: socketReducer,
    message: messageReducer
  })

  const persistedReducer = persistReducer(persistConfig, rootReducer)

  export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        serializableCheck: {
          ignoredActions: [
            'persist/PERSIST',
            'persist/REHYDRATE',
            'persist/REGISTER',
            'socket/initializeSocket'
          ],
          ignoredPaths: ['socket.socket', 'persist'],
        },
      }),
  })

  export const persistor = persistStore(store)
