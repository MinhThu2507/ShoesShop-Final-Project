export const ACCESS_TOKEN = 'accessToken'
export const USER_LOGIN = 'userLogin'
export const PROFILE = 'profile'
export const {saveStore, saveStoreJson, getStore, getStoreJson} = {
    // lưu dạng chuỗi
    saveStore: (name, stringValue) => {
        localStorage.setItem(name, stringValue)
    
    },
    // lưu dưới dạng Object nên convert sang Json
    saveStoreJson: (name, value) => {
        const convertValue = JSON.stringify(value)
        localStorage.setItem(name, convertValue)
        return value
    },
    getStore: (name) => {
        if(localStorage.getItem(name)) {
            return localStorage.getItem(name)
        }
        return null
    },
    getStoreJson: (name) => {
        if(localStorage.getItem(name)){
            return JSON.parse(localStorage.getItem(name))
        }
        return null
    }
    
}