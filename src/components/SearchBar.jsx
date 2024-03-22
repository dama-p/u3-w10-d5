import { useState, useEffect } from "react";
import { Col, Container, Form, InputGroup, Row } from "react-bootstrap";

const apiKey = "dc3b0f9f10d947646d1f10be4bfd42c8";
const limit = 1;
/* const cityName = "London"; */
/* const toGetCoordinatesUrl = `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&limit=${limit}&appid=${apiKey}`; */
/* const currentWeatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`*/

const TodaysWeather = function () {
  const [cityName, setCityName] = useState("");
  const [currentWeather, setCurrentWeather] = useState(null);
  const [error, setError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

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
          console.log(currentWeatherData);
        } else {
          setIsLoading(false);
          setError(true);
        }
      } catch (error) {
        setIsLoading(false);
        setError(true);
      
      }
    };



    try {
      const res = await fetch(`http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${apiKey}`);
      if (res.ok) {
        const data = await res.json();
        console.log(data);
        const { lat, lon } = data[0];
        console.log(data[0].lat);
        console.log(data[0].lon);
        fetchCurrentWeather(lat, lon);
     
      } else {
        setError(true);
      }
    } catch (error) {
      setError(true);
    }
  };

  return (
    <>
      <Container className="d-flex justify-content-center align-items-center">
        <Row>
          <Col className="d-flex justify-content-center flex-column align-items-center rounded-5 py-4 px-4">
            <Row className="mb-4">
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
            </Row>
          </Col>
        </Row>
      </Container>
    </>
  );
};
export default TodaysWeather;
