export const GenerateSchedules = (from, to, daysToInclude) => {
    const startDate = new Date(from);
    const endDate = new Date(to);
    const filteredDates = [];
    while (startDate <= endDate) {
        const dayOfWeek = startDate.toLocaleString('en-US', { weekday: 'long' });
        if (daysToInclude.includes(dayOfWeek)) {
            filteredDates.push(startDate.toISOString().split('T')[0]);
        }
        startDate.setDate(startDate.getDate() + 1);
    }
    return filteredDates;
};