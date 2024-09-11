import WhetherApp from "@/components/WhetherApp";
import { Box } from "@mui/material";
import Image from "next/image";

export default function Home() {
  return (
  <Box display="flex" justifyContent="center" alignItems="start" width="100%" height="100vh"sx={{
    backgroundImage: `url('/weather.jpg')`,  
    backgroundSize: 'cover',  
    backgroundPosition: 'center', 
  }}>
  <WhetherApp/>
  
  </Box>
  );
}
