import { authGetStorage } from "@/app/context/auth/auth.storage";

export async function accessTokenInterceptor(config: any){
    let newHeader = {
        ...config.headers
    }

    const session = authGetStorage()

    if (session) {
        newHeader = {
            ...newHeader,
            Authorization: `Bearer ${session}`
        }

        config.headers = newHeader || {}
        return config

    } else {
        return config
    }
}


export async function multipartDataInterceptor(config: any){
    let newHeader = {
        ...config.headers,
        headers: {
            "Content-Type": "multipart/form-data"
        }
    }

    config.headers = newHeader
    return config
}
