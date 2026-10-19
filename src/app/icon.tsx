import { ImageResponse } from "next/og";

export const size = {
  width: 64,
  height: 64,
};
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "radial-gradient(circle at 45% 35%, #2a0b16 0%, #120408 65%, #080204 100%)",
          borderRadius: "16px",
          border: "2px solid rgba(216, 131, 142, 0.4)",
          position: "relative",
          boxShadow: "0 4px 12px rgba(0, 0, 0, 0.6)",
        }}
      >
        <span
          style={{
            fontFamily: "serif",
            fontSize: "34px",
            fontStyle: "italic",
            fontWeight: "700",
            letterSpacing: "-2px",
            background: "linear-gradient(135deg, #ffffff 0%, #f4c2c8 30%, #d8838e 70%, #9e1f36 100%)",
            backgroundClip: "text",
            color: "transparent",
            display: "flex",
            lineHeight: 1,
            textShadow: "0 2px 8px rgba(216, 131, 142, 0.5)",
          }}
        >
          SC
        </span>
        <div
          style={{
            position: "absolute",
            top: "6px",
            right: "7px",
            width: "5px",
            height: "5px",
            borderRadius: "50%",
            backgroundColor: "#ffffff",
            boxShadow: "0 0 6px #d8838e",
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
