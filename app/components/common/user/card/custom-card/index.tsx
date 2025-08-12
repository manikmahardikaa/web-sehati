import { Card, Button } from "antd";

export default function CustomCard({
  title,
  icon,
  titleButton,
  onClick,
}: {
  title: string;
  icon: React.ReactNode;
  titleButton: string;
  onClick: () => void;
}) {
  return (
    <Card
      style={{
        borderRadius: 16,
        boxShadow: "0 4px 16px 0 rgba(220, 38, 38, 0.07)",
        padding: 0,
        textAlign: "center",
        border: "none",
        background: "#fff",
      }}
      bodyStyle={{
        padding: 24,
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      {/* ICON */}
      <div style={{ marginBottom: 8, fontSize: 36, color: "#d41c1c" }}>
        {icon}
      </div>
      {/* TITLE */}
      <div
        style={{
          fontWeight: 600,
          fontSize: 17,
          marginBottom: 18,
          color: "#1a1a1a",
        }}
      >
        {title}
      </div>
      {/* BUTTON */}
      <Button
        type="primary"
        onClick={onClick}
        style={{
          background: "#d41c1c",
          borderColor: "#d41c1c",
          borderRadius: 8,
          fontWeight: 500,
          fontSize: 15,
          marginTop: 12,
          width: "100%",
        }}
        size="large"
      >
        {titleButton}
      </Button>
    </Card>
  );
}
