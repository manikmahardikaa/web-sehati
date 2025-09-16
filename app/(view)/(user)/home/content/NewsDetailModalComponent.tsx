"use client";

import { Modal, Typography, Image } from "antd";

const { Title } = Typography;

export type NewsItem = {
  id: string;
  name: string;
  body?: string; // HTML string
  thumbnail_url?: string;
  createdAt?: string;
};

export default function NewsDetailModal({
  open,
  onClose,
  news,
}: {
  open: boolean;
  onClose: () => void;
  news?: NewsItem | null;
}) {
  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width={900}
      destroyOnClose
      title={null}
    >
      {news && (
        <div>
          <Title level={3} style={{ marginBottom: 12 }}>
            {news.name}
          </Title>

          {news.thumbnail_url ? (
            <Image
              src={news.thumbnail_url}
              alt={news.name}
              style={{ width: "100%", borderRadius: 12, marginBottom: 16 }}
              preview={false}
            />
          ) : null}

          {/* body adalah HTML dari backend */}
          <div
            style={{ lineHeight: 1.8, fontSize: 16 }}
            dangerouslySetInnerHTML={{ __html: news.body ?? "" }}
          />
        </div>
      )}
    </Modal>
  );
}
