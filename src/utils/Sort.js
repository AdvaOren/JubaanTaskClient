import { DateConverter } from "./DateConverter";

export const Sort = (criteria, sortedList) => {
    let sortedListCopy = [...sortedList];
    if (criteria === 'date') {
        sortedListCopy.sort((a, b) => {
            const dateA = DateConverter(a.dueDate);
            const dateB = DateConverter(b.dueDate);
            return dateA - dateB; // Compare the dates
        });
    } else if (criteria === 'title') {
        sortedListCopy.sort((a, b) => a.title.localeCompare(b.title));
    }
    return sortedListCopy;
}