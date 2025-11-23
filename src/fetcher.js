import axios from "axios"
import { BASE_URL, KEY } from "./constants";

axios.defaults.baseURL = BASE_URL;
axios.defaults.headers.common['Authorization'] = KEY;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

export default axios
