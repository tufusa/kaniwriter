import { useEffect, useState } from "react";
import { createHighlighterCore, HighlighterCore } from "shiki";
import getWasm from "shiki/wasm";
import githubLight from "shiki/themes/github-light.mjs";
import ruby from "shiki/langs/ruby.mjs";

// カスタムフックの定義
export const useHighlighter = () => {
  const [highlighter, setHighlighter] = useState<HighlighterCore>();

  // シンタックスハイライターの初期化
  useEffect(() => {
    const createHighlighter = async () => {
      const highlighter = await createHighlighterCore({
        themes: [githubLight],
        langs: [ruby],
        loadWasm: getWasm,
      });
      setHighlighter(highlighter);
    };
    createHighlighter();
  }, []);

  return highlighter;
};
