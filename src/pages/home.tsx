import { useState } from "react";
import {
  Box,
  CircularProgress,
  Link,
  Button,
  Input,
  Select,
  Option,
} from "@mui/joy";
import { Step, StepLabel, Stepper, Typography } from "@mui/material";
import "../css/home.css";

const steps = [
  "ファイルのアップロード",
  "マイコン選択",
  "マイコン接続",
  "書き込み中",
];

const targets = [
  "esp32",
  "esp8266",
  "arduino",
  "raspberry pi",
  "m5stack",
  "m5stick",
  "m5atom",
  "m5paper",
];

export function Home() {
  const [step, setStep] = useState<number>(0);
  const [file1, setFile1] = useState(null);
  const [file2, setFile2] = useState(null);
  const [target, setTarget] = useState(targets[0]);
  return (
    <div id={"home"}>
      <Box id={"home"}>
        <Typography variant="h4" component="div" color="black">
          書き込みツール
        </Typography>
        <form
          type={"file"}
          onChange={(e) => {
            setFile1(e.target.files[0]);
          }}
        >
          {/*ファイル提出ボタン*/}
          <div className={"file-form"}>
            master.mrc
            <Button
              component="label"
              className={"file"}
              style={{
                margin: "1rem 1rem",
                width: "7rem",
                height: "2rem",
              }}
            >
              ファイルを提出
              <Input type="file" hidden style={{ display: "none" }} />
            </Button>
          </div>
          <div className={"file-form"}>
            slave.mrc
            <Button
              component="label"
              className={"file"}
              style={{
                margin: "1rem 1rem",
                width: "7rem",
                height: "2rem",
              }}
            >
              ファイルを提出
              <Input type="file" hidden style={{ display: "none" }} />
            </Button>
          </div>
        </form>
        <Button
          className="button"
          startDecorator={
            <CircularProgress color="danger" variant="soft" thickness={2} />
          }
        >
          Loading…
        </Button>
        <div>
          書き込みターゲット
          <Select
            color={"primary"}
            placeholder={"選択してください"}
            variant="outlined"
            onChange={(e) => {
              setTarget(e.target.value);
            }}
            style={{
              margin: "1rem auto",
              width: "13rem",
            }}
          >
            {targets.map((t) => (
              <Option key={t} value={t}>
                {t}
              </Option>
            ))}
          </Select>
        </div>
        <Stepper activeStep={step} alternativeLabel>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Button onClick={() => setStep(step + 1)}>次のステップ</Button>
        <Button onClick={() => setStep(0)}>リセット</Button>
      </Box>
    </div>
  );
}
