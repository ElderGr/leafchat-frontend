export function TimestampToDate(unix){
    try{
        let date = new Date(unix);

        let day = date.getDate();
        let month = date.getMonth();
        let year = date.getFullYear();
        return `${day}/${month}/${year}`;
    }catch(err){
        return err
    }
}