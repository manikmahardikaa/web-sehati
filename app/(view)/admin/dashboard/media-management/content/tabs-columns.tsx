import CustomButton from "@/app/components/common/custom-button";
import SearchBar from "@/app/components/common/search-bar";
import { PlusOutlined } from "@ant-design/icons";
import { Flex, Form, Table, Tabs, TabsProps } from "antd";
import { useState } from "react";
import { FilmColumns } from "./columns-film";
import { PocketBookColumns } from "./columns-pocket-book";
import { ContentCreatorColumns } from "./columns-content-creator";
import FilmModal from "@/app/components/common/admin/modal/film";
import { useFilm, useFilms } from "@/app/hooks/admin/film";
import { FilmDataModel, FilmPayloadCreateModel } from "@/app/models/admin/film";
import { PocketBookDataModel } from "@/app/models/admin/pocket-book";
import PocketBookModal from "@/app/components/common/admin/modal/pocket-book";
import { usePocketBook, usePocketBooks } from "@/app/hooks/admin/pocket-book";
import {
  useContentCreator,
  useContentCreators,
} from "@/app/hooks/admin/content-creator";
import { ContentCreatorDataModel } from "@/app/models/admin/content-creator";
import ContentCreatorModal from "@/app/components/common/admin/modal/content-creator";

// interface TabContentProps {
//   data: ContentProps;
// }

// interface ContentProps {
//   films: Film[];
//   pocket_books: PocketBook[];
//   content_creators: ContentCreator[];
// }

enum TypeContent {
  FILM,
  POCKET_BOOK,
  CONTENT_CREATOR,
}

