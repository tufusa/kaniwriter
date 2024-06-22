import { useCallback, useState } from "react";
import { Version } from "./useVersions";
import Base64 from "base64-js";

export type CompileStatus = {
  status: "idle" | "compile" | "success" | "error";
  error?: string;
};
type Compile = (version: Version) => void;
type CompileResponse = {
  binary: string;
  error: string;
};
type CodeResponse = {
  code: string;
};

export const useCompile = (
  id: string | undefined,
  setCode: (code: Uint8Array) => void
): [status: CompileStatus, sourceCode: string, compile: Compile] => {
  const [status, setStatus] = useState<CompileStatus>({
    status: "idle",
  });

  // 送信したmruby/cのソースコード
  const [sourceCode, setSourceCode] = useState<string>("");

  const compile = useCallback(
    async (version: Version) => {
      if (!id) {
        setStatus({
          status: "error",
          error: "No id specified",
        });
        return;
      }

      setStatus({ status: "idle" });

      const codeResponse = await fetch(
        `${import.meta.env.VITE_COMPILER_URL}/code/${id}`
      ).catch(() => undefined);
      if (!codeResponse?.ok) {
        setStatus({
          status: "error",
          error: "No source code found.",
        });
        return;
      }

      // レスポンスから、送信したmruby/cのソースコードを抽出
      const codeResult = await codeResponse
        .json()
        .then((json) => json as CodeResponse);
      setSourceCode(
        new TextDecoder().decode(Base64.toByteArray(codeResult.code))
      );

      setStatus({ status: "compile" });

      const compileResponse = await fetch(
        `${import.meta.env.VITE_COMPILER_URL}/code/${id}/compile`,
        {
          body: JSON.stringify({ version }),
          method: "POST",
        }
      ).catch(() => undefined);
      if (!compileResponse?.ok) {
        setStatus({ status: "error", error: "Compile failed." });
        return;
      }

      const compileResult = await compileResponse
        .json()
        .then((json) => json as CompileResponse)
        .catch(() => undefined);
      if (!compileResult || compileResult.error !== "") {
        setStatus({ status: "error", error: "Compile failed." });
        return;
      }

      setCode(Base64.toByteArray(compileResult.binary));
      setStatus({ status: "success" });
    },
    [id, setCode]
  );

  return [status, sourceCode, compile];
};
