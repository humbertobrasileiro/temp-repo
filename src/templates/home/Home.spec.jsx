import React from "react";
import { rest } from "msw";
import { setupServer } from "msw/node";

import {
  render,
  screen,
  waitForElementToBeRemoved,
} from "@testing-library/react";
import { Home } from ".";

const handlers = [
  rest.get(
    "https://jsonplaceholder.typicode.com/posts",
    async (reg, res, ctx) => {
      return res(
        ctx.json([
          {
            userId: 1,
            id: 1,
            title: "title1",
            body: "body1",
          },
          {
            userId: 2,
            id: 2,
            title: "title2",
            body: "body2",
          },
          {
            userId: 3,
            id: 3,
            title: "title3",
            body: "body3",
          },
        ])
      );
    }
  ),
  rest.get(
    "https://jsonplaceholder.typicode.com/photos",
    async (reg, res, ctx) => {
      return res(
        ctx.json([
          {
            url: "img1.jpg",
          },
          {
            url: "img2.jpg",
          },
          {
            url: "img3.jpg",
          },
        ])
      );
    }
  ),
];

const server = setupServer(...handlers);

describe("<Home />", () => {
  beforeAll(() => {
    server.listen();
  });

  afterEach(() => server.resetHandlers());

  afterAll(() => {
    server.close();
  });

  it("should render search, posts and load more", async () => {
    const { debug } = render(<Home />);
    const noMorePosts = screen.getByText("Não existem Posts para pesquisa");

    expect.assertions(3);

    await waitForElementToBeRemoved(noMorePosts);

    const search = screen.getByPlaceholderText(/type your search/i);

    expect(search).toBeInTheDocument();

    const images = screen.getAllByRole("img", { name: /title/i });

    expect(images).toHaveLength(2);

    const button = screen.getByRole("button", { name: /load more posts/i });

    expect(button).toBeInTheDocument();

    debug();
  });
});
