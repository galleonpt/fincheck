import { FC } from 'react';
import { Link } from 'react-router-dom';

const Login: FC = () => {
    return (
        <>
            <header className="flex flex-col items-center gap-4 text-center">
                <h1 className="text-2xl font-bold text-gray-900 tracking[-1px]">
                    Entre na sua conta
                </h1>

                <p className="space-x-2">
                    <span className="text-gray-700 tracking-[-0.5px]">
                        Novo por aqui?
                    </span>

                    <Link
                        to="/register"
                        className="tracking-[-0.5px] font-medium text-teal-900"
                    >
                        Crie uma conta
                    </Link>
                </p>
            </header>
        </>
    );
};

export default Login;
