import { screen, render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { AppProviders } from "contexts";
import Featured from "components/Featured";

const propsData = { item: { _id: "1", featured: true } };
const toggleFeatured = jest.fn();

const mockToggleFeatured = jest.fn();
jest.mock("contexts/FilmContext", () => ({
  ...jest.requireActual("contexts/FilmContext"),
  useToggleFeatured: () => mockToggleFeatured,
}));

const RenderComponent = (props) => {
  return (
    <AppProviders>
      <Featured {...props} />
    </AppProviders>
  );
};

test("should corrent render", async () => {
  const { rerender } = render(<RenderComponent {...propsData} />);
  const spanEl = screen.getByRole("status");
  const iconEl = screen.getByRole("img");

  expect(iconEl).toHaveClass("yellow");

  await userEvent.click(spanEl);

  await expect(mockToggleFeatured).toHaveBeenCalledTimes(1);
  await expect(mockToggleFeatured).toHaveBeenCalledWith("1");

  propsData.item.featured = false;

  rerender(<RenderComponent {...propsData} />);
  expect(iconEl).toHaveClass("empty");
  expect(iconEl).not.toHaveClass("yellow");
});
