export const formatChartData = (data) => {
    if (!data.t) return [];

    return data.t?.map((num, index) => {
        return {
            // Timestamp * 1000 --> tiemstamp in milliseconds
            x: num * 1000,
            y: Math.floor(data.c[index]),
            // y: data.c[index]
        };
    });
};

export const determineActiveBtn = (dateValue, value) => {
    return value === dateValue ? "btn-primary" : "btn-outline-primary";
};
