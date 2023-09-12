import { ComponentStyleConfig } from "@chakra-ui/theme";

export const Button = {
  baseStyle: {
    borderRadius: "60px",
    fontSize: "10pt",
    fontWeight: 700,
    _focus: {
      boxShadow: "none",
    },
  },
  sizes: {
    sm: {
      fontSize: "8pt",
    },
    md: {
      fontSize: "10pt",
      // height: "28px",
    },
  },
  variants: {
    solid: {
      color: "white",
      bg: "#1808A3",
      _hover: {
        bg: "#31CD31",
      },
    },
    outline: {
      color: "blue.400",
      border: "1px solid",
      borderColor: "blue.500",
      _hover: {
        bg: "gray.400",
      },
    },
    oauth: {
      height: "34px",
      border: "1px solid",
      borderColor: "gray.300",
      _hover: {
        bg: "gray.50",
      },
    },
  },
};
