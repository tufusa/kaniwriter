import { useEffect, useRef, useState } from "react";
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
  CheckCircleRounded as CheckCircleRoundedIcon,
  Check as CheckIcon,
  ErrorOutline as ErrorOutlineIcon,
} from "@mui/icons-material";
import Ansi from "ansi-to-react";
import Base64 from "base64-js";

import { MrubyWriterConnector, Target } from "libs/mrubyWriterConnector";
import { isTarget } from "libs/utility";
import { useQuery } from "hooks/useQuery";
import RBoard from "/images/Rboard.png";
import ESP32 from "/images/ESP32.png";

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
    isTarget(targetItem) ? targetItem : undefined
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
  }, []);

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
  }, []);

  const connect = async () => {
    const res = await connector.connect(
      async () => await navigator.serial.requestPort()
    );
    if (res.isFailure()) {
      alert(`ポートを取得できませんでした。\n${res.error}`);
      console.log(res);
      return;
    }
    await read();
  };

  const read = async () => {
    const res = await connector.startListen();
    console.log(res);
    if (res.isFailure()) {
      alert(
        `受信中にエラーが発生しました。\n${res.error}\ncause: ${res.error.cause}`
      );
    }
  };

  const send = async (text: string) => {
    const res = await connector.sendCommand(text);
    console.log(res);
    if (res.isFailure()) {
      alert(
        `送信中にエラーが発生しました。\n${res.error}\ncause: ${res.error.cause}`
      );
    }
  };

  const writeCode = async () => {
    if (!code) return;
    const res = await connector.writeCode(code, { execute: true });
    console.log(res);
    if (res.isFailure()) {
      alert(
        `書き込み中にエラーが発生しました。\n${res.error}\ncause: ${res.error.cause}`
      );
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        width: "100%",
        minWidth: "150px",
        maxWidth: "1000px",
        flexDirection: "row",
        flexGrow: "1",
        gap: "1rem",
      }}
    >
      <Box
        sx={{
          width: "15rem",
          ml: "2rem",
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
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
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
              flexDirection: "column",
              gap: 2,
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
                  top: "-8px",
                  right: "-8px",
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
                  gap: 1,
                  p: 2,
                  minWidth: 100,
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
        {/* マイコン接続 */}

        <Box
          sx={{
            width: "100%",
            display: "flex",
            gap: "1rem",
            justifyContent: "center",
          }}
        >
          <Button onClick={connect} disabled={!target}>
            接続
            <UsbIcon />
          </Button>
          <Button
            onClick={writeCode}
            disabled={
              compileStatus.status !== "success" || !connector.writeMode
            }
          >
            書き込み
            <FlagIcon />
          </Button>
        </Box>
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
      <Box
        sx={{
          width: "50%",
          display: "flex",
          flexDirection: "column",
          flexGrow: "1",
        }}
      >
        <Log log={log} />
        <Box>
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
          <Box width="100%">
            <code>{error}</code>
          </Box>
        </>
      )}
    </Sheet>
  );
};

const Log = (props: { log: string[] }) => {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [autoScroll, setAutoScroll] = useState(true);

  useEffect(() => {
    if (!autoScroll) return;

    scrollRef.current?.scroll({
      top: scrollRef.current.scrollHeight,
    });
  });

  return (
    <Sheet
      sx={{
        width: "100%",
        display: "flex",
        flexDirection: "column",
        flexGrow: "1",
      }}
    >
      <Sheet
        variant="outlined"
        ref={scrollRef}
        sx={{
          px: "0.5rem",
          boxSizing: "border-box",
          width: "100%",
          textAlign: "left",
          height: "20rem",
          minHeight: "200px",
          overflowY: "auto",
          flexGrow: "1",
        }}
      >
        {props.log.map((text, index) => (
          <div key={`log-${index}`}>
            <Ansi>{text}</Ansi>
          </div>
        ))}
      </Sheet>
      <Box display="flex" justifyContent="right" width="100%">
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
          labelPlacement="start"
        />
      </Box>
    </Sheet>
  );
};
