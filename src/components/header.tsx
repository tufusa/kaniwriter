import { AppBar, Box, Link, Toolbar } from "@mui/material";
import { Option, Select } from "@mui/joy";
import { GitHub, Translate } from "@mui/icons-material";
import icon from "/images/logo.png";
import { useTranslation } from "react-i18next";
import { useMemo } from "react";

export const Header = () => {
  const [t, i18n] = useTranslation();
  const languages = useMemo(
    () =>
      i18n.languages
        .map((locale) => ({
          locale,
          name: t("languageName", { lng: locale }),
        }))
        .sort((lang1, lang2) => lang1.name.localeCompare(lang2.name)),
    [t, i18n]
  );

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
            alt={t("RubyCity松江のロゴ")}
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
            {t("書き込みツール")}
          </Link>
        </Box>
        <Box
          sx={{
            height: "100%",
            mr: "2rem",
            display: "flex",
            gap: "2rem",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              gap: "0.3rem",
            }}
          >
            <Translate />
            <Select
              color="neutral"
              sx={{ width: "8rem" }}
              variant="soft"
              defaultValue={
                localStorage.getItem("locale") ?? i18n.resolvedLanguage
              }
              onChange={(_, value) => {
                if (!value) return;

                i18n.changeLanguage(value);
                localStorage.setItem("locale", value);
              }}
            >
              {languages.map(({ locale, name }) => (
                <Option value={locale} key={locale}>
                  {locale} {name}
                </Option>
              ))}
            </Select>
          </Box>
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
            {t("参考資料")}
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
};
