// for local // export const host = "https://http://localhost:5000/";
// for hosted 
export const host = "https://chat-app-server-gw99.onrender.com";
export const registerRoute = `${host}/api/auth/register`;
export const loginRoute = `${host}/api/auth/login`;
export const setAvatarRoute = `${host}/api/auth/setAvatar`;
export const allUsersRoute = `${host}/api/auth/allusers`;
export const logoutRoute = `${host}/api/auth/logout`;
export const sendMessageRoute = `${host}/api/messages/addmsg`;
export const recieveMessageRoute = `${host}/api/messages/getmsg`;