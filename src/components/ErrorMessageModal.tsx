import { Sheet } from "@mui/joy";

export const ErrorDetailModal = ({
  error,
  isOpen,
  setIsOpen,
}: {
  error: string;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}) => (
  <>
    {isOpen && (
      <>
        <Sheet
          onClick={() => setIsOpen(false)}
          sx={{
            top: 0,
            left: 0,
            width: "min(100dvw, 100vw)",
            height: "min(100dvh, 100vh)",
            position: "fixed",
            background: "rgba(0, 0, 0, 0.5)",
            zIndex: 3,
          }}
        ></Sheet>
        <Sheet
          variant="outlined"
          sx={{
            position: "absolute",
            zIndex: "4",
            width: "60rem",
            minWidth: "30rem",
            maxWidth: "calc(100vw - 10rem)",
            maxHeight: "30rem",
            overflow: "auto",
            top: "10.5rem",
            p: "1rem",
            borderRadius: "0.3rem",
            borderColor: "#FFBBBB",
            display: "flex",
            flexDirection: "column",
            boxShadow: "0px 3px 10px gray",
          }}
        >
          {error.split("\n").map((t) => (
            <code>{t}</code>
          ))}
        </Sheet>
      </>
    )}
  </>
);
