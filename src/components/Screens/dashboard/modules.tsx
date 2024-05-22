import { FC, useRef } from "react";
import { useApp } from "../../../context/App";
import { MemberLeaveService, WelcomeMemberService } from "../../../services/discord/modules";
import RoleByInteractionService from "../../../services/discord/modules/roleByInteraction";
import LocalStorage from "../../../utils/localStorage";
import ListModules from "../../List/ListModules";

import RoleByInteractionModal, { RoleByInteractionRef } from '../../Modal/Modules/roleByInteraction';
import WelcomeOrLeaveModuleModal, { WelcomeOrLeaveModalRef } from '../../Modal/Modules/welcomeOrLeaveMember';

const ModulesScreen: FC = props => {
    const { locale: { pages: { dashboard: { modules } } } } = useApp();
    const welcomeMemberRef = useRef<WelcomeOrLeaveModalRef>(null);
    const memberLeaveRef = useRef<WelcomeOrLeaveModalRef>(null);
    const roleByInteractionRef = useRef<RoleByInteractionRef>(null);
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
                {
                    isActive: guild?.modules?.roleByInteraction?.isActive ?? false,
                    name: modules.roleByInteraction.title,
                    modal: () => roleByInteractionRef.current?.modalRef,
                    updateActivity: (isActive) => RoleByInteractionService.updateActivity(isActive)
                },
            ]} />

            <WelcomeOrLeaveModuleModal
                ref={welcomeMemberRef}
                title={modules.welcomeMember.title}
                moduleType='welcomeMember'
            />
            <WelcomeOrLeaveModuleModal
                ref={memberLeaveRef}
                title={modules.memberLeave.title}
                moduleType='memberLeave'
            />
            <RoleByInteractionModal
                ref={roleByInteractionRef}
                title={modules.roleByInteraction.title}
            />
        </div>
    );
}

export default ModulesScreen;