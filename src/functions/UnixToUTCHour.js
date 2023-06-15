function UnixToUTCHour(unix){
    try{
        if (unix === undefined || unix === '') throw new Error('Invalid value');

        let utc = new Date(unix);
        let hours = ("0" + utc.getHours()).slice(-2);
        let minutes = ("0" + utc.getMinutes()).slice(-2);
        
        return `${hours}:${minutes}`;
    }catch(err){
        return err
    }
}

export default UnixToUTCHour;