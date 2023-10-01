import './App.css';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import { TextField } from '@mui/material'
import { CardContent, Box } from '@mui/material';
import Typography from '@mui/joy/Typography';
import AspectRatio from '@mui/joy/AspectRatio';
import Link from '@mui/joy/Link';
import Chip from '@mui/joy/Chip';
import { useEffect, useState } from "react";
import axios from "axios";


function App() {
  const apiKey = "f56f24967aaf51182d1d4df628297c6d"
  const [inputCity, setInputCity] = useState("")
  const [data, setData] = useState({})


  const getWetherDetails = (cityName) => {
    if (!cityName) return
    const apiURL = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&appid=" + apiKey
    axios.get(apiURL).then((res) => {
      console.log("response", res.data)
      setData(res.data)
    }).catch((err) => {
      console.log("err", err)
    })
  }

  const handleChangeInput = (e) => {
    console.log("value", e.target.value)
    setInputCity(e.target.value)
  }

  const handleSearch = () => {
    getWetherDetails(inputCity)
  }

  return (
    <div className="App">
      <h1>Weather App</h1>
      <TextField id="outlined-basic" margin="normal" label="City" variant="outlined" 
                 value={inputCity}
                 onChange={handleChangeInput} />

      <br></br>
      <Button variant="contained" sx={{ m: 1 }} color="success" size="large" onClick={handleSearch} >Search Your City</Button>
      <Card />

      <Card variant="outlined" orientation="horizontal" sx={{ width: 420, '&:hover': { boxShadow: 'md', borderColor: 'neutral.outlinedHoverBorder' }, }}>

        <AspectRatio ratio="1" sx={{ width: 400 }}>
          <img src="https://images.unsplash.com/photo-1542773998-9325f0a098d7?auto=format&fit=crop&w=320"
            srcSet="https://images.unsplash.com/photo-1507833423370-a126b89d394b?auto=format&fit=crop&w=90&dpr=2 2x"
            loading="lazy" alt="" />
        </AspectRatio>

        <CardContent>

          <Typography level="title-lg" id="card-description">
          <h1>{data?.name}</h1>
          </Typography>

          <Typography level="body-sm" aria-describedby="card-description" mb={1}>
            <p>Current Temp : {((data?.main?.temp) - 273.15).toFixed(2)}°C ||| Feels like: {( (data?.main?.feels_like)- 273.15).toFixed(2)}°C</p>
            <p></p>
            <p>Humidity: {( (data?.main?.humidity)).toFixed(0)} ||| Pressure: {( (data?.main?.pressure)).toFixed(0)}</p>
            <p></p>
            <p>temp_max: {( (data?.main?.temp_max)- 273.15).toFixed(2)}°C ||| temp_min: {( (data?.main?.temp_min)- 273.15).toFixed(2)}°C</p>
            <p></p>
          </Typography>

          <Chip variant="outlined" color="primary" size="sm" sx={{ pointerEvents: 'none' }} >
           Cold weather all day long
          </Chip>

        </CardContent>
      </Card>

    </div>
  );
}

export default App;
