import { BOT } from "../defaultBoTInfo";

const Pages = {
    home: {
        welcomeCard: {
            title: `Bem vindo, eu sou o ${BOT.name}!`,
            description: 'Sou um slime e também bot de administração, meu papel é deixar tudo mais fácil para todos, vamos nos divertir juntos ?',
            buttonBotInvitation: 'Me Invoque!'
        },
        botInfoCard: {
            title: 'Aprenda as minhas magias!',
            description: 'Eu sempre crio novas magias e posso lhe ensinar todas, e elas em algum momento serão de grande ajuda na sua aventura de liderar sua guild, então bora ser amigos!'
        },
        devBotCard: {
            title: 'Ainda estou em desenvolvimento',
            description: 'Por isso peço a ajuda de todos, me ajudem a virar um slime grandão :3 me convidem para o servidor e mandem o feedback do que estão achando *w *'
        }
    },
    help: {
        helpCard: {
            title: 'Precisa de ajuda?',
            description: 'Você pode entrar no nosso discord oficial, ou nos contatar pelo email: poing@gmail.com”.',
            discordButton: 'Entrar no meu servidor :3'
        }
    }
}

export default Pages;