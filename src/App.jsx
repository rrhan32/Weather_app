import {useState,useEffect} from "react";
import {
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBContainer,
  MDBIcon,
  MDBInputGroup,
  MDBRadio,
  MDBRow,
  MDBTypography,
} from "mdb-react-ui-kit";
import Weather_Api from './api'

export default function App() {
  const [inputval,setInputVal]=useState(null)
  const [weathersData, setWeathersData] = useState(null);
  const apiKey = '9c55db619848b94a2ce3899ea3190390';
  const city = 'New York'; // Change this to the city you're interested in
  useEffect(() => {
    // Function to fetch weather data
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(
          `http://api.openweathermap.org/data/2.5/weather?q=${inputval},uk&APPID=9c55db619848b94a2ce3899ea3190390`
        );

        if (!response.ok) {
          throw new Error('Failed to fetch weather data');
        }

        // Parse the JSON response
        const weather_Data = await response.json();
        console.log(weather_Data);
        setWeathersData(weather_Data);
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };
    fetchWeatherData(); // Call the function to fetch weather data
  },[inputval]);
  console.log(weathersData)
  const handlechange=(event)=>{
    setInputVal(event.target.value);
    // console.log(event.target);
  }
  const handleclick=()=>{
    // console.log(inputval)
  }
  

  // console.log(Weather_Api);
  return (
    <section className="vh-100">
      <MDBContainer className="h-100 py-5">
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol md="8" lg="6" xl="4">
            <MDBTypography tag="h3" className="mb-4 pb-2 fw-normal">
              Check the weather forecast
            </MDBTypography>

            <MDBInputGroup className="mb-3">
              <input
                className="form-control rounded"
                type="text"
                placeholder="City"
                onChange={handlechange}
              />
              <a href="#!" type="button">
                <span
                  className="input-group-text border-0 fw-bold"
                  id="search-addon"
                  onClick={handleclick}
                >
                  Check!
                </span>
              </a>
            </MDBInputGroup>

            <div className="mb-4 p-2">
              <MDBRadio
                inline
                name="flexRadioDefault"
                id="flexRadioDefault1"
                label="Celcius"
                defaultChecked
              />
              <MDBRadio
                inline
                name="flexRadioDefault"
                id="flexRadioDefault2"
                label="Farenheit"
              />
            </div>

            <MDBCard className="shadow-0 border">
              <MDBCardBody className="p-4">
                <MDBTypography tag="h4" className="mb-1 sfw-normal">New York, US</MDBTypography>
                <p className="mb-2">
                  Current temperature: <strong>54.2°C</strong>
                </p>
                <p>
                  Feels like: <strong>4.37°C</strong>
                </p>
                <p>
                  Max: <strong>6.11°C</strong>, Min: <strong>3.89°C</strong>
                </p>

                <div className="d-flex flex-row align-items-center">
                  <p className="mb-0 me-4">Scattered Clouds</p>
                  <MDBIcon fas icon="cloud" size="3x" style={{color: '#eee'}} />
                </div>
              </MDBCardBody>
            </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}