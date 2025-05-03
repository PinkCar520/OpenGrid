import i18n from '../locales'

export function generateTitle(groupName,title,tab) {
    console.log('groupName', groupName);
    console.log('title', title);
    console.log('tab', tab);
    const hasKey = i18n.global.t(groupName + '.' + title);
    const translatedTitle = i18n.global.t(groupName + '.' + title);
    if(hasKey) {
        return translatedTitle;
    }
    return title;
}