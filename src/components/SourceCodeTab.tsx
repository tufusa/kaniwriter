import { Box, Card, Button, Typography } from "@mui/joy";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { createHighlighterCore, HighlighterCore } from "shiki";
import getWasm from "shiki/wasm";
import githubLight from "shiki/themes/github-light.mjs";
import ruby from "shiki/langs/ruby.mjs";
interface CodeProps {
  sourceCode: string;
}

// 送信したソースコードを表示するページ下部のコンポーネント
export const SourceCodeTab = ({ sourceCode }: CodeProps) => {
  const [html, setHtml] = useState<string>("");
  // 送信したmruby/cのソースコードを表示するかどうか
  const [isOpen, setIsOpen] = useState(false);
  const [t] = useTranslation();
  const [highlighter, setHighlighter] = useState<HighlighterCore>();
  
  // シンタックスハイライトの初期化
  async function createHighlighter() {
    const highlighter = await createHighlighterCore({
      themes: [githubLight],
      langs: [ruby],
      loadWasm: getWasm,
    });
    setHighlighter(highlighter);
  }
  // ソースコードをシンタックスハイライト付きのHTMLに変換
  async function convertCodeToHtml() {
    if (!highlighter) return;
    const html = highlighter.codeToHtml(sourceCode, {
      lang: "ruby",
      theme: "github-light",
    });
    setHtml(html);
  }
  
  useEffect(() => {
    if(!highlighter) {
      createHighlighter();
    }
    convertCodeToHtml();
  }, [sourceCode]);
  return (
    <Box
      sx={{
        minWidth: "45rem",
        maxWidth: "65rem",
        width: "max(100vw, 100dvw, 45rem)",
        mb: isOpen ? "2rem" : "0",
      }}
    >
      <Card
        sx={{
          borderRadius: isOpen ? "1rem" : "1rem 1rem 0 0",
          margin: "0 2rem",
        }}
      >
        <Button
          sx={{
            height: "2rem",
          }}
          variant="plain"
          onClick={() => setIsOpen(!isOpen)}
        >
          <Typography
            fontFamily={"'M PLUS Rounded 1c', sans-serif"}
            color="primary"
          >
            {isOpen ? t("ソースコードを非表示") : t("ソースコードを表示")}
          </Typography>
        </Button>

        {isOpen && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              maxHeight: "30rem",
              overflow: "auto",
            }}
          >
            <div
              style={{
                width: "100%",
                overflowX: "scroll",
              }}
              dangerouslySetInnerHTML={{ __html: html }}
            ></div>
          </Box>
        )}
      </Card>
    </Box>
  );
};