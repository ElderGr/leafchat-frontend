//validar espaços vazios
export const isEmpty = (data) => {
	const conditions = [undefined, null, ""]
	
	if(isObject(data)){
		for(let property in data){
			if(conditions.includes(data[property])) return true
		}
		return false
	}
	if(isArray(data)) return data.length >= 1 ? false : true
	if(conditions.includes(data)) return true
	return false
}

export const isArray = (array) => (!!array) && (array.constructor === Array)

export const isObject = (object) => (!!object) && (object.constructor === Object)