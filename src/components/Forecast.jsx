import { Col, Container, Form, InputGroup, Row } from "react-bootstrap";

const Forecast = function (props) {
  /*   console.log("FUTURE DATA", props.forecastData); */

  const icon = props.forecastData.list[0].weather[0].icon;

  const sunriseInUnix = props.forecastData.city.sunrise;
  const convertedSunrise = new Date(sunriseInUnix * 1000);
  const sunriseTime = convertedSunrise.toString().split(" ").splice(4, 1).join(" ");
  /*   console.log(sunriseTime); */

  const sunsetInUnix = props.forecastData.city.sunset;
  const convertedSunset = new Date(sunsetInUnix * 1000);
  const sunsetTime = convertedSunset.toString().split(" ").splice(4, 1).join(" ");
  /*   console.log(sunsetTime); */

  return (
    <>
      <p className="fs-5 mt-4">Tomorrow's weather in</p>
      <p className="sectionTitle">{props.forecastData.city.name}</p>

     
          <Row className="d-flex flex-column">
            <Col>
              <img src={`http://openweathermap.org/img/w/${icon}.png`} style={{ width: "100px" }} />
            </Col>
            <Col>
              <p className="fs-2">{props.forecastData.list[0].weather[0].main}</p>
            </Col>

            <Col>
              <p className="degrees">{props.forecastData.list[0].main.temp}°C</p>
              <p>
                <strong>Min.</strong> {props.forecastData.list[0].main.temp_min}°C - <strong>Max.</strong>{" "}
                {props.forecastData.list[0].main.temp_max}°C
              </p>
            </Col>
            <Col>
              <p>You can expect {props.forecastData.list[0].weather[0].description}</p>
            </Col>
            <Col>
              {" "}
              <p>
                <strong>Sunrise:</strong> {sunriseTime} - <strong>Sunset:</strong> {sunsetTime}
              </p>
            </Col>

            <Col>
              <p>
                <strong>Wind Speed</strong> {props.forecastData.list[1].wind.speed} meter/sec
              </p>
            </Col>
          </Row>
   
    </>
  );
};

export default Forecast;
