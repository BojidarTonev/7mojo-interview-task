import React, {useEffect} from "react";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {setUserData, setUserDataError, setUserDataIsLoading} from "./redux/features/authorization-slice";
import {useAppDispatch, useAppSelector} from "./redux/store";
import LiveCasinoGamesPage from "./pages/live-casino-games/LiveCasinoGamesPage";
import SlotGamesPage from "./pages/slot-games/SlotGamesPage";
import Header from "./components/header/Header";
import {useGetPlayerInfoQuery} from "./redux/services/authorization-api";
import './App.scss'

interface IRouteType {
    path: string;
    Element: React.ComponentType;
}

const routes: IRouteType[] = [
    {
        path: '/live-casino-games',
        Element: LiveCasinoGamesPage
    },
    {
        path: '/slot-games',
        Element: SlotGamesPage
    }
];

const setUserDataInSlice = (isLoading, userData, dispatch, error) => {
    dispatch(setUserDataIsLoading(isLoading));
    if (userData) {
        const { data: initialData, errorMsg, successful } = userData;

        if (successful) {
            dispatch(setUserData(initialData));
        } else {
            dispatch(setUserData(null));
            dispatch(setUserDataError(errorMsg ? errorMsg : 'Error fetching user data!'));
        }
    } else if (error) {
        dispatch(setUserData(null));
        dispatch(setUserDataError('Error fetching user data!'));
    }
}

const INTERVAL_SECONDS = 10;

function App() {
    const dispatch = useAppDispatch();
    const { operatorToken, playerToken } = useAppSelector((state) => state.authorization);
    const { data: userData, isLoading, error } = useGetPlayerInfoQuery({ playerToken, operatorToken }, {
        pollingInterval: INTERVAL_SECONDS * 1000
    });

    useEffect(() => {
        setUserDataInSlice(isLoading, userData, dispatch, error);
    }, [userData, dispatch, error, isLoading]);

    return (<div className="app-wrapper">
        <BrowserRouter>
            <Header/>
            <main>
                <Routes>
                    {routes.map(({ path, Element }) => <Route key={path} path={path} element={<Element />}/>)}
                    <Route path="/" element={<Navigate to="/slot-games" replace />} />
                </Routes>
           </main>
        </BrowserRouter>
    </div>)
}

export default App
