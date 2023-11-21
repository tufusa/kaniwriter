import { AppBar, Box, Button, Link, Toolbar, Typography } from "@mui/material";
import icon from "/logo.png";
import "css/header.css";

export function Header() {
  return (
    <AppBar position="static" id={"header"}>
      <Toolbar disableGutters className="toolbar">
        <img src={icon} alt="logo" id={"logo"} />
        <Link
          href={import.meta.env.VITE_BASE_URL}
          variant="h4"
          underline="none"
          color="inherit"
          fontFamily="'M PLUS Rounded 1c', sans-serif"
          sx={{ ":hover": { color: "inherit" } }}
        >
          書き込みツール
        </Link>
        <Box sx={{ flexGrow: 1 }}>
          <Link
            href={import.meta.env.VITE_BASE_URL}
            variant="body1"
            underline="none"
            color="inherit"
            fontFamily="'M PLUS Rounded 1c', sans-serif"
            sx={{
              margin: "0 1rem",
              ":hover": { color: "inherit" },
            }}
          >
            参考資料
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
