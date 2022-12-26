import { FC, useRef } from "react";
import { useApp } from "../../../context/App";
import { WelcomeMemberService } from "../../../services/discord/modules";
import LocalStorage from "../../../utils/localStorage";
import ListModules from "../../List/ListModules";
import ModulesModal, { ModulesModalRef } from '../../Modal/Modules';

const ModulesScreen: FC = props => {
    const { locale: { pages: { dashboard: { modules } } } } = useApp();
    const modulesRef = useRef<ModulesModalRef>(null);
    const guild = LocalStorage.bot.getSettings();
    return (
        <div style={{ display: 'flex', height: '100%' }}>
            <ListModules guildId={guild?._id ?? 'module-screen-'} locale={modules} items={[
                {
                    isActive: guild?.modules?.welcomeMember?.isActive ?? false,
                    name: modules.welcomeMember.title,
                    modal: () => modulesRef.current?.welcomeMember,
                    updateActivity: (isActive) => WelcomeMemberService.updateActivity(isActive)
                },
            ]} />
            <ModulesModal ref={modulesRef} />
        </div>
    );
}

export default ModulesScreen;