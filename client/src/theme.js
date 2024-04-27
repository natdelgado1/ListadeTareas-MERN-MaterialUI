
import { createTheme } from "@mui/material";
import { purple } from "@mui/material/colors";

export const theme = createTheme({
    palette: {
      primary: {
        main: purple[500],
      },
      secondary: {
        main: "#f44336",
      },
    },
  });

  export const fondoLila = createTheme({
    palette: {
      background: {
        paper: '#fef9ff', // your color
      },
    },
  });