import axios from "axios";
import api from "./api";


const create = (post) => {
    return api.post("http://localhost:8080/api/posts/create", post);
};

const getAll = () => {
    return api.get("http://localhost:8080/api/posts")
}

const remove = (id) => {
    return api.delete("http://localhost:8080/api/posts/delete/" + id)
}

const update = (updatedContent, id) => {
    return api.put("http://localhost:8080/api/posts/update/" + id, updatedContent)
}
    
const PostService = {
    create,
    getAll,
    remove
}

export default PostService;