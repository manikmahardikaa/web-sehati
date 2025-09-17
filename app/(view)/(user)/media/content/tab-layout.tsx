/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { useMemo, useState } from "react";
import { Col, Empty, Flex, Row, Tabs, TabsProps } from "antd";

import CardFilm from "@/app/components/common/user/card/card-film";
import { useFilms } from "@/app/hooks/admin/film";
import { usePocketBooks } from "@/app/hooks/admin/pocket-book";
import CardPocketBook from "@/app/components/common/user/card/card-pocket-book";
import { useContentCreators } from "@/app/hooks/admin/content-creator";
import CardContentCreator from "@/app/components/common/user/card/card-content-creator";
import SearchBar from "@/app/components/common/search-bar";
import { useRouter } from "next/navigation";

function includesQ(value: unknown, q: string) {
  if (!q) return true;
  const s = String(value ?? "").toLowerCase();
  return s.includes(q.toLowerCase().trim());
}

export default function TabContent() {
  const router = useRouter();

  // data dari hooks
  const { data: filmData = [] } = useFilms({});
  const { data: pocketBookData = [] } = usePocketBooks({});
  const { data: contentCreatorData = [] } = useContentCreators({});

  // query per tab
  const [qFilm, setQFilm] = useState("");
  const [qBook, setQBook] = useState("");
  const [qCreator, setQCreator] = useState("");

  // hasil filterx
  const filteredFilms = useMemo(
    () =>
      filmData.filter(
        (f) =>
          includesQ(f?.name, qFilm) ||
          includesQ(f?.description, qFilm)
      ),
    [filmData, qFilm]
  );

  const filteredBooks = useMemo(
    () =>
      pocketBookData.filter(
        (b) =>
          includesQ(b?.name, qBook) ||
          includesQ(b?.description, qBook)
      ),
    [pocketBookData, qBook]
  );

  const filteredCreators = useMemo(
    () =>
      contentCreatorData.filter(
        (c) => includesQ(c?.name, qCreator) || includesQ(c?.url, qCreator)
      ),
    [contentCreatorData, qCreator]
  );

  const handleDetailPocketBook = (id: string) => {
    router.push(`/media/pocket-book/${id}`);
  };

  const tabItems: TabsProps["items"] = [
    {
      key: "1",
      label: "Film Pendek",
      children: (
        <>
          <Flex justify="end" style={{ marginBottom: 16 }}>
            <SearchBar onSearch={(q) => setQFilm(q)} />
          </Flex>

          {filteredFilms.length === 0 ? (
            <Empty
              description={qFilm ? "Tidak ada film cocok" : "Belum ada film"}
            />
          ) : (
            <Row gutter={[24, 24]} wrap>
              {filteredFilms.map((item) => (
                <Col key={item.id} xs={12} sm={8} md={6} lg={6} xl={4}>
                  <CardFilm data={item} />
                </Col>
              ))}
            </Row>
          )}
        </>
      ),
    },
    {
      key: "2",
      label: "Buku Saku",
      children: (
        <>
          <Flex justify="end" style={{ marginBottom: 16 }}>
            <SearchBar onSearch={(q) => setQBook(q)} />
          </Flex>

          {filteredBooks.length === 0 ? (
            <Empty
              description={qBook ? "Tidak ada buku cocok" : "Belum ada buku"}
            />
          ) : (
            <Row gutter={[24, 24]} wrap>
              {filteredBooks.map((book) => (
                <Col key={book.id} xs={12} sm={8} md={6} lg={6} xl={4}>
                  <CardPocketBook
                    data={book}
                    onClick={handleDetailPocketBook}
                  />
                </Col>
              ))}
            </Row>
          )}
        </>
      ),
    },
    {
      key: "3",
      label: "Content Creator ODHIV",
      children: (
        <>
          <Flex justify="end" style={{ marginBottom: 16 }}>
            <SearchBar onSearch={(q) => setQCreator(q)} />
          </Flex>

          {filteredCreators.length === 0 ? (
            <Empty
              description={
                qCreator ? "Tidak ada kreator cocok" : "Belum ada kreator"
              }
            />
          ) : (
            <Row gutter={[24, 24]} wrap>
              {filteredCreators.map((creator) => (
                <Col key={creator.id} xs={12} sm={8} md={6} lg={6} xl={4}>
                  <CardContentCreator data={creator} />
                </Col>
              ))}
            </Row>
          )}
        </>
      ),
    },
  ];

  return <Tabs defaultActiveKey="1" items={tabItems} />;
}
