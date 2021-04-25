const formatDate = (dateString)=>{
    let dateInsec = Date.parse(dateString);
    let date = new Date(dateInsec);
    let month = ["JAN", "FEB", "MAR", "APR", "MAP", "JUN", "JUL", "AUG", "SEPT", "OCT", "NOV", "DEC"];
    return month[date.getMonth()] + " " + date.getDate();
}

export default formatDate;