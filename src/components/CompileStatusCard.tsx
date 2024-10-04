import {
  Check as CheckIcon,
  ErrorOutline as ErrorOutlineIcon,
} from "@mui/icons-material";
import { Box, Sheet, Typography } from "@mui/joy";
import { CircularProgress } from "@mui/material";
import { CompileStatus } from "hooks/useCompile";
import { useState } from "react";
import { useTranslation } from "react-i18next";

export const CompileStatusCard = ({
  status,
  errorName,
  errorBody,
}: CompileStatus) => {
  const [t] = useTranslation();
  const [isOpenErrorDetail, setIsOpenErrorDetail] = useState(false);

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
        <Box display="flex" flexDirection="column" flex="1">
          <Box
            display="flex"
            flexDirection="row"
            alignItems="center"
            justifyContent="center"
          >
            {t("コンパイル失敗")}
            <ErrorOutlineIcon color="error" />
          </Box>
          <Box
            display="flex"
            flexDirection="column"
            textAlign="center"
            flex="1"
            py="0.2rem"
            sx={{
              userSelect: "none",
              ":hover": {
                background: "#FFEEEE",
              },
              ":active": {
                background: "#FFDDDD",
              },
            }}
            borderRadius="0.5rem"
            onClick={() => setIsOpenErrorDetail((prev) => !prev)}
          >
            <code>{errorName ?? "unknown error"}</code>
            <Typography fontSize="0.8rem" color="danger">
              {isOpenErrorDetail ? "クリックして閉じる" : "エラーの詳細を見る"}
            </Typography>
          </Box>
          {isOpenErrorDetail && (
            <>
              <Sheet
                onClick={() => setIsOpenErrorDetail(false)}
                sx={{
                  top: 0,
                  left: 0,
                  width: "min(100dvw, 100vw)",
                  height: "min(100dvh, 100vh)",
                  position: "fixed",
                  background: "rgba(0, 0, 0, 0.5)",
                  zIndex: 3,
                }}
              ></Sheet>
              <Sheet
                variant="outlined"
                sx={{
                  position: "absolute",
                  zIndex: "4",
                  width: "60rem",
                  minWidth: "30rem",
                  maxWidth: "calc(100vw - 10rem)",
                  maxHeight: "30rem",
                  overflow: "auto",
                  top: "10.5rem",
                  p: "1rem",
                  borderRadius: "0.3rem",
                  borderColor: "#FFBBBB",
                  display: "flex",
                  flexDirection: "column",
                  boxShadow: "0px 3px 10px gray",
                }}
              >
                {errorBody?.split("\n").map((t) => <code>{t}</code>) ??
                  "(no error body)"}
              </Sheet>
            </>
          )}
        </Box>
      )}
    </Box>
  );
};
