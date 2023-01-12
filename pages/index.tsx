import { useEffect } from "react";
import { useRouter } from "next/router";

export default () => {
  const { push } = useRouter();
  useEffect(() => {
    push("/t7/fd/!generic");
  }, []);
  return null;
};
