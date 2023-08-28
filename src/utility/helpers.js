export const formatChartData = (data) => {
    return data.t.map((num, index) => {
        return {
            // Timestamp * 1000 --> tiemstamp in milliseconds
            x: num * 1000,
            y: Math.floor(data.c[index]),
            // y: data.c[index]
        };
    });
};
