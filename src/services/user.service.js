import api from "./api";

const getPublicContent = () => {
    return api.get("/test/all");
}

const getUserBoard = () => {
    return api.get("/test/user")
}

const UserService = {
    getPublicContent,
    getUserBoard
}

export default UserService;