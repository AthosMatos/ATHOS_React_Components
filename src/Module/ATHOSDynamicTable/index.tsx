import { AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { ATHOSResizableDiv } from "../ATHOSResizableDiv";
import ADTSelectedRowsToast from "./components/ADTSelectedRowsToast";
import { ADTProvider } from "./context";
import { DynamicTableProps } from "./interfaces";
import { ADTTableWrapper } from "./styled";
import { PersistantTable, Table } from "./Table";

function hasScroll(element: HTMLElement) {
  return element.scrollWidth > element.clientWidth;
}

/**
 * `columns` is optional, if not provided, it will use the keys of the first object in `data`,
 * but if provided, it will use the keys in the order of the array.
 */
export function ATHOSDynamicTable<T>(props: DynamicTableProps<T>) {
  const tableId = `${props.tableName}-athos-dynamic-table`;
  const tableWrapperId = `${props.tableName}-athos-dynamic-table-wrapper`;

  const [shouldRenderPersistantTable, setShouldRenderPersistantTable] =
    useState(false);

  useEffect(() => {
    if (!props.persistPrimaryColumn) return;
    const tableWrapper = document.getElementById(tableWrapperId);

    if (!tableWrapper) return;

    const observerCallback: ResizeObserverCallback = (
      entries: ResizeObserverEntry[]
    ) => {
      window.requestAnimationFrame((): void | undefined => {
        if (!Array.isArray(entries) || !entries.length) {
          return;
        }
        if (tableWrapper && hasScroll(tableWrapper)) {
          setShouldRenderPersistantTable(true);
        } else {
          setShouldRenderPersistantTable(false);
        }
      });
    };
    const resizeObserver = new ResizeObserver(observerCallback);

    resizeObserver.observe(tableWrapper);
    return () => {
      resizeObserver.disconnect();
    };
  }, [tableWrapperId]);

  const Comp = (stly?: boolean) => {
    return (
      <ADTProvider props={props}>
        <ADTSelectedRowsToast />
        <ADTTableWrapper
          resizable={props.resizeable}
          style={stly ? props.style : undefined}
        >
          <AnimatePresence>
            {shouldRenderPersistantTable && (
              <PersistantTable tableWrapperId={tableWrapperId} />
            )}
          </AnimatePresence>
          <div
            id={tableWrapperId}
            style={shouldRenderPersistantTable ?{
              position: "static",
              overflowX: "auto",
              overflowY: "hidden",
              width: "100%",
            }: undefined}
          >
            <Table />
          </div>
        </ADTTableWrapper>
      </ADTProvider>
    );
  };

  if (props.resizeable) {
    return (
      <ATHOSResizableDiv
        saveInLocalStorage={tableId}
        withToogle
        style={props.style}
      >
        {Comp()}
      </ATHOSResizableDiv>
    );
  } else {
    return Comp(true);
  }
}
