import { useCallback, useLayoutEffect, useState } from "react";

const useAutosizeTextArea = ({
  ref: textAreaRef,
  value,
  minHeight = 0,
  maxHeight,
}: {
  ref: HTMLTextAreaElement | null;
  value: any;
  minHeight?: number;
  maxHeight?: number;
}) => {
  const [forceResize, setForceResize] = useState(1);

  const forceAutoResize = useCallback(() => {
    setForceResize((prev) => prev + 1);
  }, []);

  useLayoutEffect(() => {
    if (textAreaRef && forceResize) {
      textAreaRef.style.height = "0px";
      const scrollHeight = textAreaRef.scrollHeight;

      let targetHeight = Math.max(scrollHeight, minHeight) + "px";

      if (maxHeight && scrollHeight > maxHeight) {
        targetHeight = maxHeight + "px";
        textAreaRef.style.overflow = "scroll";
      }

      textAreaRef.style.height = targetHeight;
    }
  }, [forceResize, maxHeight, minHeight, textAreaRef, value]);

  useLayoutEffect(() => {
    forceAutoResize();
  }, [forceAutoResize]);

  return { forceAutoResize };
};

export default useAutosizeTextArea;
