/* eslint-disable react/react-in-jsx-scope */
import { render, screen } from "@testing-library/react";
import { PostCard } from ".";
import { postCardPropsMock } from "./postCardMock";

const props = postCardPropsMock;

describe("<PostCard />", () => {
  it("should render PostCard correctly", () => {
    render(<PostCard {...props} />);

    expect(screen.getByRole("img", { name: /TITLE/i })).toHaveAttribute(
      "src",
      "img/img.png"
    );
    expect(
      screen.getByRole("heading", { name: "title 1 1" })
    ).toBeInTheDocument();
    expect(screen.getByText("body 1")).toBeInTheDocument();
  });

  it("should match snapshot", () => {
    const { container } = render(<PostCard {...props} />);
    expect(container.firstChild).toMatchSnapshot();
  });
});
