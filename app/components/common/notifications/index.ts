import { notification } from "antd";


type notificationProps = {
  type: "success" | "error";
  entity: string;
  action: string;
};

export default function MainNotification({
  type,
  entity,
  action,
}: notificationProps) {
  const generalNotification = {
    success: {
      message: "Berhasil!",
      description: `Selamat! ${entity.toLowerCase()} berhasil di${action.toLowerCase()}!`,
    },
    error: {
      message: "Terjadi Kesalahan!",
      description: `Ups! Terjadi kesalahan pada ${entity.toLowerCase()}. Gagal melakukan ${action.toLowerCase()} saat ini. Silakan coba lagi nanti atau hubungi dukungan jika masalah berlanjut.`,
    },
  };

  return notification[type]({
    message: generalNotification[type].message,
    description: generalNotification[type].description,
  });
}
