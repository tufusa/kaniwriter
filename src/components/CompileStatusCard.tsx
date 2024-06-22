import {
  Check as CheckIcon,
  ErrorOutline as ErrorOutlineIcon,
} from "@mui/icons-material";
import { Box } from "@mui/joy";
import { CircularProgress } from "@mui/material";
import { CompileStatus } from "hooks/useCompile";
import { useTranslation } from "react-i18next";

type Props = CompileStatus;

export const CompileStatusCard = ({ status, error }: Props) => {
  const [t] = useTranslation();

  return (
    <Box
      sx={{
        p: "0.5rem 1.5rem",
        width: "100%",
        boxSizing: "border-box",
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        fontFamily: "'M PLUS Rounded 1c', sans-serif",
      }}
    >
      {status === "idle" && (
        <>
          {t("コンパイル待機中")}
          <CircularProgress size="1.5rem" sx={{ ml: "1rem" }} />
        </>
      )}
      {status === "compile" && (
        <>
          {t("コンパイル中")}
          <CircularProgress size="1.5rem" sx={{ ml: "1rem" }} />
        </>
      )}
      {status === "success" && (
        <>
          {t("コンパイル完了")}
          <CheckIcon color="success" />
        </>
      )}
      {status === "error" && (
        <>
          {t("コンパイル失敗")}
          <ErrorOutlineIcon color="error" />
          <Box textAlign="center">
            <code>{error}</code>
          </Box>
        </>
      )}
    </Box>
  );
};
