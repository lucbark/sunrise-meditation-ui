import axios from 'axios'

export const USER_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUser'
export const USER_DISPLAY_NAME_SESSION_ATTRIBUTE_NAME = 'authenticatedUserDisplayName'
export const USER_ID_SESSION_ATTRIBUTE_NAME = 'authenticatedUserId'
export const JWT_TOKEN = 'authorization'

class AuthenticationService {    

    executeAuthenticationService(username, password) {
        return axios.post(`http://localhost:8080/authenticate`, {
            username,
            password
        })
    }    

    registerSuccessfulLogin(username, token) {
        sessionStorage.setItem(USER_NAME_SESSION_ATTRIBUTE_NAME, username)
        console.log("jwtToken inside successful login : ", token)
        sessionStorage.setItem(JWT_TOKEN, token)
        this.setupAxiosInterceptors(this.createJWTToken(token))
    }

    createJWTToken(token) {
        return 'Bearer ' + token
    }

    setupAxiosInterceptors(token) {

        axios.interceptors.request.use(
            (config) => {
                if (this.isUserLoggedIn()) {
                    config.headers.authorization = token
                }
                return config
            }
        )
    }

    logout() {
        sessionStorage.removeItem(USER_NAME_SESSION_ATTRIBUTE_NAME);
        sessionStorage.removeItem(USER_ID_SESSION_ATTRIBUTE_NAME);
        sessionStorage.removeItem(JWT_TOKEN);
    }

    isUserLoggedIn() {
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
        if (user === null) return false
        return true
    }

    

    getLoggedInUserName() {
        let user = sessionStorage.getItem(USER_NAME_SESSION_ATTRIBUTE_NAME)
        if (user === null) return ''
        return user
    }

    persistLoggedInUserId(userId) {
        sessionStorage.setItem(USER_ID_SESSION_ATTRIBUTE_NAME, userId)
    }

    getLoggedInUserId() {
        let userId = sessionStorage.getItem(USER_ID_SESSION_ATTRIBUTE_NAME)
        return userId
    }

    getJwtTokenFromSession() {
        return sessionStorage.getItem(JWT_TOKEN)
    }
}

export default new AuthenticationService()