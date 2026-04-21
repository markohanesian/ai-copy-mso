import * as React from "react";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

const LoadingSkeleton = () => {
  return (
    <Box sx={{ width: "100%", display: 'flex', flexDirection: 'column', gap: 1.5 }}>
      <Skeleton
        variant="text"
        width="100%"
        height={32}
        sx={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: 1 }}
      />
      <Skeleton
        variant="text"
        width="90%"
        height={32}
        sx={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: 1 }}
      />
      <Skeleton
        variant="text"
        width="95%"
        height={32}
        sx={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: 1 }}
      />
      <Skeleton
        variant="text"
        width="60%"
        height={32}
        sx={{ backgroundColor: 'rgba(255, 255, 255, 0.05)', borderRadius: 1 }}
      />
    </Box>
  );
};

export default LoadingSkeleton;
