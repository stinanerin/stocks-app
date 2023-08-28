export const formatChartData = (data) => {
    console.log(data);
    return data.t.map((num, index) => {
        return {
            // Timestamp * 1000 --> tiemstamp in milliseconds
            x: num * 1000,
            y: data.c[index],
        };
    });
};
