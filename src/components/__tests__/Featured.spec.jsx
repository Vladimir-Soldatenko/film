import { screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Featured from "components/Featured";
import { renderWithClient } from "test/reactQueryWrapper";

const propsData = { item: { _id: "1", featured: true } };

const mockMutate = jest.fn();
jest.mock("hooks/films", () => ({
  useToggledFeatured: () => ({ mutate: mockMutate }),
}));

test("should corrent render", async () => {
  const { rerender } = renderWithClient(<Featured {...propsData} />);
  const spanEl = screen.getByRole("status");
  const iconEl = screen.getByRole("img");

  expect(iconEl).toHaveClass("yellow");

  await userEvent.click(spanEl);
  await expect(mockMutate).toHaveBeenCalledTimes(1);
  await expect(mockMutate).toHaveBeenCalledWith({ _id: "1", featured: false });

  propsData.item.featured = false;

  rerender(<Featured {...propsData} />);

  await userEvent.click(spanEl);
  expect(iconEl).toHaveClass("empty");
  expect(iconEl).not.toHaveClass("yellow");

  await expect(mockMutate).toHaveBeenCalledTimes(2);
  await expect(mockMutate).toHaveBeenCalledWith({ _id: "1", featured: true });
});
