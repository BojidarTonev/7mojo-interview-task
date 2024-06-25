import {configureStore, Middleware} from '@reduxjs/toolkit';
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";

// services
import {authorizationApi} from "./services/authorization-api";
// features
import {authorizationSlice} from "./features/authorization-slice";

const middlewares: Middleware[] = [
    authorizationApi.middleware
];

const store = configureStore({
    reducer: {
        [authorizationApi.reducerPath]: authorizationApi.reducer,
        [authorizationSlice.name]: authorizationSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(middlewares)
});

type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
const useAppDispatch = () => useDispatch<AppDispatch>();

export {
    useAppSelector,
    useAppDispatch,
};

export default store;