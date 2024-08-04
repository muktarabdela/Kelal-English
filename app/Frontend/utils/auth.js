// create a function to check if the user is authenticated
export const isAuthenticated = () => {
    // check if the user is authenticated
    // get token from local storage
    const token = localStorage.getItem("token");
    console.log(token)
    if (token) {
        return true
    }
    else {
        return false
    }
}