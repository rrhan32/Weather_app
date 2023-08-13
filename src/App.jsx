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
import {Button} from '@mui/material';
import Weather_Api from './api'

export default function App() {
  const [inputval,setInputVal]=useState()
  const [apiData, setApiData] = useState({
    name:null,
    lat: null ,
    lon : null,
    temperature:null,
    feels_like:null,
    weather_disc:null,
    humidity:null,
    wind_speed:null,
  });
  const [apival,setApiVal]=useState(null);
  const apiKey = '9c55db619848b94a2ce3899ea3190390';
   var today = new Date();
   var time = today.getHours() + ":" + today.getMinutes() ;

  useEffect(() => {
    // Function to fetch weather data
    const fetchWeatherData = async () => {
      try {
        if (!apival) return;
        const response = await fetch(
          `http://api.openweathermap.org/data/2.5/weather?q=${apival}&units=${"metric"}&APPID=9c55db619848b94a2ce3899ea3190390`
        );

        if (!response.ok) {
          alert("invalid entry");
          throw new Error('Failed to fetch weather data');
        }

        // Parse the JSON response
        const weather_Data = await response.json();
        console.log(weather_Data);
        const temp_api={
          name:weather_Data.name,
          lat: weather_Data.main.temp_min,
          lon: weather_Data.main.temp_max,
          temperature:weather_Data.main.temp,
          feels_like:weather_Data.main.feels_like,
          weather_disc:weather_Data.weather[0].description,
          humidity:weather_Data.main.feels_like,
          wind_speed:weather_Data.wind.speed,

        };
        console.log(temp_api);
        setApiData(temp_api);
        
      } catch (error) {
        console.error('Error fetching weather data:', error);
      }
    };
    fetchWeatherData(); // Call the function to fetch weather data
  },[apival]);
  // console.log(apiData);
  // console.log(weathersData)
  const handlechange=(event)=>{
      setInputVal(event.target.value);
      // console.log(event.target.value);
  };
  const handleclick=(e)=>{
    // console.log(e.input)
    setApiVal(inputval);
    console.log(apival);
  };
  

  // console.log(Weather_Api);
  return (
    <section className="vh-100" style={{
      backgroundImage: "url('https://images.unsplash.com/photo-1525220964737-6c299398493c?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=870&q=80')",
      backgroundSize: "cover",
      backgroundRepeat: "no-repeat",
      backgroundAttachment: "fixed", // Optional, adjusts the background scrolling behavior
    }}>
      <MDBContainer className="h-100" >
        <MDBRow className="justify-content-center align-items-center h-100">
          <MDBCol md="8" lg="6" xl="4">
            <MDBTypography tag="h3" className="mb-4 pb-2" style={{ fontFamily: "'Pacifico', cursive" }}>
              Unveil the Nature's Plans
            </MDBTypography>

            <MDBInputGroup className="mb-3">
              <input
                className="form-control rounded"
                type="text"
                placeholder="City , Country"
                onChange={handlechange}
              />
              <a href="#!" type="button">
                <Button
                  variant="text"
                  className="input-group-text border-0 fw-bold"
                  id="search-addon"
                  onClick={handleclick}
                >
                  Check!
                </Button>
                {/* <Button variant="contained">Contained</Button> */}
              </a>
            </MDBInputGroup>
            <MDBCard style={{ color: "#4B515D", borderRadius: "35px" }}>
            <MDBCardBody className="p-4">
                <div className="d-flex">
                  <MDBTypography tag="h6" className="flex-grow-1">
                    {apiData.name}
                  </MDBTypography>
                  <MDBTypography tag="h6">{time}</MDBTypography>
                </div>

                <div className="d-flex flex-column text-center mt-5 mb-4">
                  <MDBTypography
                    tag="h6"
                    className="display-4 mb-0 font-weight-bold"
                    style={{ color: "#1C2331" }}
                  >
                    {" "}
                    {apiData.temperature}℃{" "}
                  </MDBTypography>
                  <span className="small" style={{ color: "#868B94" }}>
                    {apiData.weather_disc}
                  </span>
                </div>

                <div className="d-flex align-items-center">
                  <div className="flex-grow-1" style={{fontSize: '1rem'}}>
                    <div>
                      <MDBIcon
                        fas
                        icon="wind fa-fw"
                        style={{ color: "#868B94" }}
                      />{" "}
                      <span className="ms-1"> {apiData.wind_speed} metre/sec</span>
                    </div>
                    <div>
                      <MDBIcon
                        fas
                        icon="tint fa-fw"
                        style={{ color: "#868B94" }}
                      />{" "}
                      <span className="ms-1"> {apiData.humidity} % </span>
                    </div>
                    <div>
                      <MDBIcon
                        fas
                        icon="sun fa-fw"
                        style={{ color: "#868B94" }}
                      />{" "}
                      <span className="ms-1"> {apiData.lon} ℃ </span>
                      <span className="ms-1"> {apiData.lat} ℃ </span>
                    </div>
                  </div>
                  <div>
                    <img
                      src={apiData.weather_disc==="overcast clouds" ? "data:image/png;base64,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"
                            : apiData.weather_disc==="clear sky" ? "data:image/png;base64,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"
                            : "data:image/png;base64,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"
                          }
                      width="100px"
                    />
                    
                  </div>
                </div>
              </MDBCardBody>
              </MDBCard>
          </MDBCol>
        </MDBRow>
      </MDBContainer>
    </section>
  );
}