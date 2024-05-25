export const formatDateTime = (date) => {

    if (!date) return []

    const newDate = new Date(date)
    const dateFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    const timeFormatOptions = { hour: 'numeric', minute: 'numeric', hour12: true };

    const formattedDate = new Intl.DateTimeFormat('en-US', dateFormatOptions).format(newDate);
    const formattedTime = new Intl.DateTimeFormat('en-US', timeFormatOptions).format(newDate);

    return [formattedDate, formattedTime];

};
