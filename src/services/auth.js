export const usuarioAutenticado = () => localStorage.getItem("usuario-leafchat") !== null;

export const parseJwt = () =>{
    var base64Url = localStorage.getItem("usuario-leafchat").split('.')[1];
    var base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    return JSON.parse(window.atob(base64));
}