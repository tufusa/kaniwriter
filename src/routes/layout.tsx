import { Outlet } from "react-router-dom";
import { Header } from "components/header";
import { Box } from "@mui/material";

export const Layout = () => (
  <Box
    sx={{
      width: "100%",
      height: "100%",
      minWidth: "100vw",
      minHeight: "100vh",
      "&": {
        minWidth: "100dvw",
        minHeight: "100dvh",
      },
      background: "white",
      display: "flex",
      flexDirection: "column",
      gap: "2rem",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <Header />
    <Outlet />
  </Box>
);
