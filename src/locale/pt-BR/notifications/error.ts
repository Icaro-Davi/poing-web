import { BOT } from "../../defaultBoTInfo";

const Error = {
    account: {
        logout: {
            title: 'Logout',
            description: 'Error ao tentar efetuar logout.'
        },
        getMe: {
            title: 'Buscar usuário',
            description: 'Não foi possível procurar o usuário.'
        }
    },
    guilds: {
        find: {
            title: 'Buscar guilds',
            description: 'Ocorreu algum erro ao tentar buscar as guilds, tente novamente mais tarde.'
        }
    },
    bot: {
        getSettings: {
            title: `Configurações do ${BOT.name}.`,
            description: `Falha ao buscar as configurações do ${BOT.name}.`
        },
        updateSettings: {
            title: 'Erro ლ(ಥ益ಥლ)',
            description: `Ocorreu um erro ao tentar atualizar as configurações do ${BOT.name}.`,
        }
    },
    modules: {
        updateModuleActivity: {
            title: 'Ativar modulo',
            description: 'Falha ao atualizar o status do modulo'
        },
        getWelcomeMemberSettings: {
            title: 'Modulo de boas vindas',
            description: 'Falha ao buscar as suas configurações do modulo.'
        },
        updateWelcomeMemberSettings: {
            title: 'Module de boas vindas',
            description: 'Falha ao atualizar as configurações do modulo.'
        }
    }
}

export default Error;