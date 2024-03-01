import { Routes, Route, BrowserRouter } from 'react-router-dom';
import AuthGuard from './AuthGuard';

const Router = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<AuthGuard isPrivate={false} />}>
                    <Route path="/login" element={<>Login</>} />
                    <Route path="/register" element={<>Register</>} />
                </Route>

                <Route element={<AuthGuard isPrivate />}>
                    <Route path="/" element={<>Dashboard</>} />
                </Route>
            </Routes>
        </BrowserRouter>
    );
};

export default Router;
