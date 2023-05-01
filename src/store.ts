import { configureStore } from '@reduxjs/toolkit'
import {ModuleStateSlice} from "./state/ModulesStateSlice";

const store = configureStore({
    reducer: {
        modules: ModuleStateSlice.reducer,
    },
});

export default store
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch