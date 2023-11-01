import { AppBar, Box, Button, Toolbar, Typography } from "@mui/material";
import icon from "/logo.png";
import "css/header.css";

export function Header() {
  const pages = ["ホーム", "書き込みツール", "参考資料"];
  return (
    <AppBar position="static" id={"header"}>
      <Toolbar disableGutters className="toolbar">
        <img src={icon} alt="logo" id={"logo"} />
        <Typography
          variant="h4"
          component="div"
          color="inherit"
          fontFamily="'M PLUS Rounded 1c', sans-serif"
        >
          書き込みツール
        </Typography>
        <Box sx={{ flexGrow: 1 }}>
          {pages.map((page) => (
            <Button
              key={page}
              variant="text"
              color="inherit"
              style={{
                margin: "0 1rem",
              }}
            >
              <Typography
                component="div"
                color="inherit"
                fontFamily="'M PLUS Rounded 1c', sans-serif"
              >
                {page}
              </Typography>
            </Button>
          ))}
        </Box>
      </Toolbar>
    </AppBar>
  );
}
