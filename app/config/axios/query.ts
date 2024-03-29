type IMountQueryParamsParams = {
    params: {
        [key: string]: any;
    };
}

export function MountQueryParamsParams({
    params
}: IMountQueryParamsParams){
    let paramString = ``

    const keys = Object.keys(params);

    keys.forEach(key => {
        const param = params[key]
        if(param){
            if(paramString.length === 0){
                paramString += `${key}=${param.toString()}`
            }else{
                paramString += `&${key}=${param.toString()}`
            }
        }
    })

    return paramString
}