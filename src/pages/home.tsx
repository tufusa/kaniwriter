import { useCallback, useEffect, useState } from "react";
import {
  Box,
  Button,
  FormLabel,
  Radio,
  radioClasses,
  RadioGroup,
  Sheet,
} from "@mui/joy";
import {
  Checkbox,
  CircularProgress,
  FormControlLabel,
  Input,
  Typography,
} from "@mui/material";
import {
  Flag as FlagIcon,
  Usb as UsbIcon,
  Edit as EditIcon,
  CheckCircleRounded as CheckCircleRoundedIcon,
  Check as CheckIcon,
  ErrorOutline as ErrorOutlineIcon,
} from "@mui/icons-material";
import Base64 from "base64-js";

import { MrubyWriterConnector, Target } from "libs/mrubyWriterConnector";
import { isTarget } from "libs/utility";
import { useQuery } from "hooks/useQuery";
import RBoard from "/images/Rboard.png";
import ESP32 from "/images/ESP32.png";
import { Log } from "components/log";
import { ControlButton } from "components/ControlButton";

const targets = [
  {
    title: "RBoard",
    image: RBoard,
  },
  {
    title: "ESP32",
    image: ESP32,
  },
] as const satisfies readonly { title: Target; image: string }[];

type CompileStatus = {
  status: "idle" | "compile" | "success" | "error";
  error?: string;
};

