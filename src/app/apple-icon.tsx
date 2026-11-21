import { ImageResponse } from "next/og";

export const size = {
  width: 180,
  height: 180,
};
export const contentType = "image/png";

export default function AppleIcon() {
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
          borderRadius: "40px",
          border: "4px solid rgba(216, 131, 142, 0.4)",
          position: "relative",
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.6)",
        }}
      >
        <span
          style={{
            fontFamily: "serif",
            fontSize: "96px",
            fontStyle: "italic",
            fontWeight: "700",
            letterSpacing: "-4px",
            background: "linear-gradient(135deg, #ffffff 0%, #f4c2c8 30%, #d8838e 70%, #9e1f36 100%)",
            backgroundClip: "text",
            color: "transparent",
            display: "flex",
            lineHeight: 1,
            textShadow: "0 4px 16px rgba(216, 131, 142, 0.5)",
          }}
        >
          SC
        </span>
        <div
          style={{
            position: "absolute",
            top: "16px",
            right: "18px",
            width: "14px",
            height: "14px",
            borderRadius: "50%",
            backgroundColor: "#ffffff",
            boxShadow: "0 0 12px #d8838e",
          }}
        />
      </div>
    ),
    {
      ...size,
    }
  );
}
