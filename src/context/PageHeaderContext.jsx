import { createContext, useContext, useEffect, useMemo, useState } from "react";

const PageHeaderContext = createContext(null);

export function PageHeaderProvider({ children }) {
  const [header, setHeader] = useState(null);
  const value = useMemo(() => ({ header, setHeader }), [header]);

  return (
    <PageHeaderContext.Provider value={value}>
      {children}
    </PageHeaderContext.Provider>
  );
}

export function usePageHeaderValue() {
  return useContext(PageHeaderContext);
}

export function usePageHeader(title, subtitle) {
  const ctx = useContext(PageHeaderContext);

  useEffect(() => {
    if (!ctx) return;
    ctx.setHeader({ title, subtitle });
    return () => ctx.setHeader(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [title, subtitle]);
}
