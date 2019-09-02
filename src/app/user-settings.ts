import { SessionLoginInformation } from './interfaces';
export class UserSettings implements SessionLoginInformation {
    LOCAL_API = 'coolwipApi';
    LOCAL_TOKEN = 'coolwipToken';
    LOCAL_USERS = 'coolwipUsers';

    constructor(githubApi?: string, githubToken?: string, githubUsers?: string) {
        if(githubApi) {
            localStorage.setItem(this.LOCAL_API, githubApi);
        }
        if(githubToken) {
            localStorage.setItem(this.LOCAL_TOKEN, githubToken);
        }
        if(githubUsers) {
            localStorage.setItem(this.LOCAL_USERS, githubUsers);
        }
    }

    set githubApi(api: string) {
        localStorage.setItem(this.LOCAL_API, api)
    }

    set githubToken(token: string) {
        localStorage.setItem(this.LOCAL_TOKEN, token)
    }

    set usersList(users: string) {
        localStorage.setItem(this.LOCAL_USERS, users)
    }

    get githubApi(): string {
        return localStorage.getItem(this.LOCAL_API)
    }

    get githubToken(): string {
        return localStorage.getItem(this.LOCAL_TOKEN)
    }

    get usersList(): string {
        return localStorage.getItem(this.LOCAL_USERS)
    }

    getTokenizedListOfUsers(): string[] {
        return this.usersList.split(',')
    }
}
