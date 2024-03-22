/* const icon = wInfo.weather[0].icon; // For instance "09d"
<Image source={{ uri: ``http://openweathermap.org/img/w/${icon}.png`` }} /> */

import { Col, Container, Form, InputGroup, Row } from "react-bootstrap";

const TodaysWeather = function (props) {
  console.log("TODAYS DATA", props.todaysData);
  const icon = props.todaysData.weather[0].icon;

  const sunriseInUnix = props.todaysData.sys.sunrise;
  const convertedSunrise = new Date(sunriseInUnix * 1000);
  const sunriseTime = convertedSunrise.toString().split(" ").splice(4, 1).join(" ");
  console.log(sunriseTime);

  const sunsetInUnix = props.todaysData.sys.sunset;
  const convertedSunset = new Date(sunsetInUnix * 1000);
  const sunsetTime = convertedSunset.toString().split(" ").splice(4, 1).join(" ");
  console.log(sunsetTime);

  return (
    <>
      <p>Today's weather in {props.todaysData.name}</p>
      <Row>
        <Col>
          <Row className="d-flex flex-column">
            <Col>
              <img src={`http://openweathermap.org/img/w/${icon}.png`} style={{ width: "100px" }} />
            </Col>
            <Col>
              {" "}
              <p>{props.todaysData.weather[0].main}</p>
            </Col>
          </Row>
        </Col>

        <Col>
          <p>Temperature: {props.todaysData.main.temp}°C</p>
          <p>
            Min. {props.todaysData.main.temp_min}°C - Max. {props.todaysData.main.temp_max}°C
          </p>
          <p>Wind Speed: {props.todaysData.wind.speed}</p>
        </Col>
      </Row>
      <Row>
        <Col>
          {" "}
          <p>You can expect {props.todaysData.weather[0].description}</p>
        </Col>
      </Row>
      <Row>
        <Col>
          {" "}
          <p>Sunrise at {sunriseTime}</p>
        </Col>
        <Col>
          {" "}
          <p>Sunset at {sunsetTime}</p>
        </Col>
      </Row>
    </>
  );
};

export default TodaysWeather;
