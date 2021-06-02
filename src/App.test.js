import NavBar from "./components/Navbar";
import { render } from "@testing-library/react";

test("renders Navbar", () => {
  const { getByText } = render(<NavBar />);
  const h1 = getByText(/News Daily - Read news from anywhere/);
  expect(h1).toHaveTextContent("News Daily - Read news from anywhere");
});
