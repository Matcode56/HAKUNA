import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import { Navigation } from "./index";
import { render, screen } from "@testing-library/react";

it("renders without crashing", () => {
  const div = document.createElement("div");
  ReactDOM.render(
    <BrowserRouter>
      <Navigation />
    </BrowserRouter>,
    div
  );
});

//Si vous rajoutez un lien, vous devez le rajouter dans le tableau et rajouter dans index.tsx ( la navbar)
// une propriété "data-testid="
const links = [
  { testId: "Home", href: "/" },
  { testId: "Projects", href: "/projects" },
];

// I use test.each to iterate the test cases above
test.each(links)("Check if Nav Bar have links.", (link) => {
  render(    
  <BrowserRouter>
    <Navigation />
  </BrowserRouter>);
  //On vérifie que le lien est bien présent dans le DOM
  const linkDom = screen.getByTestId(link.testId);

  //on utilise JEST pour vérifier que le lien est bien le bon
  expect(linkDom).toHaveAttribute("href", link.href);
});
