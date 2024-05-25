export const formatDateTime = (date) => {
    const newDate = new Date(date)
    const dateFormatOptions = { year: 'numeric', month: 'long', day: 'numeric' };
    const timeFormatOptions = { hour: 'numeric', minute: 'numeric', hour12: true };

    const formattedDate = new Intl.DateTimeFormat('en-US', dateFormatOptions).format(newDate);
    const formattedTime = new Intl.DateTimeFormat('en-US', timeFormatOptions).format(newDate);

    return [formattedDate, formattedTime];
};

export const checkExamStartedOrNot = (date, examDuration) => {
    const examDate = new Date(date)
    const currentDate = new Date()

    if (currentDate > examDate) {

        const totalTimePassed = ((currentDate - examDate) / 60000).toFixed(0)


        if (totalTimePassed > examDuration) {
            return { examStatus: "end", remainingExamDuration: 0 }
        }

        return { examStatus: "start", remainingExamDuration:  examDuration - totalTimePassed + 5}
    }

    return { examStatus: "not started", remainingExamDuration: 0 }
}