import { useEffect, useState } from "react";

const useEnter = () => {
  const [checkEnter, setCheckEnter] = useState<boolean>(true);

  useEffect(() => {
    setTimeout(() => {
      setCheckEnter(true);
    }, 1000);
  }, [checkEnter]);

  return checkEnter;
};

export default useEnter;
