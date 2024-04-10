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
        alignItems: "center",
        top: "0",
        padding: 0,
        margin: 0,
        width: "100%",
      }}
    >
      <Toolbar
        disableGutters
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          width: "100%",
          height: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "22rem",
            height: "100%",
          }}
        >
          <img
            src={icon}
            alt="RubyCity松江のロゴ"
            height={"100%"}
            style={{ margin: 0, padding: 0 }}
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
            right: "1rem",
            m: "0 2rem",
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
            href={import.meta.env.VITE_WRITER_GITHUB_URL}
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
