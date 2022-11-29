import axios from "axios";
import api from "./api";


const create = (post) => {
    return api.post("http://localhost:8080/api/posts/create", post);
};

const getAll = () => {
    return api.get("http://localhost:8080/api/posts")
}

// KOLLA DENNA SÅ DEN SKICKAR DATA 
const remove = (userId, id) => {
    return api.delete("http://localhost:8080/api/posts/delete/" + id, {data : { userId : userId }})
}
    
const PostService = {
    create,
    getAll,
    remove
}

export default PostService;