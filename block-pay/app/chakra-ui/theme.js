// 1. Import `extendTheme`
// import "@fontsource/roboto-mono/500.css";
// import "@fontsource/roboto-mono/700.css";
// import "@fontsource/rubik/400.css";
// import "@fontsource/rubik/500.css";
import { extendTheme } from "@chakra-ui/react";
import { Button } from "./button";

// 2. Call `extendTheme` and pass your custom values
export const theme = extendTheme({
  colors: {
    brand: {
      100: "#1808A3",
      // ...
      900: "#31CD31",
    },
  },
  fonts: {
    heading: "Helix, sans-serif",
    body: "Helix, sans-serif",
  },
  styles: {
    global: () => ({
      body: {
        bg: "#FFFFFF",
      },
    }),
  },
  components: {
    Button,
  },
});
