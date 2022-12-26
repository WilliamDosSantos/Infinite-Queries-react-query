import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  box-shadow: 0 1px 2px;
  padding: 10px;
`;

const Title = styled.h3`
  text-transform: capitalize;
`;

export const Post = ({ item }) => {
  return (
    <Container>
      <Title>{item.title}</Title>
      <span>{item.body}</span>
    </Container>
  );
};
