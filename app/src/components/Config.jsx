export const Config = {
    localhost: 'http://localhost:3001',
    authHeaders: () => {
        return {
            headers: {
                'authorization': localStorage.getItem('token')
            }
        }
    },
    multiHeaders: () => { 
        return {
            headers: {
                'Content-Type': 'multipart/form-data',
                'Authorization': localStorage.getItem('token')
            }
        }
    }
}