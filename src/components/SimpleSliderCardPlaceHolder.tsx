import React from "react";
import styled from "styled-components";
import chroma from "chroma-js";
import settings from "../settings";

const SimpleSliderCardSkeleton = () => {
  return (
    <SimpleCardSkeletonContainer aria-label="Loading movie card">
      <SimpleCardImageSkeleton />
    </SimpleCardSkeletonContainer>
  );
};

const SimpleCardSkeletonContainer = styled.div`
  margin-left: 2px;
  margin-right: 2px;
  transition: transform 0.3s ease, box-shadow 0.3s ease, rotate 0.3s ease;
  border-radius: 5px;
  background-color: ${settings.colors
    .background}; // Assuming you have a background color in settings
`;

const SimpleCardImageSkeleton = styled.div`
  border-radius: 5px;
  height: 160px;
  width: 110px;
  background-color: ${chroma(settings.colors.background)
    .darken(0.1)
    .css()}; // Slightly darker than the container for contrast
`;

export default SimpleSliderCardSkeleton;
