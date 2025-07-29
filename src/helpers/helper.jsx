export function checkToken() {
    const token = sessionStorage.getItem('token');
    const user = JSON.parse(sessionStorage.getItem('user'));
    console.log(user);

    if (token && user) {
        if (user.role == 'admin') {
            return true;
        } else {
            return false;
        }
    } else {
        return false;
    }
}