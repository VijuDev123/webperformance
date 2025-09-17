import React from "react";
import styled from "styled-components";

const MovieCardSkeletonContainer = styled.div`
  display: flex;
  width: calc(50% - 20px);
  height: 240px;
  background-color: #ddd;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  border-radius: 4px;
  overflow: hidden;
  margin: 10px;
`;

const ImageSkeleton = styled.div`
  width: 158px;
  height: 238px;
  background-color: #ccc;
`;

const SummarySkeleton = styled.div`
  padding: 10px;
  flex-grow: 4;
  display: flex;
  flex-direction: column;
`;

const LineSkeleton = styled.div`
  height: 1em;
  background-color: #bbb;
  width: 60%;
  margin-bottom: 0.5em;
  border-radius: 4px;
`;

export default function MovieCardSkeleton() {
  return (
    <MovieCardSkeletonContainer>
      <ImageSkeleton />
      <SummarySkeleton>
        <LineSkeleton style={{ width: "80%" }} />
        <LineSkeleton />
        <LineSkeleton style={{ width: "90%" }} />
        <LineSkeleton style={{ width: "70%" }} />
      </SummarySkeleton>
    </MovieCardSkeletonContainer>
  );
}
