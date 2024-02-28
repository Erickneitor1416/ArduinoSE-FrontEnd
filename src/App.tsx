import LightModeIcon from "@mui/icons-material/LightMode";
import SensorsIcon from "@mui/icons-material/Sensors";
import ThermostatIcon from "@mui/icons-material/Thermostat";
import {
  Box,
  FormControlLabel,
  Grid,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
  Switch,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

const apiUrl = import.meta.env.VITE_API_URL ?? "";

interface SensorData {
  temperatura: number;
  humedad: number;
  luz: number;
}

function App() {
  const [data, setData] = useState<SensorData>({
    temperatura: 0,
    humedad: 0,
    luz: 0,
  });
  const [checked, setChecked] = useState(false);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        const response = await fetch(`${apiUrl}/data`);
        const jsonData = await response.json();
        console.log(jsonData);
        setData(jsonData);
      } catch (error) {
        console.error("Error al obtener datos:", error);
        setData({ temperatura: 18, humedad: 100, luz: 99 });
      }
    };

    const interval = setInterval(fetchData, 6000);

    return (): void => clearInterval(interval);
  }, []);

  const handleSwitch = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked;
    setChecked(checked);
    try {
      const response = await fetch(`${apiUrl}/led/${checked ? "on" : "off"}`, {
        method: "POST",
      });
      //const jsonData = await response.json();
      console.log(response);
    } catch (error) {
      setError(true);
      alert("Error al encender, inténtalo de nuevo");
      setChecked(!checked);
    }
  };

  return (
    <Box p={3} sx={{ flex: 1 }}>
      <Typography variant="h3" gutterBottom>
        Proyecto II Bimestre Sistemas Embebidos Grupo 1
      </Typography>
      <Typography variant="h4" gutterBottom>
        Datos de arduino
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <FormControlLabel
            control={
              <Switch
                checked={checked}
                color={error ? "error" : "success"}
                onChange={handleSwitch}
              />
            }
            label="Encender LED"
          />
        </Grid>
        <Grid item xs={4}>
          <Paper elevation={3} sx={{ padding: 2, backgroundColor: "#ffffff" }}>
            <ListItem alignItems="flex-start" disableGutters>
              <ListItemIcon>
                <ThermostatIcon />
              </ListItemIcon>
              <ListItemText>
                <Typography variant="h5" gutterBottom>
                  Temperatura
                </Typography>
              </ListItemText>
            </ListItem>
            <Typography variant="h6" gutterBottom>
              {data.temperatura} °C
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper elevation={3} sx={{ padding: 2, backgroundColor: "#ffffff" }}>
            <ListItem alignItems="flex-start" disableGutters>
              <ListItemIcon>
                <SensorsIcon />
              </ListItemIcon>
              <ListItemText>
                <Typography variant="h5" gutterBottom>
                  Humedad
                </Typography>
              </ListItemText>
            </ListItem>
            <Typography variant="h6" gutterBottom>
              {data.humedad} %
            </Typography>
          </Paper>
        </Grid>
        <Grid item xs={4}>
          <Paper elevation={3} sx={{ padding: 2, backgroundColor: "#ffffff" }}>
            <ListItem alignItems="flex-start" disableGutters>
              <ListItemIcon>
                <LightModeIcon />
              </ListItemIcon>
              <ListItemText>
                <Typography variant="h5" gutterBottom>
                  Luz
                </Typography>
              </ListItemText>
            </ListItem>
            <Typography variant="h6" gutterBottom>
              {data.luz} %
            </Typography>
          </Paper>
        </Grid>
      </Grid>
      <Typography
        variant="body2"
        color="textSecondary"
        align="center"
        sx={{ mt: 3 }}
      >
        Autores: Gandhy Garcia, Kevin Caranqui, Erick Muñoz y Pablo Velez
      </Typography>
    </Box>
  );
}

export default App;
