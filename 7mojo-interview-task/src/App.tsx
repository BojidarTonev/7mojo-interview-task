import React, {useEffect} from "react";
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import LiveCasinoGamesPage from "./pages/live-casino-games/LiveCasinoGamesPage";
import SlotGamesPage from "./pages/slot-games/SlotGamesPage";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import {useGetPlayerInfoQuery} from "./redux/services/authorization-api";
import {setUserData, setUserDataError, setUserDataIsLoading} from "./redux/features/authorization-slice";
import {useAppDispatch} from "./redux/store";
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

function App() {
    const dispatch = useAppDispatch();
    const { refetch } = useGetPlayerInfoQuery({ playerToken: 'Player777', operatorToken: '654be709f71140f7aa65dcd8cede80d4'});

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                dispatch(setUserDataIsLoading(true));
                const userData = await refetch();
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
                console.error('error => ', error);
            }
            dispatch(setUserDataIsLoading(false));
        }

        void fetchUserData();

        const intervalId = setInterval(() => {
            void fetchUserData()
        }, INTERVAL_SECONDS * 1000);

        return () => clearInterval(intervalId);
    }, [ refetch, dispatch ]);

    return (<div className="app-wrapper">
        <BrowserRouter>
            <Header/>
            <main>
                <Routes>
                    {routes.map(({ path, Element }) => <Route key={path} path={path} element={<Element />}/>)}
                    <Route path="/" element={<Navigate to="/slot-games" replace />} />
                </Routes>
           </main>
           <Footer />
        </BrowserRouter>
    </div>)
}

export default App
