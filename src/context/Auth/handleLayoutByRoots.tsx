import dynamic from "next/dynamic";
import { Fragment, ReactNode } from "react";
import appRoutes from '../../config/routes.json';

const MainLayout = dynamic(() => import('../../components/layout/Main'), { suspense: true });
const AuthLayout = dynamic(() => import('../../components/layout/Auth'), { suspense: true });

function handleLayoutsByRoots(path: string, isAuthenticated: boolean, children: ReactNode, redirect: (path: string) => void) {
    const route = appRoutes.find(route => route.path === path);
    if (route && !route.public && !isAuthenticated) {
        typeof window !== 'undefined' && redirect('/');
        return;
    };
    switch (route?.layout) {
        case 'MainLayout':
            return <MainLayout children={children} />
        case 'AuthLayout':
            return <AuthLayout children={children} />;
        case 'blank':
            return <Fragment>{children}</Fragment>
        // 404
        default:
            return <MainLayout children={children} />;
    }
}

export default handleLayoutsByRoots;