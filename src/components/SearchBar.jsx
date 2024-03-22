import { useState, useEffect } from "react";
import { Col, Container, Form, InputGroup, Row } from "react-bootstrap";
import TodaysWeather from "./TodaysWeather";
import Forecast from "./Forecast";
import Spinner from "react-bootstrap/Spinner";

const apiKey = "dc3b0f9f10d947646d1f10be4bfd42c8";
const limit = 1;
const daysOfForecast = 3;

const SearchBar = function () {
  const [cityName, setCityName] = useState("");
  const [currentWeather, setCurrentWeather] = useState(null);
  const [forecastWeather, setForecastWeather] = useState(null);
  const [error, setError] = useState(false);

  const handleChange = (e) => {
    setCityName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const fetchCurrentWeather = async (lat, lon) => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`
        );
        if (response.ok) {
          const currentWeatherData = await response.json();
          setCurrentWeather(currentWeatherData);
          console.log("CURRENT WEATHER", currentWeatherData);
        } else {
          setError(true);
        }
      } catch (error) {
        console.log("Error fetching datas");

        setError(true);
      }
    };

    const fetchForecast = async (lat, lon) => {
      try {
        const res = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=metric&cnt=${daysOfForecast}&appid=${apiKey}`
        );
        if (res.ok) {
          const forecastWeatherData = await res.json();
          setForecastWeather(forecastWeatherData);
          console.log("FORECAST", forecastWeatherData);
        } else {
          setError(true);
        }
      } catch (error) {
        console.log("Error fetching datas");

        setError(true);
      }
    };

    try {
      const res = await fetch(
        `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=${limit}&appid=${apiKey}`
      );
      if (res.ok) {
        const data = await res.json();
        /*         console.log(data); */
        const { lat, lon } = data[0];
        /*     console.log(data[0].lat);
        console.log(data[0].lon); */
        fetchCurrentWeather(lat, lon);
        fetchForecast(lat, lon);
      } else {
        setError(true);
      }
    } catch (error) {
      console.log("Error fetching datas");
      setError(true);
    }
  };

  return (
    <>
      <Container id="contentContainer" className="container-fluid d-flex flex-column justify-content-center">
        <Row>
          <Col>
            <h1 className="text-white">what's the weather like? </h1>
          </Col>
        </Row>

        <Row id="searchBarContainer">
          <Col className="col-8 rounded-5 py-4 px-4 mx-auto">
            <Form onSubmit={handleSubmit}>
              <InputGroup className="p-0 ">
                <Form.Control
                  placeholder="Type your city here"
                  value={cityName}
                  onChange={handleChange}
                  className="rounded-5"
                />
              </InputGroup>
            </Form>
          </Col>
        </Row>

        <Row className="gap-2 justify-content-center">
          <Col id="currentContainer" className="col-10 col-md-5 col-lg-4">
            {currentWeather && <TodaysWeather todaysData={currentWeather} />}
          </Col>
          <Col id="currentContainer" className="col-10 col-md-5 col-lg-4">
            {forecastWeather && <Forecast forecastData={forecastWeather} />}
          </Col>
        </Row>
      </Container>

      {!currentWeather ||
        (!forecastWeather && (
          <div className="text-center mt-3">
            <Spinner animation="border" variant="secondary" />
          </div>
        ))}
    </>
  );
};
export default SearchBar;
