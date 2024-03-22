import { Col, Container, Form, InputGroup, Row } from "react-bootstrap";

const TodaysWeather = function (props) {
  /*   console.log("TODAYS DATA", props.todaysData); */
  const icon = props.todaysData.weather[0].icon;

  const sunriseInUnix = props.todaysData.sys.sunrise;
  const convertedSunrise = new Date(sunriseInUnix * 1000);
  const sunriseTime = convertedSunrise.toString().split(" ").splice(4, 1).join(" ");
  /*   console.log(sunriseTime); */

  const sunsetInUnix = props.todaysData.sys.sunset;
  const convertedSunset = new Date(sunsetInUnix * 1000);
  const sunsetTime = convertedSunset.toString().split(" ").splice(4, 1).join(" ");
  /*   console.log(sunsetTime); */

  return (
    <>


      <p className="fs-5 mt-4">Today's weather in</p>
      <p className="sectionTitle">{props.todaysData.name}</p>

      <Row className="d-flex flex-column">
        <Col>
          <img src={`http://openweathermap.org/img/w/${icon}.png`} style={{ width: "100px" }} />
        </Col>
        <Col>
          <p className="fs-2">{props.todaysData.weather[0].main}</p>
        </Col>

        <Col>
          <p className="degrees">{props.todaysData.main.temp}°C</p>
          <p>
            <strong>Min.</strong> {props.todaysData.main.temp_min}°C - <strong>Max.</strong>{" "}
            {props.todaysData.main.temp_max}°C
          </p>
        </Col>
        <Col>
          <p>You can expect {props.todaysData.weather[0].description}</p>
        </Col>
        <Col>
          {" "}
          <p>
            <strong>Sunrise:</strong> {sunriseTime} - <strong>Sunset:</strong> {sunsetTime}
          </p>
        </Col>

        <Col>
          <p>
            <strong>Wind Speed</strong> {props.todaysData.wind.speed} meter/sec
          </p>
        </Col>
      </Row>
    </>
  );
};

export default TodaysWeather;
