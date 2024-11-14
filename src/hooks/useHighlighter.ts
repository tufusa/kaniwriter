import { useEffect, useState } from "react";
import { HighlighterCore, createHighlighterCore } from "shiki";

// カスタムフックの定義
export const useHighlighter = () => {
  const [highlighter, setHighlighter] = useState<HighlighterCore>();

  // シンタックスハイライターの初期化
  useEffect(() => {
    const createHighlighter = async () => {
      const highlighter = await createHighlighterCore({
        themes: [import("shiki/themes/github-light.mjs")],
        langs: [import("shiki/langs/ruby.mjs")],
        loadWasm: import("shiki/wasm"),
      });
      setHighlighter(highlighter);
    };
    createHighlighter();
  }, []);

  return highlighter;
};
