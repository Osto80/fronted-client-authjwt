import axios from "axios";
import api from "./api";


const create = (post) => {
    return api.post("http://localhost:8080/api/posts/create", post);
};

const getAll = () => {
    return axios.get("http://localhost:8080/api/posts")
}
    
const PostService = {
    create,
    getAll
}

export default PostService;