import LocaleWarningNotification from "../../types/notifications.ts/warning";

const warnings: LocaleWarningNotification = {
    modules: {
        welcomeOrLeaveMemberModuleTestMessage: {
            title: 'Testar Mensagem',
            description: 'Não foi possível testar a mensagem, pois há erros no formulário, corrija e tente novamente!.'
        },
        roleByInteraction: {
            invalidMaxValueAndOptionsLength: {
                title: "Adicione mais opções",
                description: 'Você adicionou o valor {%value1%} no máximo de escolhas e tem apenas {%value2%} opções adicionadas. Adicione mais {%value3%} opções!' // variables {%value1%} {%value2%} {%value3%}
            }
        }
    }
}

export default warnings;