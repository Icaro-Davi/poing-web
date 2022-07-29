import { IconType } from 'react-icons';
import { IoSettingsSharp, IoCodeSlashSharp, IoExtensionPuzzleSharp, IoCartSharp } from 'react-icons/io5';

export type RouterType = {
    name: string;
    href: string;
    icon: IconType;
    disabled?: boolean;
}

const routes: RouterType[] = [
    {
        name: "Poing",
        href: "/dashboard/poing",
        icon: IoSettingsSharp
    },
    {
        name: "Commands",
        href: "/dashboard/commands",
        icon: IoCodeSlashSharp,
        disabled: true
    },
    {
        name: "Modules",
        href: "/dashboard/modules",
        icon: IoExtensionPuzzleSharp,
        disabled: true
    },
    {
        name: "Payments",
        href: "/dashboard/payments",
        icon: IoCartSharp,
        disabled: true
    }
]

export default routes;