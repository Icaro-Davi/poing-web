import Router from "next/router";
import routes, { RouterType } from "../../../../config/dashboard.routes"
import { Button } from '../../../Buttons';

type Options = {
    currentPath: string;
    localeLang: string;
}

const NavigationButton = (route: RouterType, options: Options) => (
    <Button
        key={route.name}
        disabled={route.disabled}
        active={`/${options.localeLang}${route.href}` === options.currentPath}
        style={{ width: '90%' }}
        onClick={() => Router.push(`/${options.localeLang}${route.href}`)}
        icon={<route.icon />}
        focusColor="linear-gradient(to right, #0f83e7,#004191)"
    >
        {route.name}
    </Button>
);

const RenderNavigationButtons = (options: Options) =>
    routes.map(route => NavigationButton(route, options));

export default RenderNavigationButtons;