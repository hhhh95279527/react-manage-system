import React, { Suspense } from "react";
import { Spin } from "antd";
export const lazyLoad = (
  Component: React.LazyExoticComponent<React.FC>,
): React.ReactNode => {
  return (
    <Suspense
      fallback={
        <Spin
          size="small"
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            height: "100%",
          }}
        />
      }
    >
      <Component />
    </Suspense>
  );
};
