export const calorie_intake = (data,borderColor = "#D60A51") =>{
   const caloriedata = {
    labels: ["Morning", "", "", "Noon", "", "Evening", ""],
    datasets: [
      {
        data: data,
        backgroundColor: "transparent",
        borderColor,
        pointBorderColor: "transparent",
        pointBorderWidth: 4,
      },
    ],
  };
  return caloriedata
}
  export const  data_options = {
    plugins: {
      legend: true,
      scales: {
        x: {
          grid: {
            display: false,
          },
        },
        y: {
          min: 1,
          max: 100,
          tricks: {
            stepSize: 10,
          },
        },
      },
    },
  };
 