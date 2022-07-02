const pt_BR = {
    navbar: {
        mainMenu: {
            home: 'Inicio',
            help: 'Ajuda',
            commands: 'Comandos',
            login: 'Login'
        }
    },
    commands: [
        {
            name: 'anonymous-direct-message',
            category: 'Admin',
            description: 'Envia uma mensagem anonimamente para um membro do server através de mim.',
            usage: '{@bot.name}anonymous-direct-message **```[@member|memberID]*```** **```[message]*```**',
            aliases: ['adm'],
            args: [
                '**```[member]*```** A referência de algum membro do servidor, pode ser **```[menção | membroId].```**',
            ],
            examples: [
                '**```{@bot.prefix}anonymous-direct-message {@bot.name} Oi você quer pular pelo meu servidor?```** Envia uma mensagem privada para {@bot.name}.',
            ]
        }
    ],
    pages: {
        home: {
            welcomeCard: {
                title: 'Bem vindo, eu sou o Poing!',
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
                description: 'Você pode entrar no nosso discord oficial, ou nos contatar pelo email: “emailemail@email.com”.',
                discordButton: 'Entrar no meu servidor :3'
            }
        }
    }
}

export default pt_BR;