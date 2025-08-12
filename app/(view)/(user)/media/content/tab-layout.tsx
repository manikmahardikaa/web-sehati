/* eslint-disable @typescript-eslint/no-unused-vars */
import { Col, Flex, Row, Tabs, TabsProps } from "antd";

import CardFilm from "@/app/components/common/user/card/card-film";
import { useFilms } from "@/app/hooks/admin/film";
import { usePocketBooks } from "@/app/hooks/admin/pocket-book";
import CardPocketBook from "@/app/components/common/user/card/card-pocket-book";
import { useContentCreators } from "@/app/hooks/admin/content-creator";
import CardContentCreator from "@/app/components/common/user/card/card-content-creator";
import SearchBar from "@/app/components/common/search-bar";
import { useRouter } from "next/navigation";

export default function TabContent() {
  const { data: filmData } = useFilms({});
  const { data: pocketBookData } = usePocketBooks({});
  const { data: contentCreatorData } = useContentCreators({});
  const router = useRouter();

  const handleDetailPocketBook = (id: string) => {
    router.push(`/media/pocket-book/${id}`);
  };

  const tabItems: TabsProps["items"] = [
    {
      key: "1",
      label: "Film Pendek ",
      children: (
        <>
          <Flex justify="end">
            <SearchBar onSearch={() => {}} />
          </Flex>
          <Row gutter={[24, 24]} wrap>
            {filmData?.map((item) => (
              <Col key={item.id}>
                <CardFilm data={item} onClick={(id) => {}} />
              </Col>
            ))}
          </Row>
        </>
      ),
    },
    {
      key: "2",
      label: "Buku Saku",
      children: (
        <>
          <Flex justify="end">
            <SearchBar onSearch={() => {}} />
          </Flex>
          <Row>
            {pocketBookData?.map((book, index) => (
              <Col key={index}>
                <CardPocketBook
                  key={index}
                  data={book}
                  onClick={handleDetailPocketBook}
                />
              </Col>
            ))}
          </Row>
        </>
      ),
    },
    {
      key: "3",
      label: "Content Creator ODHIV",
      children: (
        <>
          <Flex justify="end">
            <SearchBar onSearch={() => {}} />
          </Flex>
          <Row>
            {contentCreatorData?.map((creator, index) => (
              <Col key={index}>
                <CardContentCreator
                  key={index}
                  data={creator}
                  onClick={(id) => {}}
                />
              </Col>
            ))}
          </Row>
        </>
      ),
    },
  ];
  return <Tabs defaultActiveKey="1" items={tabItems} />;
}
