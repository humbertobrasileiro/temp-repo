/* eslint-disable react/react-in-jsx-scope */
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Button } from ".";

describe("<Button />", () => {
  it("should render the button with the text", () => {
    const fn = jest.fn();

    render(<Button text="Load more" onClick={fn} />);

    expect.assertions(2);

    const button = screen.getByRole("button", { name: /load more/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("class", "button");
  });

  it("should call function on button click", () => {
    const fn = jest.fn();

    render(<Button text="Load more" onClick={fn} />);

    const button = screen.getByRole("button", { name: /load more/i });

    userEvent.click(button);

    userEvent.click(button, { disabled: true });

    expect(fn).toHaveBeenCalledTimes(2);
  });

  it("should be disabled when disabled is true", () => {
    const fn = jest.fn();
    render(<Button text="Load more" onClick={fn} disabled={true} />);
    const button = screen.getByRole("button", { name: /load more/i });
    expect(button).toBeDisabled();
  });

  it("should be enabled when disabled is true", () => {
    const fn = jest.fn();
    render(<Button text="Load more" onClick={fn} disabled={false} />);
    const button = screen.getByRole("button", { name: /load more/i });
    expect(button).toBeEnabled();
  });

  it("should match snapshot", () => {
    const fn = jest.fn();
    const { container } = render(
      <Button text="Load more" onClick={fn} disabled={false} />
    );
    expect(container.firstChild).toMatchSnapshot();
  });
});
