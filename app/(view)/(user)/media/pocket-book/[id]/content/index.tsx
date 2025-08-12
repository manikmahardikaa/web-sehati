import FlipBook from "@/app/components/common/user/filp-book";
import { usePocketBook } from "@/app/hooks/admin/pocket-book";
import { useParams } from "next/navigation";

export default function Content() {
  const params = useParams();
  const id = params.id as string;
  const { data } = usePocketBook({ id: id });
  return <div>{data && <FlipBook url={data.url} name={data.name} />}</div>;
}
