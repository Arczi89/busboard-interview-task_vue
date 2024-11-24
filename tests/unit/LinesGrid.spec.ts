import { createApp, nextTick } from "vue";
import { describe, it, expect, vi } from "vitest";
import LinesGrid from "../../src/components/LinesGrid.vue";

const LINES_FROM_API = [101, 102, 333, 699];

vi.mock("../../src/services/api", () => ({
  getLines: vi.fn().mockResolvedValue(LINES_FROM_API),
}));

describe("LinesGrid Component", () => {
  it("renders the correct number of bus lines buttons based on the API response", async () => {
    const container = document.createElement("div");
    document.body.appendChild(container);
    const Component = createApp(LinesGrid, { lines: LINES_FROM_API });

    Component.mount(container);
    await nextTick();

    const buttons = container.querySelectorAll("button");

    expect(buttons.length).toBe(LINES_FROM_API.length);

    Component.unmount();
    document.body.removeChild(container);
  });
});
