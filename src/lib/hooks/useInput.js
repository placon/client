import { useState, useCallback } from "react";

export default function useInput(initialValue = "") {
  const [value, setter] = useState(initialValue);
  const handler = useCallback((e) => {
    setter(e.target.value);
  }, []);
  return [value, handler];
}
