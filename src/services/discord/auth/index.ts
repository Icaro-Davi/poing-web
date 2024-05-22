import DiscordRequestor from "../requestor";

class AuthService {
    static basePath = '/auth';
    static async logout() {
        try {
            await DiscordRequestor.get(`${this.basePath}/logout`);
            await fetch('/api/auth/logout');
        } catch (error) {
            throw error;
        }
    }
    static async status() {
        try {
            await DiscordRequestor.get(`${this.basePath}/status`);
            return true;
        } catch (error) {
            throw error;
        }
    }
}

export default AuthService;