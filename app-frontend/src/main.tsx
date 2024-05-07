import React from "react";
import ReactDOM from 'react-dom/client'
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import {ErrorBoundary} from "react-error-boundary";
import ErrorPage from "./components/ErrorPage";
import {MantineProvider} from "@mantine/core";
import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import {QueryClient, QueryClientProvider,} from '@tanstack/react-query'
import {Notifications} from '@mantine/notifications';
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {Landing} from "./components/Landing/Landing.tsx";
import GameContainer from "./components/Game/GameContainer.tsx";
import {theme} from "./theme";
import './index.css'

export const client = new QueryClient()

const routes = [
    {element: <Landing/>, path: '/'},
    {element: <GameContainer/>, path: '/profile/:id'},
    {element: <Navigate to="/" replace/>, path: '*'},
]

const AppWrapper = () => {
    return <QueryClientProvider client={client}>
        <BrowserRouter>
            <ErrorBoundary FallbackComponent={ErrorPage}>
                <MantineProvider theme={theme} forceColorScheme={'dark'}>
                    <Routes>
                        {routes?.map(r =>
                            <Route key={r.path} path={r.path} element={r.element}/>
                        )}
                    </Routes>
                    <Notifications/>
                    <ReactQueryDevtools/>
                </MantineProvider>
            </ErrorBoundary>
        </BrowserRouter>
    </QueryClientProvider>
}

ReactDOM.createRoot(document.getElementById('root')!).render(<AppWrapper/>)
