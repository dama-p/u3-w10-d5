const TodaysWeather = function (props) {
  console.log("DATA", props.todaysData.main.temp);
  return <p>Todays data:</p>;
};

export default TodaysWeather;
