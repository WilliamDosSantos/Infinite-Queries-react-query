import { useMemo, useState } from "react";
import { useInfiniteQuery } from "react-query";
import styled from "styled-components";
import { Post } from "./components/Post";

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
  padding-bottom: 200px;
  padding-top: 30px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 80%;
`;

const Button = styled.button`
  padding: 10px;
  width: 300px;
  cursor: pointer;
  background-color: transparent;
  border: 1px solid;
  font-size: 22px;
  border-radius: 8px;

  &:hover {
    background-color: #f3f3f3;
  }
`;

const Input = styled.input`
  padding: 10px;
  width: 200px;
  background-color: transparent;
  border: 1px solid;
  font-size: 20px;
`;

const Loading = styled.div`
  width: 50px;
  height: 50px;
  border: 8px solid #f3f3f3;
  border-top: 10px solid;
  border-top-left-radius: 20px;
  border-top-right-radius: 20px;
  border-radius: 50%;
  animation: spinner 1.5s linear infinite;

  @keyframes spinner {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

const getPosts = async ({ pageParam, title = "" }) => {
  const titleParam = title ? `&title=${title.toLowerCase()}` : "";

  return await fetch(
    `https://jsonplaceholder.typicode.com/posts?_page=${pageParam}${titleParam}`
  ).then((res) => res.json());
};

function App() {
  const [title, setTitle] = useState("");

  const {
    data,
    isLoading,
    fetchNextPage,
    refetch,
    hasNextPage,
    isFetchingNextPage,
  } = useInfiniteQuery(
    ["/posts", [title]],
    ({ pageParam = 1 }) => getPosts({ pageParam, title }),
    {
      getNextPageParam: (lastPage, allPages) => {
        return lastPage.length ? allPages.length + 1 : undefined;
      },
    }
  );

  const items = useMemo(() => {
    return data?.pages.reduce((acc, page) => {
      return [...acc, ...page];
    }, []);
  }, [data]);

  return (
    <Container>
      <Input value={title} onChange={(e) => setTitle(e.target.value)} />
      <Content>
        {items?.map((item, i) => (
          <Post key={i} item={item} />
        ))}
      </Content>

      {(isLoading || isFetchingNextPage) && <Loading />}

      {hasNextPage && !title && (
        <Button onClick={fetchNextPage} disabled={isFetchingNextPage}>
          {isFetchingNextPage ? "Carregando..." : "Carregar Mais"}
        </Button>
      )}
    </Container>
  );
}

export default App;
