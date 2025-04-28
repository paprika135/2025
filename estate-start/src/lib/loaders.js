import { apiRequest } from "./apiRequest.js";

export const singlePageLoader = async ({ request,params }) => {

    const res = apiRequest("/posts/" + params.id );
    return ((await res).data);
};

export const listPageLoader = async ({request,params})=>{
    const query = request.url.split("?")[1];
    const url = query ? ("/posts?" + query) : ("/posts");
    const postPromise = apiRequest(url);
    return ({
        postResponse:postPromise
    });
};

export const profilePageLoader = async () =>{
    const postPromise = apiRequest("/users/profilePosts");
    const chatPromise = apiRequest("/chats");
    return ({
        postResponse:postPromise,
        chatResponse:chatPromise,
    });
};