export const TabContent = () => {
  const [filmForm] = Form.useForm<FilmDataModel>();
  const [pocketBookForm] = Form.useForm<PocketBookDataModel>();
  const [contentCreatorForm] = Form.useForm<ContentCreatorDataModel>();
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<TypeContent>(
    TypeContent.FILM
  );
  const [modalType, setModalType] = useState<"create" | "update">("create");
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedPocketBook, setSelectedPocketBook] =
    useState<PocketBookDataModel | null>(null);
  const [selectedContentCreator, setSelectedContentCreator] =
    useState<ContentCreatorDataModel | null>(null);
  const [selectedFilm, setSelectedFilm] = useState<FilmDataModel | null>(null);

  const openModalWithTypeContent = (type: TypeContent) => {
    setSelectedType(type);
    setModalType("create");
    setModalOpen(true);
  };

  const {
    data: films = [],
    onCreate: createFilm,
    onCreateLoading: createLoadingFilm,
    onDelete: deleteFilm,
  } = useFilms({});
  const {
    data: pocketBooks = [],
    onCreate: createPocketBook,
    onCreateLoading: createLoadingPocketBook,
    onDelete: deletePocketBook,
  } = usePocketBooks({});
 
  const {
    data: contentCreators = [],
    onCreate: createContentCreator,
    onCreateLoading: createLoadingContentCreator,
    onDelete: deleteContentCreator,
  } = useContentCreators({});

  const { onUpdate: updateFilm, onUpdateLoading: updateLoadingFilm } = useFilm({
    id: "",
  });

  const {
    onUpdate: updatePocketBook,
    onUpdateLoading: updateLoadingPocketBook,
  } = usePocketBook({
    id: selectedPocketBook?.id ?? "",
  });

  const {
    onUpdate: updateContentCreator,
    onUpdateLoading: updateLoadingContentCreator,
  } = useContentCreator({ id: selectedContentCreator?.id ?? "" });

  const handleFinishFilm = async (values: FilmPayloadCreateModel) => {
    if (modalType === "create") {
      await createFilm(values);
    } else if (selectedType === TypeContent.FILM) {
      await updateFilm({
        id: selectedFilm?.id ?? "",
        payload: values,
      });
    }
    filmForm.resetFields();
    setModalOpen(false);
  };

  const handleFinishPocketBook = async (values: PocketBookDataModel) => {
    if (modalType === "create") {
      await createPocketBook(values);
    } else if (selectedType === TypeContent.POCKET_BOOK) {
      await updatePocketBook({
        id: selectedPocketBook?.id ?? "",
        payload: values,
      });
    }
    pocketBookForm.resetFields();
    setModalOpen(false);
  };

  const handleFinishContentCreator = async (
    values: ContentCreatorDataModel
  ) => {
    if (modalType === "create") {
      await createContentCreator(values);
    } else if (selectedType === TypeContent.CONTENT_CREATOR) {
      await updateContentCreator({
        id: selectedContentCreator?.id ?? "",
        payload: values,
      });
    }
    contentCreatorForm.resetFields();
    setModalOpen(false);
  };

  const handleEditFilm = (id: string) => {
    const toEdit = films.find((f) => f.id === id);
    if (toEdit) {
      filmForm.setFieldsValue(toEdit);
      setSelectedFilm(toEdit);
      console.log(toEdit);
      setSelectedType(TypeContent.FILM);
      setModalType("update");
      setModalOpen(true);
    }
  };

  const handleEditPocketBook = (id: string) => {
    const toEdit = pocketBooks.find((p) => p.id === id);
    if (toEdit) {
      pocketBookForm.setFieldsValue(toEdit);
      setSelectedType(TypeContent.POCKET_BOOK);
      setSelectedPocketBook(toEdit);
      setModalType("update");
      setModalOpen(true);
    }
  };

  const handleEditContentCreator = (id: string) => {
    const toEdit = contentCreators.find((c) => c.id === id);
    if (toEdit) {
      contentCreatorForm.setFieldsValue(toEdit);
      setSelectedType(TypeContent.CONTENT_CREATOR);
      setSelectedContentCreator(toEdit);
      setModalType("update");
      setModalOpen(true);
    }
  };

  const handleSearch = (keyword: string) => {
    setSearchKeyword(keyword.trim().toLowerCase());
  };

  const filteredFilm = films.filter((film) =>
    film.name.toLowerCase().includes(searchKeyword)
  );

  const filteredPocketBook = pocketBooks.filter((pocketBook) =>
    pocketBook.name.toLowerCase().includes(searchKeyword)
  );

  const filteredContentCreator = contentCreators.filter((contentCreator) =>
    contentCreator.name.toLowerCase().includes(searchKeyword)
  );

  const closeModalFilm = () => {
    filmForm.resetFields();
    setSelectedFilm(null);
    setModalOpen(false);
  };

  const closeModalPocketBook = () => {
    pocketBookForm.resetFields();
    setSelectedPocketBook(null);
    setModalOpen(false);
  };

  const closeModalContentCreator = () => {
    contentCreatorForm.resetFields();
    setSelectedContentCreator(null);
    setModalOpen(false);
  };

  const tabItems: TabsProps["items"] = [
    {
      key: "1",
      label: "Film Pendek",
      children: (
        <>
          <Flex justify="space-between" style={{ marginBottom: 16 }}>
            <SearchBar onSearch={handleSearch} />
            <CustomButton
              title="Tambah Film Pendek"
              icon={<PlusOutlined />}
              onClick={() => openModalWithTypeContent(TypeContent.FILM)}
            />
          </Flex>
          <Table
            columns={FilmColumns({
              onDelete: deleteFilm,
              onEdit: handleEditFilm,
            })}
            dataSource={filteredFilm}
          />
        </>
      ),
    },
    {
      key: "2",
      label: "Buku Saku",
      children: (
        <>
          <Flex justify="space-between" style={{ marginBottom: 16 }}>
            <SearchBar onSearch={handleSearch} />
            <CustomButton
              title="Tambah Buku Saku"
              icon={<PlusOutlined />}
              onClick={() => openModalWithTypeContent(TypeContent.POCKET_BOOK)}
            />
          </Flex>
          <Table
            columns={PocketBookColumns({
              onDelete: deletePocketBook,
              onEdit: handleEditPocketBook,
            })}
            dataSource={filteredPocketBook}
          />
        </>
      ),
    },
    {
      key: "3",
      label: "Konten Kreator",
      children: (
        <>
          <Flex justify="space-between" style={{ marginBottom: 16 }}>
            <SearchBar onSearch={handleSearch} />
            <CustomButton
              title="Tambah Konten Kreator"
              icon={<PlusOutlined />}
              onClick={() =>
                openModalWithTypeContent(TypeContent.CONTENT_CREATOR)
              }
            />
          </Flex>
          <Table
            columns={ContentCreatorColumns({
              onDelete: deleteContentCreator,
              onEdit: handleEditContentCreator,
            })}
            dataSource={filteredContentCreator}
          />
        </>
      ),
    },
  ];
  return (
    <div>
      <div>
        <Tabs defaultActiveKey="1" items={tabItems} />
      </div>
      <div>
        {
          selectedType === TypeContent.FILM ? (
            <FilmModal
              open={modalOpen}
              onClose={closeModalFilm}
              type={modalType}
              form={filmForm}
              handleFinish={handleFinishFilm}
              loadingCreate={createLoadingFilm}
              loadingUpdate={updateLoadingFilm}
            />
          ) : selectedType === TypeContent.POCKET_BOOK ? (
            <PocketBookModal
              open={modalOpen}
              onClose={closeModalPocketBook}
              type={modalType}
              form={pocketBookForm}
              handleFinish={handleFinishPocketBook}
              loadingCreate={createLoadingPocketBook}
              loadingUpdate={updateLoadingPocketBook}
            />
          ) : selectedType === TypeContent.CONTENT_CREATOR ? ( //   type={modalType} //   onClose={() => setModalOpen(false)} //   open={modalOpen} // <ContentCreatorModal
            <ContentCreatorModal
              open={modalOpen}
              onClose={closeModalContentCreator}
              type={modalType}
              form={contentCreatorForm}
              handleFinish={handleFinishContentCreator}
              loadingCreate={createLoadingContentCreator}
              loadingUpdate={updateLoadingContentCreator}
            />
          ) : null // Sementara, jika belum diimplementasikan
        }
      </div>
    </div>
  );
};
