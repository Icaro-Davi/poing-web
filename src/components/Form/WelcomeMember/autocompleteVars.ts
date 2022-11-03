const autocompleteVars = {
    welcomeModuleVars: {
        name: 'welcomeModuleVars',
        trigger: new RegExp('({$|{[\\w\\.@]+?)$', 'g'),
        vars: {
            botPrefix: '{bot.prefix}',
            botHexColor: '{bot.hexColor}',
            botName: '{bot.name}',
            botMention: '{bot.@mention}',
            guildName: '{guild.name}',
            guildPicture: '{guild.picture}',
            memberUsername: '{member.username}',
            memberTagNumber: '{member.tagNumber}',
            memberPicture: '{member.picture}',
            memberMention: '{member.mention}',
            memberJoinedAt: '{member.joinedAt}',
        },
        listVarsValues(options?: { withoutPictures?: boolean }) {
            const list = Object.keys(this.vars).map(key => this.vars[key as keyof typeof this.vars]);
            if (options?.withoutPictures) {
                return list.filter(item => !item.match(new RegExp('picture')));
            }
            return list;
        }
    }
}

export default autocompleteVars;