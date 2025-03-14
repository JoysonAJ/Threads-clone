import { configureStore } from '@reduxjs/toolkit'
import serviceSlice from "@/redux/service.slice"
import serviceApi from "@/redux/api/service.api"

export const store = configureStore({
  reducer: {
    ServiceStore:serviceSlice,
    [serviceApi.reducerPath]:serviceApi.reducer
  },
  middleware:(getDefaultMiddleware)=>(
    getDefaultMiddleware({serializableCheck:false}).concat(serviceApi.middleware)
  )
  
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch