import { Card } from "antd";

interface CustomCardProps {
  width: string;
  height: string;
  color: string;
  title: string;
  icon: React.ReactNode;
}

export const CustomCard = ({
  width,
  height,
  color,
  title,
}: CustomCardProps) => {
  return <Card style={{ width, height, color }}>{title}</Card>;
};
