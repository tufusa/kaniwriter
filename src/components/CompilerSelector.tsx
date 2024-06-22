import { Select, Option } from "@mui/joy";
import { SxProps } from "@mui/joy/styles/types";
import { Version } from "hooks/useVersions";
import { useTranslation } from "react-i18next";

type Props = {
  versions: Version[];
  defaultVersion: string;
  disabled?: boolean;
  onChange?: (version: Version) => void;
  sx?: SxProps;
};

export const CompilerSelector = ({
  versions,
  defaultVersion,
  disabled,
  onChange,
  sx,
}: Props) => {
  const [t] = useTranslation();

  return (
    <Select
      variant="soft"
      placeholder={t("コンパイラを選択")}
      onChange={(_, value) => {
        if (onChange && typeof value === "string") {
          onChange(value);
        }
      }}
      defaultValue={defaultVersion}
      sx={{
        pl: "1rem",
        ...sx,
      }}
      disabled={disabled}
    >
      {versions.map((version) => (
        <Option value={version} key={version}>
          mrbc {version}
        </Option>
      ))}
    </Select>
  );
};
