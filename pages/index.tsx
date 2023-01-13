import { useEffect } from "react";
import { useRouter } from "next/router";

const IndexPage = () => {
  const { push } = useRouter();
  useEffect(() => {
    push("/t7/fd/generic");
  }, [push]);
  return null;
};

export default IndexPage;