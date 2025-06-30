import type { ThemeConfig } from "antd";

const antdTheme: ThemeConfig = {
  cssVar: true,
  token: {
    // Ukuran huruf sedikit lebih besar supaya nyaman dibaca
    fontSize: 16,
    colorPrimary: "#1890ff", // Biru soft, khas dashboard modern
    colorLink: "#1677ff", // Warna link
    colorLinkHover: "#69b1ff", // Warna link saat hover
    colorText: "#1f1f1f", // Hitam soft, tidak terlalu keras
    colorTextSecondary: "#8c8c8c", // Abu untuk teks sekunder
    colorBgLayout: "#f5f5f5", // Latar belakang halaman
    colorBgContainer: "#ffffff", // Warna container (misal card)
    borderRadius: 8, // Semua border sedikit membulat
    padding: 16, // Padding standar di elemen
  },
  components: {
    Layout: {
      headerHeight: 64,
      bodyBg: "#f5f5f5",
      siderBg: "#001529", // Dark blue khas Ant Design sidebar
    },
    Menu: {
      itemBorderRadius: 6,
      itemSelectedColor: "#ffffff", // Teks menu saat dipilih
      itemSelectedBg: "#1677ff", // Background menu saat aktif
      itemHoverBg: "#e6f7ff", // Background saat hover
    },
    Button: {
      borderRadius: 6,
      colorPrimaryHover: "#40a9ff", // Button hover lebih terang
    },
    Table: {
      headerBg: "#fafafa",
      headerColor: "#1f1f1f",
      rowHoverBg: "#f0f5ff",
      borderColor: "#f0f0f0",
    },
    Input: {
      borderRadius: 6,
    },
    Card: {
      borderRadius: 10,
      padding: 24,
    },
  },
};

export default antdTheme;
