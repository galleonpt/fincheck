const formatDate = (date: Date) => {
    return Intl.DateTimeFormat('pt').format(date);
};

export default formatDate;
