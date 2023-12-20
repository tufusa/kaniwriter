import { Outlet } from "react-router-dom";
import { Header } from "components/header";
import { Box } from "@mui/material";

export const Layout = () => (
  <Box
    sx={{
      minHeight: "100vh",
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
