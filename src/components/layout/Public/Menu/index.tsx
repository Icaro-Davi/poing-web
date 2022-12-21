import { FC, Fragment } from "react";
import dynamic from "next/dynamic";
import { useApp } from "../../../../context/App";
import LoadWrapper from "../../../Loading/LoadWrapper";

const Sidebar = dynamic(async () => import("./Sidebar"), { loading: () => <LoadWrapper isLoading={true}><div style={{ width: '100%', height: 100 }} /></LoadWrapper> });
const HorizontalMenu = dynamic(async () => import("./Horizontal"), { loading: () => <LoadWrapper isLoading={true}><div style={{ width: '100%', height: 100 }} /></LoadWrapper> });

const Navbar: FC = props => {
    const { layout } = useApp();
    return (
        <Fragment>
            {layout.isDesktopSize
                ? <HorizontalMenu />
                : <Sidebar />}
        </Fragment>
    )
}

export default Navbar;