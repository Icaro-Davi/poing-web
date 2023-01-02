import { FC, useRef } from "react";
import { useApp } from "../../../context/App";
import { MemberLeaveService, WelcomeMemberService } from "../../../services/discord/modules";
import LocalStorage from "../../../utils/localStorage";
import ListModules from "../../List/ListModules";
import ModulesModal, { ModulesModalRef } from '../../Modal/Modules/welcomeOrLeaveMember';

const ModulesScreen: FC = props => {
    const { locale: { pages: { dashboard: { modules } } } } = useApp();
    const welcomeMemberRef = useRef<ModulesModalRef>(null);
    const memberLeaveRef = useRef<ModulesModalRef>(null);
    const guild = LocalStorage.bot.getSettings();
    return (
        <div style={{ display: 'flex', height: '100%' }}>
            <ListModules guildId={guild?._id ?? 'module-screen-'} locale={modules} items={[
                {
                    isActive: guild?.modules?.welcomeMember?.isActive ?? false,
                    name: modules.welcomeMember.title,
                    modal: () => welcomeMemberRef.current?.modalRef,
                    updateActivity: (isActive) => WelcomeMemberService.updateActivity(isActive)
                },
                {
                    isActive: guild?.modules?.memberLeave?.isActive ?? false,
                    name: modules.memberLeave.title,
                    modal: () => memberLeaveRef.current?.modalRef,
                    updateActivity: (isActive) => MemberLeaveService.updateActivity(isActive)
                },
            ]} />

            <ModulesModal
                ref={welcomeMemberRef}
                title={modules.welcomeMember.title}
                moduleType='welcomeMember'
                />
            <ModulesModal
                ref={memberLeaveRef}
                title={modules.memberLeave.title}
                moduleType='memberLeave'
            />
        </div>
    );
}

export default ModulesScreen;