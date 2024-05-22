type LocaleRootPage = {
    home: {
        head: {
            title: string;
            description: string;
            keywords: string;
        };
        welcomeCard: {
            title: string;
            description: string;
            buttonBotInvitation: string;
        };
        botInfoCard: {
            title: string;
            description: string;
        };
        devBotCard: {
            title: string;
            description: string;
        };
    };
    help: {
        head: {
            title: string;
            description: string;
        };
        helpCard: {
            title: string;
            description: string;
            discordButton: string;
        };
    };
    commands: {
        head: {
            title: string;
            description: string;
        };
    };
};

export default LocaleRootPage;