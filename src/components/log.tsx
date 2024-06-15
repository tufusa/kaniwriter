import { Sheet, Typography } from "@mui/joy";
import { Box, FormControlLabel, Checkbox } from "@mui/material";
import { useRef, useState, useEffect } from "react";
import { ansiToJson } from "anser";

export const Log = (props: { log: string[] }) => {
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
          overflow: "auto",
          flexGrow: "1",
          whiteSpace: "nowrap",
          fontFamily: "'Noto Sans Mono', monospace",
        }}
      >
        {props.log.map((log) => (
          <>
            {ansiToJson(log, { remove_empty: true }).map((entry, index) => (
              <Typography
                sx={{
                  color: entry.fg ? `rgb(${entry.fg})` : "inherit",
                  backgroundColor: entry.bg ? `rgb(${entry.bg})` : "inherit",
                  display: "inline",
                  fontSize: "0.8rem",
                  fontFamily: "inherit",
                }}
                key={`log-${index}`}
              >
                {entry.content}
              </Typography>
            ))}
            {log.length > 0 && <br />}
          </>
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
