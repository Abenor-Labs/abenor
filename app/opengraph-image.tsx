import { ImageResponse } from "next/og";

// Required by output: "export" — render the card to a PNG at build time.
export const dynamic = "force-static";

export const alt =
  "Abenor — we take the one task still eating your week and turn it into software";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

const PAPER = "#fafaf9";
const INK = "#1c1917";
const POSTER = "#c8102e";

const MONO = {
  fontSize: 20,
  letterSpacing: 3,
  textTransform: "uppercase" as const,
};

function CropMark({ style }: { style: React.CSSProperties }) {
  return (
    <div
      style={{
        position: "absolute",
        width: 22,
        height: 22,
        borderColor: "#d6d3d1",
        ...style,
      }}
    />
  );
}

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: PAPER,
          color: INK,
          padding: "56px 64px",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            height: 8,
            background: POSTER,
          }}
        />

        <CropMark style={{ top: 34, left: 34, borderLeft: "1px solid #d6d3d1", borderTop: "1px solid #d6d3d1" }} />
        <CropMark style={{ top: 34, right: 34, borderRight: "1px solid #d6d3d1", borderTop: "1px solid #d6d3d1" }} />
        <CropMark style={{ bottom: 34, left: 34, borderLeft: "1px solid #d6d3d1", borderBottom: "1px solid #d6d3d1" }} />
        <CropMark style={{ bottom: 34, right: 34, borderRight: "1px solid #d6d3d1", borderBottom: "1px solid #d6d3d1" }} />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            ...MONO,
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <span>Abenor</span>
            <div
              style={{
                width: 12,
                height: 12,
                marginLeft: 10,
                background: POSTER,
              }}
            />
          </div>
          <span style={{ color: "#6b6461" }}>Software studio · Est 2026 · IST</span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              display: "flex",
              fontSize: 62,
              lineHeight: 1.1,
              letterSpacing: -2,
              maxWidth: 1000,
            }}
          >
            We take the one task still eating your week and turn it into
            software that runs without you.
          </div>
          <div
            style={{
              width: 96,
              height: 6,
              marginTop: 34,
              background: POSTER,
            }}
          />
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            borderTop: "1px solid #e7e5e4",
            paddingTop: 18,
            color: "#6b6461",
            ...MONO,
            fontSize: 18,
          }}
        >
          <span>Workflow automation</span>
          <span>Websites</span>
          <span>iOS &amp; Android apps</span>
          <span>Internal tools</span>
        </div>
      </div>
    ),
    size
  );
}
