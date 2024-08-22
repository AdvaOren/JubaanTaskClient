export const DateConverter = (date) => {
    // Convert date strings from DD/MM/YYYY to YYYY-MM-DD to make them sortable
    const [dayA, monthA, yearA] = date.split('/');
    const dateA = new Date(`${yearA}-${monthA}-${dayA}`);
    console.log("dateA: ", dateA);
    return dateA;
}

export function convertDateFormat(dateString) {
    const newData = dateString.replaceAll('/', '-')
    const [day, month, year] = newData.split("-");
    return `${year}-${month}-${day}`;
}

export function isValidDateFormat(dateStr) {
    // Regular expression to match the format "YYYY-MM-DD"
    const regex = /^\d{4}-\d{2}-\d{2}$/;
    return regex.test(dateStr);
}

