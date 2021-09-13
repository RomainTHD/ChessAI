import {
    render,
    screen,
} from "@testing-library/react";
import {Index} from "src/pages";

test("TODO", () => {
    render(<Index/>);
    const pElt = screen.getByText(/TODO/i);
    expect(pElt).toBeInTheDocument();
});
