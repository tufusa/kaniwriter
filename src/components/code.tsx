import { Box, Card } from "@mui/joy";
import { Button, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { codeToHtml } from "shiki";
interface CodeProps {
  sourceCode: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

export const Code = ({ sourceCode, isOpen, setIsOpen }: CodeProps) => {
  const [code, setCode] = useState<string>(sourceCode);
  useEffect(() => {
    async function convertCodeToHtml() {
      const html = await codeToHtml(sourceCode, {
        lang: "ruby",
        theme: "github-light",
      });
      setCode(html);
    }
    convertCodeToHtml();
  }, [sourceCode]);
  return (
    <Box
      sx={{
        width: "100vw",
      }}
    >
      <Card
        sx={{
          p: "0.5rem",
          m: "0 1rem",
          borderRadius: "1rem 1rem 0 0",
        }}
      >
        <Button
          sx={{
            width: "100vw",
            height: "2rem",
            p: "0.5rem",
          }}
          onClick={() => setIsOpen(!isOpen)}
        >
          <img src="" />
          <Typography>
            {isOpen ? "ソースコードを非表示" : "ソースコードを表示"}
          </Typography>
        </Button>

        {isOpen && (
          <Box
            sx={{
              display: "flex",
              width: "100%",
              justifyContent: "center",
            }}
          >
            <div
              style={{ width: "90%" }}
              dangerouslySetInnerHTML={{ __html: code }}
            ></div>
          </Box>
        )}
      </Card>
    </Box>
  );
};
