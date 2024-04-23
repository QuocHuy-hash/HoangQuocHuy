
    const token = localStorage.getItem("token");
    const user = localStorage.getItem("user");
    const userData = user ? JSON.parse(user) : null;
    
    
export const config = {
    headers: {
        'Content-Type': 'application/json',
        'athorization': `${token}`,
        'x-client-id': `${userData ? userData.id : ""}`
    }
};
export const info = userData;