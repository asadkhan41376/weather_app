
"use client"
import { Box, Button, Card, CardContent, CardMedia, Grid, Stack, TextField, Typography, useMediaQuery } from '@mui/material'
import axios from 'axios'
import React, { useEffect, useState } from 'react'
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AirIcon from '@mui/icons-material/Air';
import BloodtypeIcon from '@mui/icons-material/Bloodtype';
import SearchIcon from '@mui/icons-material/Search';
import Link from 'next/link';


const WhetherApp = () => {
    const [weather, setWeather] = useState(null)
    const [searchCity, setSearchCity] = useState("")
    const [noData, setNoData] = useState("")
    const matches = useMediaQuery('(max-width: 768px)')



    const FetchWhetherData = async () => {


        if (!searchCity) {
            setNoData("No Data Found Please Enter Valid City Name")
            setWeather(null)
            return;
        }
        const apiKey = "f52ad029a5bec1eb276d1b561e822451"
        const Api = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${apiKey}`

        try {

            const res = await axios.get(Api)
            if (res.status == 200) {
                setWeather(res.data)
                console.log("zdanjkndsk", res.data);
                setNoData('')
            }

        } catch (error) {
            console.log(error, "dnajn");
            setNoData("No Data Found Please Enter Valid City Name")
        }

    }

    return (
        <>


            <Card  sx={{width:matches?"300px":"500px", backgroundColor:"transparent", backdropFilter:"blur(5px)", boxShadow:"1px 1px 10px black, 1px 1px 15px black ", marginTop:"20px",padding:"10px",display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column",  }} >
                <Stack direction="row" alignItems="center" justifyContent="space-between">
                    <TextField 
                    sx={{padding:"10px"}}
                    placeholder='Enter City'
                        onChange={(e) => setSearchCity(e.target.value)}
                        value={searchCity}
                        fullWidth id="standard-basic" variant="standard" />
                    <Link href="" onClick={FetchWhetherData} size='small' variant='contained'>
                    <SearchIcon sx={{color:"white",marginTop:"12px"}}/>
                    </Link>
                </Stack>


                {
                    noData &&<Box mt={3}>

                        <Typography >{noData}</Typography>
                    </Box> 
                }
                {weather &&
                    <>

                        <CardMedia
                            component="img"
                            image={weather.weather && `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
                            alt="green iguana"
                            sx={{ width: "100px" }}
                        />
                        <Typography gutterBottom variant="h6" component="div">
                            {weather.weather?.description}
                        </Typography>
                        <Typography variant="h3" component="div">
                            {weather?.main?.temp} °C
                        </Typography>
                        <CardContent sx={{ textAlign: "center" }}>
                            <Typography gutterBottom variant="h6" component="div">
                                <LocationOnIcon /> {weather.name}, <span> ({weather?.sys?.country})</span>
                            </Typography>


                        </CardContent>


                        <Grid container textAlign="center"  spacing={2}>
                            <Grid item lg={6} md={6} sm={12} xs={12}>
                               
                                <Card  sx={{ backgroundColor: "#48CFCB", fontWeight: "bold", paddingTop:"15px"  }}>
                                    <Stack justifyContent="center" alignItems="center" gap={1}>
                                        <AirIcon sx={{ scale: "2" }} />
                                        <Typography variant='h6'>
                                            {weather?.wind?.speed}
                                        </Typography>
                                        <Typography variant='span'>
                                            wind Speed
                                        </Typography>
                                    </Stack>
                            
                                </Card>
                            </Grid>
                            <Grid item lg={6} md={6} sm={12} xs={12}>
                                <Card sx={{ backgroundColor: "#48CFCB", fontWeight: "bold", paddingTop:"15px" }}>
                                    <Stack justifyContent="center" alignItems="center" gap={1}>
                                        <BloodtypeIcon sx={{ scale: "2" }} />
                                        <Typography variant='h6'>
                                            {weather?.main?.humidity} %
                                        </Typography>
                                        <Typography variant='span'>
                                            Humidity
                                        </Typography>
                                    </Stack>
                                </Card>
                            </Grid>
                        </Grid>


                    </>
                }







            </Card>


        </>
    )
}

export default WhetherApp
