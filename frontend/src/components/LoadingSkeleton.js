import * as React from "react";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

const LoadingSkeleton = () => {
  return (
    <Box sx={{ width: "100%" }}>
      <Skeleton
        variant="text"
        width="100%"
        height={30}
        sx={{ borderRadius: "12px" }}
      />
      <Skeleton
        variant="text"
        width="100%"
        height={30}
        sx={{ borderRadius: "12px" }}
      />
      <Skeleton
        variant="text"
        width="100%"
        height={30}
        sx={{ borderRadius: "12px" }}
      />
      <Skeleton
        variant="text"
        width="100%"
        height={30}
        sx={{ borderRadius: "12px" }}
      />
      <Skeleton
        variant="text"
        width="100%"
        height={30}
        sx={{ borderRadius: "12px" }}
      />
    </Box>
  );
};

export default LoadingSkeleton;
