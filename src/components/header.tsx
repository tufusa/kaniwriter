import { AppBar, Box, Link, Toolbar } from "@mui/material";
import { GitHub } from "@mui/icons-material";
import icon from "/images/logo.png";

export function Header() {
  return (
    <AppBar
      position="static"
      id={"header"}
      sx={{
        height: "4rem",
        backgroundColor: "#ff3227",
        width: "100%",
        whiteSpace: "nowrap",
      }}
    >
      <Toolbar
        disableGutters
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: "22rem",
            height: "100%",
            gap: "0.4rem",
          }}
        >
          <img
            src={icon}
            alt="RubyCity松江のロゴ"
            style={{
              margin: 0,
              padding: 0,
              height: "100%",
            }}
          />
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
        </Box>
        <Box
          sx={{
            height: "100%",
            mr: "2rem",
            display: "flex",
            gap: "1rem",
            alignItems: "center",
          }}
        >
          <Link
            href={import.meta.env.VITE_BASE_URL}
            variant="body1"
            underline="none"
            color="inherit"
            fontFamily="'M PLUS Rounded 1c', sans-serif"
            sx={{
              ":hover": { color: "inherit" },
            }}
          >
            参考資料
          </Link>
          <Link
            href={`https://github.com/${
              import.meta.env.VITE_WRITER_REPOSITORY_PATH
            }`}
            target="_blank"
            variant="body1"
            underline="none"
            color="inherit"
            sx={{
              ":hover": { color: "inherit" },
              display: "flex",
            }}
          >
            <GitHub fontSize="large" />
          </Link>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
