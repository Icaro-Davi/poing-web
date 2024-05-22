export const CustomFilter =
    (list: string[], matchText: string) =>
        list.filter(text => text.match(new RegExp(`${matchText.replace(/{|}/, '')}`)));