import {
  Check as CheckIcon,
  ErrorOutline as ErrorOutlineIcon,
} from "@mui/icons-material";
import { Box } from "@mui/joy";
import { CircularProgress } from "@mui/material";
import { CompileStatus } from "hooks/useCompile";

type Props = {
  status: CompileStatus
}

export const CompileStatusCard = (props: Props) => {
  const { status, error } = props.status;

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
          コンパイル待機中
          <CircularProgress size="1.5rem" sx={{ ml: "1rem" }} />
        </>
      )}
      {status === "compile" && (
        <>
          コンパイル中
          <CircularProgress size="1.5rem" sx={{ ml: "1rem" }} />
        </>
      )}
      {status === "success" && (
        <>
          コンパイル完了
          <CheckIcon color="success" />
        </>
      )}
      {status === "error" && (
        <>
          コンパイル失敗
          <ErrorOutlineIcon color="error" />
          <Box textAlign="center">
            <code>{error}</code>
          </Box>
        </>
      )}
    </Box>
  );
};
