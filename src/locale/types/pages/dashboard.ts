export type LocaleModulesPage = {
    label: {
        active: string;
        inactive: string;
    };
    head: {
        title: string;
    };
    welcomeMember: {
        title: string;
    };
    memberLeave: {
        title: string;
    };
    roleByInteraction: {
        title: string;
    };
};

export type LocalePoingPage = {
    head: {
        title: string;
    }
}

type LocaleDashboardPage = {
    modules: LocaleModulesPage;
    poing: LocalePoingPage;
}

export default LocaleDashboardPage;