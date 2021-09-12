import {
    render,
    screen,
} from "@testing-library/react";
import {App} from "./App";

test("TODO", () => {
    render(<App/>);
    const pElt = screen.getByText(/TODO/i);
    expect(pElt).toBeInTheDocument();
});
