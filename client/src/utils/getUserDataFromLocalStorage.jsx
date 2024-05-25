export const getUserDataFromLocalStorage = () => {
    const user = localStorage.getItem('userInfo');
    if (user) {
        return { user: JSON.parse(user) }
    }
    return null;
}