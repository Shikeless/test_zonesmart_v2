export const load = localStorageKey => {
    const stringData = window.localStorage.getItem(localStorageKey);
    let data = null;
    try {
        data = JSON.parse(stringData);
    } catch (e) {
        data = null;
    }
    return data;
};

export const save = (localStorageKey, data) => {
    window.localStorage.setItem(localStorageKey, JSON.stringify(data));
};
