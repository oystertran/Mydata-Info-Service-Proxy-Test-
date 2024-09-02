const utils = () => {

    const dateTimeZone = (dateString) => {
        let date = new Date(dateString);
        date.setHours(date.getHours() + 8);

        return date;
    }

    const file = () => {
        

    }

    return {
        dateTimeZone,
        file
    };
}

module.exports = utils;