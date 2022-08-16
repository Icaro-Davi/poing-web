import DiscordRequestor from "../requestor";

class AuthService {
    static basePath = '/auth';
    static async logout() {
        try {
            await DiscordRequestor.get(`${this.basePath}/logout`);
        } catch (error) {
            throw error;
        }
    }
}

export default AuthService;