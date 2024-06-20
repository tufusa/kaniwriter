import { useEffect, useState } from "react";

export type Version = string;
type Status = "idle" | "load" | "success" | "error";
type GetVersionsResponse = { version: Version }[];

export const useVersions = (): [versions: Version[], status: Status] => {
  const [versions, setVersions] = useState<Version[]>([]);
  const [status, setStatus] = useState<Status>("idle");

  const getVersions = async () => {
    setStatus("load");
    const res = await fetch(
      `${import.meta.env.VITE_COMPILER_URL}/versions`
    ).catch(() => undefined);
    if (!res?.ok) {
      setVersions([]);
      setStatus("error");
      return;
    }

    const versionsData: GetVersionsResponse = await res.json();
    setVersions(versionsData.map((record) => record.version));
    setStatus("success");
  };

  useEffect(() => {
    getVersions();
  }, []);

  return [versions, status];
};
