import i18n from '../locales'

export function generateTitle(groupName,title) {
    const hasKey = i18n.global.t(groupName + '.' + title);
    const translatedTitle = i18n.global.t(groupName + '.' + title);
    if(hasKey) {
        return translatedTitle;
    }
    return title;
}