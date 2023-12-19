import ECommerce from "@/components/Dashboard/E-commerce";
import { Metadata } from "next";
import Main from "@/components/Main/Main";

export const metadata: Metadata = {
  title: "EDUPLEX MANAGE SYSTEM",
  // description: "This is Home Blog page for TailAdmin Next.js",
  // other metadata
};

export default function Home() {
  return (
    <>
      <Main />
    </>
  );
}
