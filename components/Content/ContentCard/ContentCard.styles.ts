import type { SxProps, Theme } from "@mui/material/styles";

/** Estilos separados del componente para que el JSX quede legible. */
export const cardSx: SxProps<Theme> = {
  maxWidth: 345,
  height: "100%",
  display: "flex",
  flexDirection: "column",
  backgroundColor: "rgba(128, 2, 2, 0.47)",
  color: "white",
  boxShadow: "0 6px 15px rgb(255, 0, 0)",
  transition: "all 0.3s ease",
  "&:hover": {
    transform: "scale(1.05)",
    boxShadow: "0 12px 24px rgb(255, 0, 0)",
  },
};

export const mediaSx: SxProps<Theme> = {
  height: 200,
  width: "100%",
  objectFit: "cover",
  borderTopLeftRadius: 8,
  borderTopRightRadius: 8,
};

export const titleSx: SxProps<Theme> = {
  fontWeight: "bold",
  fontSize: "1rem",
  overflow: "hidden",
  textOverflow: "ellipsis",
  whiteSpace: "nowrap",
};

export const expandIconSx = (expanded: boolean): SxProps<Theme> => ({
  transform: expanded ? "rotate(180deg)" : "rotate(0deg)",
  transition: "transform 0.3s ease",
});
