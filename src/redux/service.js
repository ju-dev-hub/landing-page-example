
export default class Service {
    async post(param, path) {
        try {
            const request = {
                method: 'POST',
                body: JSON.stringify(param),
                headers: new Headers({
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                    'Authorization': param && param.key ? param.key : null
                })
            }
            const res = await fetch(path, request)
            return res.json()
        }
        catch (err) {
            return Promise.reject(err)
        }
    }

    async get(param, path) {
        try {
            const request = {
                method: 'POST',
                body: JSON.stringify(param),
                headers: new Headers({
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                })
            }
            const res = await fetch(path, request)
            return res.json()
        }
        catch (err) {
            return Promise.reject(err)
        }
    }
}