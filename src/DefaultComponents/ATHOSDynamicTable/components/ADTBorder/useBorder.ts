import { useEffect } from "react";
import { v4 } from "uuid";
import { useADTContext } from "../../context";

export const useADTBorder = (colID: string) => {
  const wrapperid = v4().toString();
  const id = v4().toString();

  //const [doubleClicked, setDoubleClicked] = useState(false);
  const {
    props: { paddingBetweenColumns },
  } = useADTContext();
  useEffect(() => {
    //if (!doubleClicked) return;
    const BRDWrapperDiv = document.getElementById(wrapperid);
    const BRD = document.getElementById(id);
    const ColDiv = document.getElementById(colID);
    if (!BRDWrapperDiv || !ColDiv || !BRD) return;

    const onMouseMove = (e: MouseEvent) => {
      const pageX = e.pageX;
      const BRDWrapperDivRect = BRDWrapperDiv.getBoundingClientRect();
      const ColDivRect = ColDiv.getBoundingClientRect();
      const ColDivWidth = ColDivRect.width;
      const Plus = Math.round(
        pageX -
          (BRDWrapperDivRect.right +
            (paddingBetweenColumns ? paddingBetweenColumns * 2 - 5 : 8))
      ); //+20 to centralize in the cursor
      const newWidth = ColDivWidth + Plus;
      ColDiv.style.width = `${newWidth}px`;
    };

    const onMouseDown = (e: MouseEvent) => {
      e.preventDefault();
      document.addEventListener("mousemove", onMouseMove);
    };

    BRDWrapperDiv.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mouseup", () => {
      document.removeEventListener("mousemove", onMouseMove);
      //BRDWrapperDiv.removeEventListener("mousedown", onMouseDown);
    });

    return () => {
      BRDWrapperDiv.removeEventListener("mousedown", onMouseDown);
      document.removeEventListener("mouseup", () => {
        document.removeEventListener("mousemove", onMouseMove);
      });
    };
  }, []);
  //}, [doubleClicked]);

  //return { wrapperid, id, doubleClicked, setDoubleClicked };
  return { wrapperid, id };
};
