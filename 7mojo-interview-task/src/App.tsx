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

const INTERVAL_SECONDS = 10;

const fetchUserData = async (dispatch, fetchPlayerInfo) => {
    try {
        dispatch(setUserDataIsLoading(true));
        const userData = await fetchPlayerInfo();
        const { data: initialData } = userData;
        const { data, errorMsg, successful} = initialData;
        if (!errorMsg && successful) {
            dispatch(setUserData(data));
        } else {
            dispatch(setUserData(null));
            dispatch(setUserDataError(errorMsg ? errorMsg : 'Error fetching user data!'));
        }
    } catch (error) {
        dispatch(setUserData(null));
        dispatch(setUserDataError('Error fetching user data!'));
    }
    dispatch(setUserDataIsLoading(false));
}

function App() {
    const dispatch = useAppDispatch();
    const { operatorToken, playerToken } = useAppSelector((state) => state.authorization);
    const { refetch: fetchPlayerInfo } = useGetPlayerInfoQuery({ playerToken, operatorToken });

    useEffect(() => {
        void fetchUserData(dispatch, fetchPlayerInfo);

        const intervalId = setInterval(() => {
            void fetchUserData(dispatch, fetchPlayerInfo)
        }, INTERVAL_SECONDS * 1000);

        return () => clearInterval(intervalId);
    }, [ fetchPlayerInfo, dispatch ]);

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
