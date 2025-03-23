import React, { SuspenseProps } from "react";

// Default fallback component
const DefaultFallback = () => <div className="p-2">Please Wait...</div>;

const SuspenseWrapper: React.FC<SuspenseProps> = ({ fallback, children, ...rest }) => {
  return (
    <React.Suspense fallback={fallback || <DefaultFallback />} {...rest}>
      {children}
    </React.Suspense>
  );
};

export default SuspenseWrapper;
