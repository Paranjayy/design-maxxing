import { ImageResponse } from "next/og";

export const runtime = "edge";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#080808",
          color: "white",
          fontFamily: "system-ui",
        }}
      >
        <div
          style={{
            fontSize: 64,
            fontWeight: 800,
            letterSpacing: "-0.02em",
          }}
        >
          design maxxing
        </div>
        <div
          style={{
            fontSize: 28,
            color: "#a78bfa",
            marginTop: 16,
          }}
        >
          436 web dev projects, all browsable
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 630,
    }
  );
}
