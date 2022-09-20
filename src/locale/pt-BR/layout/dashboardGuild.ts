import { BOT } from "../../defaultBoTInfo";

const dashboard = {
    buttonsArea: {
        home: 'Início',
        logout: 'Sair'
    },
    navigationDashboardButtons: {
        [BOT.name]: BOT.name,
        commands: 'Comandos',
        modules: 'Módulos'
    }
}

export default dashboard;