import { IconType } from 'react-icons';
import { IoSettingsSharp, IoCodeSlashSharp, IoExtensionPuzzleSharp, IoCartSharp } from 'react-icons/io5';
import { BOT } from '../locale/defaultBoTInfo';

export type RouterType = {
    key: string;
    href: string;
    icon: IconType;
    disabled?: boolean;
}

const routes: RouterType[] = [
    {
        key: BOT.name,
        href: "/dashboard/poing",
        icon: IoSettingsSharp
    },
    {
        key: "commands",
        href: "/dashboard/commands",
        icon: IoCodeSlashSharp,
        disabled: true
    },
    {
        key: "modules",
        href: "/dashboard/modules",
        icon: IoExtensionPuzzleSharp,
        disabled: true
    },
    // {
    //     name: "Payments",
    //     href: "/dashboard/payments",
    //     icon: IoCartSharp,
    //     disabled: true
    // }
]

export default routes;