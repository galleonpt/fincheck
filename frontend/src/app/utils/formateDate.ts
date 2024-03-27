const formatDate = (date: Date) => {
    return Intl.DateTimeFormat('pt-br').format(date);
};

export default formatDate;
