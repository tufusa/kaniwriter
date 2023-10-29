import { useState } from "react";
import {
  Box,
  Button,
  SvgIcon,
  FormLabel,
  Radio,
  radioClasses,
  RadioGroup,
  Sheet,
  styled,
} from "@mui/joy";
import { Step, StepLabel, Stepper, Typography } from "@mui/material";
import "../css/home.css";

import Rboard from "/public/Rboard.png";
import ESP32 from "/public/ESP32.png";
import { Flag, Usb } from "@mui/icons-material";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
const steps = [
  "マイコン選択",
  "ファイルのアップロード",
  "マイコン接続",
  "書き込み中",
];

const targets = [
  {
    title: "Rboard",
    image: Rboard,
  },
  {
    title: "ESP32",
    image: ESP32,
  },
];

const VisuallyHiddenInput = styled('input')`
  clip: rect(0 0 0 0);
  clip-path: inset(50%);
  height: 1px;
  overflow: hidden;
  position: absolute;
  bottom: 0;
  left: 0;
  white-space: nowrap;
  width: 1px;
`;

export function Home() {
  const [step, setStep] = useState<number>(0);
  const [target, setTarget] = useState<string>("");
  const [file, setFile] = useState<File | null>(null);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files) {
      setFile(files[0]);
      if (step === 1) setStep(2);
    }
  }
  return (
    <div id={"home"}>
      <Box id={"home"}>
        <Typography
          variant="h4"
          component="div"
          color="black"
          fontFamily={"'M PLUS Rounded 1c', sans-serif"}
        >
          書き込みツール
        </Typography>

        { /* ステップ */}
        <Stepper
          activeStep={step}
          alternativeLabel
          sx={{ width: 900, margin: "3rem auto" }}
        >
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>
                <Typography fontFamily={"'M PLUS Rounded 1c', sans-serif"}>
                  {label}
                </Typography>
              </StepLabel>
            </Step>
          ))}
        </Stepper>

        { /* マイコン選択 */}
        <Box sx={{ display: "flex", gap: 2 }}>
          <RadioGroup
            aria-label="platform"
            defaultValue="Website"
            overlay
            name="platform"
            sx={{
              flexDirection: "row",
              margin: "2rem auto",
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
                  flexDirection: "column",
                  alignItems: "center",
                  gap: 1.5,
                  p: 2,
                  minWidth: 120,
                }}
              >
                <Radio
                  id={value.title}
                  value={value.title}
                  checkedIcon={<CheckCircleRoundedIcon />}
                  checked={target === value.title}
                  onChange={(e) => {
                    setTarget(e.target.value)
                    if (step === 0) setStep(1);
                  }}
                />
                <FormLabel htmlFor={value.title}>
                  <Typography fontFamily={"'M PLUS Rounded 1c', sans-serif"}>{value.title}</Typography>
                </FormLabel>
                <img
                  src={value.image}
                  alt={value.title}
                  style={{
                    aspectRatio: "1/1",
                    width: "10rem",
                    margin: "0 auto",
                  }}
                />
              </Sheet>
            ))}
          </RadioGroup>
        </Box>

        { /* ファイルのアップロード */}
        <Box sx={{ display: "flex", justifyContent: "center" }}>
        <Button
          component="label"
          role={undefined}
          tabIndex={-1}
          variant="outlined"
          color="neutral"
          startDecorator={
            <SvgIcon>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6.75 19.5a4.5 4.5 0 01-1.41-8.775 5.25 5.25 0 0110.233-2.33 3 3 0 013.758 3.848A3.752 3.752 0 0118 19.5H6.75z"
                />
              </svg>
            </SvgIcon>
          }
        >
          Upload a file
          <VisuallyHiddenInput type="file" onChange={handleFileChange} />
        </Button>
        </Box>

        { /* マイコン接続 */}
        <Box sx={{ display: "flex", justifyContent: "center", margin: "1rem" }}>
          <Button disabled={step !== 2} onClick={() => {if (step === 2) setStep(3)}}>
            接続
            <Usb />
          </Button>
        </Box>


        { /* 書き込み中 */}
        <Box sx={{ display: "flex", justifyContent: "center", margin: "1rem" }}>
          <Button disabled={step !== 3}>
            書き込み
            <Flag />
          </Button>
        </Box>
        <Button onClick={() => setStep(0)}>リセット</Button>
      </Box>
    </div>
  );
}
