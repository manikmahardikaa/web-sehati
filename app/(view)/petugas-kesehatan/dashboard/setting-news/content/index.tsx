import { useNewies, useNews } from "@/app/hooks/petugas-kesehatan/news";
import {
  NewsDataModel,
  NewsPayloadCreateModel,
} from "@/app/models/petugas-kesehatan/news";
import { Flex, Form, Table } from "antd";
import { useCallback, useMemo, useState } from "react";
import { NewsColumns } from "./columns";
import Title from "antd/es/typography/Title";
import SearchBar from "@/app/components/common/search-bar";
import CustomButton from "@/app/components/common/custom-button";
import { PlusOutlined } from "@ant-design/icons";
import NewsModal from "@/app/components/common/petugas-kesehatan/modal/news";

export default function NewsManagementContent() {
  const [form] = Form.useForm<NewsDataModel>();
  const [modalOpen, setModalOpen] = useState(false);
  const [modalType, setModalType] = useState<"create" | "update">("create");
  const [selectedNews, setSelectedNews] = useState<NewsDataModel | null>(null);
  const [searchKeyword, setSearchKeyword] = useState("");

  const {
    data: news = [],
    onCreate: createNews,
    onCreateLoading: createNewsLoading,
    onDelete: deleteNews,
  } = useNewies({});

  const { onUpdate: updateNews, onUpdateLoading: updateNewsLoading } = useNews({
    id: selectedNews?.id ?? "",
  });

  const handleEdit = useCallback(
    (id: string) => {
      const toEdit = news.find((c) => c.id === id);
      if (toEdit) {
        form.setFieldsValue(toEdit);
        setSelectedNews(toEdit);
        setModalType("update");
        setModalOpen(true);
      }
    },
    [news, form]
  );

  const columns = useMemo(
    () =>
      NewsColumns({
        onDelete: (id: string) => deleteNews(id),
        onEdit: handleEdit,
      }),
    [deleteNews, handleEdit]
  );

  const handleFinish = useCallback(
    async (values: NewsPayloadCreateModel) => {
      if (modalType === "create") {
        await createNews(values);
      } else if (selectedNews?.id) {
        await updateNews({ id: selectedNews.id, payload: values });
      }
      form.resetFields();
      setSelectedNews(null);
      setModalOpen(false);
      setModalType("create");
    },
    [createNews, form, modalType, selectedNews, updateNews]
  );

  const handleSearch = (keyword: string) => {
    setSearchKeyword(keyword.trim().toLowerCase());
  };

  const filteredNews = news.filter((news) =>
    news.name.toLowerCase().includes(searchKeyword)
  );

  const handleAdd = useCallback(() => {
    form.resetFields();
    setModalType("create");
    setSelectedNews(null);
    setModalOpen(true);
  }, [form]);

  const handleCloseModal = useCallback(() => {
    form.resetFields();
    setModalOpen(false);
    setSelectedNews(null);
    setModalType("create");
  }, [form]);
  return (
    <div>
      <Title level={4}>Data Berita</Title>
      <div style={{ marginBottom: 24 }}>
        <Flex justify="space-between">
          <SearchBar onSearch={handleSearch} />
          <CustomButton
            icon={<PlusOutlined />}
            title="Tambah Data Berita"
            onClick={handleAdd}
          />
        </Flex>
      </div>
      <Table columns={columns} dataSource={filteredNews} rowKey="id" />
      <NewsModal
        open={modalOpen}
        onClose={handleCloseModal}
        handleFinish={handleFinish}
        loadingCreate={createNewsLoading}
        loadingUpdate={updateNewsLoading}
        form={form}
        type={modalType}
        initialValues={selectedNews ?? undefined}
      />
    </div>
  );
}