export const Home = () => {
  const query = useQuery();
  const id = query.get("id");

  const targetItem = localStorage.getItem("target");
  const [target, setTarget] = useState<Target | undefined>(
    targetItem && isTarget(targetItem) ? targetItem : undefined
  );
  const autoConnectItem = localStorage.getItem("autoConnect");
  const [autoConnectMode, setAutoConnectMode] = useState<boolean>(
    autoConnectItem === "true"
  );

  const [connector] = useState<MrubyWriterConnector>(
    new MrubyWriterConnector({
      target,
      log: (message, params) => console.log(message, params),
      onListen: (buffer) => setLog([...buffer]),
      useAnsi: true,
    })
  );
  const [command, setCommand] = useState("");
  const [log, setLog] = useState<string[]>([]);
  const [code, setCode] = useState<Uint8Array>();
  const [compileStatus, setCompileStatus] = useState<CompileStatus>({
    status: "idle",
  });
  const [autoScroll, setAutoScroll] = useState(true);

  const read = useCallback(async () => {
    const res = await connector.startListen();
    console.log(res);
    if (res.isFailure()) {
      alert(
        `受信中にエラーが発生しました。\n${res.error}\ncause: ${res.error.cause}`
      );
    }
  }, [connector]);

  const connect = useCallback(async () => {
    const res = await connector.connect(
      async () => await navigator.serial.requestPort()
    );
    if (res.isFailure()) {
      alert(`ポートを取得できませんでした。\n${res.error}`);
      console.log(res);
      return;
    }
    await read();
  }, [connector, read]);

  const send = useCallback(
    async (text: string) => {
      const res = await connector.sendCommand(text);
      console.log(res);
      if (res.isFailure()) {
        alert(
          `送信中にエラーが発生しました。\n${res.error}\ncause: ${res.error.cause}`
        );
      }
    },
    [connector]
  );

  const writeCode = useCallback(async () => {
    if (!code) return;
    const res = await connector.writeCode(code, { execute: true });
    console.log(res);
    if (res.isFailure()) {
      alert(
        `書き込み中にエラーが発生しました。\n${res.error}\ncause: ${res.error.cause}`
      );
    }
  }, [connector, code]);

  useEffect(() => {
    const compile = async () => {
      setCompileStatus({ status: "idle" });

      const codeResponse = await fetch(
        `${import.meta.env.VITE_COMPILER_URL}/code/${id}`
      ).catch(() => undefined);
      if (!codeResponse?.ok) {
        setCompileStatus({
          status: "error",
          error: "No source code found.",
        });
        return;
      }

      setCompileStatus({ status: "compile" });

      const compileResponse = await fetch(
        `${import.meta.env.VITE_COMPILER_URL}/code/${id}/compile`,
        { method: "POST" }
      ).catch(() => undefined);
      if (!compileResponse?.ok) {
        setCompileStatus({ status: "error", error: "Compile failed." });
        return;
      }

      const compileResult = (await compileResponse.json()) as {
        binary: string;
        error: string;
      };
      if (compileResult.error !== "") {
        setCompileStatus({ status: "error", error: "Compile failed." });
        return;
      }

      setCode(Base64.toByteArray(compileResult.binary));
      setCompileStatus({ status: "success" });
    };

    compile();
  }, [id]);

  useEffect(() => {
    if (!autoConnectMode) return;

    const autoConnect = async () => {
      const ports = await navigator.serial.getPorts();
      if (ports.length == 0) return;

      connector
        .connect(async () => ports[0])
        .then((result) => {
          if (result.isFailure()) {
            console.log(result);
            return;
          }

          read();
        });
    };

    autoConnect();
  }, [autoConnectMode, connector, read]);

  return (
    <Box
      sx={{
        mb: "0.5rem",
        display: "flex",
        width: "100%",
        minWidth: "30rem",
        maxWidth: "65rem",
        flexDirection: "row",
        flexGrow: "1",
        gap: "1rem",
      }}
    >
      <Box
        sx={{
          marginLeft: "2rem",
          width: "15rem",
          minWidth: "15rem",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "2rem",
        }}
      >
        <CompileStatusCard status={compileStatus} />

        {/* マイコン選択 */}
        <Box
          sx={{
            width: "100%",
          }}
        >
          {!target && (
            <Typography variant="body1" color="red">
              書き込みターゲットを選択してください。
            </Typography>
          )}
          <RadioGroup
            aria-label="platform"
            defaultValue="Website"
            overlay
            name="platform"
            sx={{
              width: "100%",
              gap: "1rem",
              [`& .${radioClasses.checked}`]: {
                [`& .${radioClasses.action}`]: {
                  inset: -1,
                  border: "3px solid",
                  borderColor: "primary.500",
                },
              },
              [`& .${radioClasses.radio}`]: {
                display: "contents",
                "& > svg": {
                  zIndex: 2,
                  position: "absolute",
                  top: "-0.5rem",
                  right: "-0.5rem",
                  bgcolor: "background.surface",
                  borderRadius: "50%",
                },
              },
            }}
          >
            {targets.map((value, index) => (
              <Sheet
                key={index}
                variant="outlined"
                sx={{
                  borderRadius: "md",
                  boxShadow: "sm",
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                  gap: "1rem",
                  p: "1rem",
                }}
              >
                <Radio
                  id={value.title}
                  value={value.title}
                  checkedIcon={<CheckCircleRoundedIcon />}
                  checked={target === value.title}
                  onChange={() => {
                    setTarget(value.title);
                    connector.setTarget(value.title);
                    localStorage.setItem("target", value.title);
                  }}
                />
                <FormLabel htmlFor={value.title}>
                  <Typography fontFamily={"'M PLUS Rounded 1c', sans-serif"}>
                    {value.title}
                  </Typography>
                </FormLabel>
                <img
                  src={value.image}
                  alt={value.title}
                  style={{
                    aspectRatio: "1/1",
                    width: "6rem",
                    margin: "0 auto",
                  }}
                />
              </Sheet>
            ))}
          </RadioGroup>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          <FormControlLabel
            control={
              <Checkbox
                onChange={(ev) => {
                  const checked = ev.currentTarget.checked;
                  setAutoScroll(checked);
                }}
                checked={autoScroll}
              />
            }
            label="自動スクロール"
            sx={{ color: "black" }}
          />
          <FormControlLabel
            control={
              <Checkbox
                onChange={(ev) => {
                  const checked = ev.currentTarget.checked;
                  setAutoConnectMode(checked);
                  localStorage.setItem("autoConnect", `${checked}`);

                  if (checked) window.location.reload();
                }}
                checked={autoConnectMode}
              />
            }
            label="自動接続(Experimental)"
            sx={{ color: "black" }}
          />
        </Box>
      </Box>
      <Box
        sx={{
          marginRight: "2rem",
          minWidth: "25rem",
          display: "flex",
          flexDirection: "column",
          flexGrow: "1",
          gap: "1rem",
        }}
      >
        <Log log={log} autoScroll={autoScroll} />
        <Box
          sx={{
            width: "100%",
            display: "flex",
            flexWrap: "wrap",
            justifyContent: "right",
            alignItems: "center",
            gap: "1rem",
          }}
        >
          <ControlButton
            label="接続"
            icon={<UsbIcon />}
            onClick={connect}
            disabled={!target}
          />
          <ControlButton
            label="書き込み"
            icon={<EditIcon />}
            onClick={writeCode}
            disabled={
              compileStatus.status !== "success" || !connector.writeMode
            }
          />
          <ControlButton
            label="実行"
            icon={<FlagIcon />}
            onClick={() => send("execute")}
            disabled={!connector.isWriteMode}
            color="success"
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "right",
          }}
        >
          <Input type="text" onChange={(e) => setCommand(e.target.value)} />
          <Input type="submit" onClick={() => send(command)} value="Send" />
        </Box>
      </Box>
    </Box>
  );
};

const CompileStatusCard = (props: { status: CompileStatus }) => {
  const { status, error } = props.status;

  return (
    <Sheet
      variant="outlined"
      color="neutral"
      sx={{
        p: "0.5rem 1.5rem",
        width: "100%",
        boxSizing: "border-box",
        borderRadius: "sm",
        borderColor: status == "error" ? "red" : "lightgrey",
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
    </Sheet>
  );
};
