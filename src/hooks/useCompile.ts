import { useCallback, useState } from "react";
import { Version } from "./useVersions";
import Base64 from "base64-js";

export type CompileStatus = {
  status: "idle" | "compile" | "success" | "error";
  error?: string;
};
type Compile = (version: Version) => void;

export const useCompile = (
  id: string | undefined,
  setCode: (code: Uint8Array) => void
): [status: CompileStatus, compile: Compile] => {
  const [status, setStatus] = useState<CompileStatus>({
    status: "idle",
  });

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

      const compileResult = (await compileResponse.json()) as {
        binary: string;
        error: string;
      };
      if (compileResult.error !== "") {
        setStatus({ status: "error", error: "Compile failed." });
        return;
      }

      setCode(Base64.toByteArray(compileResult.binary));
      setStatus({ status: "success" });
    },
    [id, setCode]
  );

  return [status, compile];
};
