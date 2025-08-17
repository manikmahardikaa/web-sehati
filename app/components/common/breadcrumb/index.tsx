"use client";

import { toCapitalized } from "@/app/utils/capitalized";
import { Breadcrumb } from "antd";
import { usePathname } from "next/navigation";

export const MainBreadcrumb = () => {
  const pathname = usePathname();

  const pathnameList = pathname.split("/").filter((item) => item);

  const breadcrumbItems = pathnameList.map((item, index) => {
    const isLast = index === pathnameList.length - 1;
    return {
      title: isLast ? (
        toCapitalized(item)
      ) : (
        <span>{toCapitalized(item)}</span>
      ),
    };
  });

  return (
    <Breadcrumb
      style={{ fontSize: 14 }}
      items={breadcrumbItems}
      separator=">"
    />
  );
};
