import type { Post, Todo, Album, Photos,Comments } from "../types/dashboard";
import type { User } from "../types/user";
import axios from "axios";
const dashboardApi = {
  getPost: () =>
    axios.get<Post[]>("https://jsonplaceholder.typicode.com/posts"),
  getTodos: () =>
    axios.get<Todo[]>("https://jsonplaceholder.typicode.com/todos"),
  getAlbum: () =>
    axios.get<Album[]>("https://jsonplaceholder.typicode.com/albums"),
  getUsers: () =>
    axios.get<User[]>("https://jsonplaceholder.typicode.com/users"),
  getPhotos: () =>
    axios.get<Photos[]>("https://jsonplaceholder.typicode.com/photos"),
  getComments: () =>
    axios.get<Comments[]>("https://jsonplaceholder.typicode.com/comments"),
};

export default dashboardApi;
