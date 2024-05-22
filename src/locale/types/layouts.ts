type LocaleLayout = {
    public: {
        menu: {
            home: string;
            help: string;
            commands: string;
            login: string;
            optionsButton: {
                dashboard: string;
                exit: string;
            };
        };
        footer: {
            createdWith: string; // string variables %love%
            createdBy: string;
        };
    };
    commandCard: {
        description: string;
        howToUse: string;
        aliases: string;
        arguments: string;
        examples: string;
    };
    dashboardGuild: {
        buttonsArea: {
            home: string;
            logout: string;
        };
        navigationDashboardButtons: {
            Poing: string; // page title bot name
            commands: string;
            modules: string;
        };
    };
}

export default LocaleLayout;