import { createApp, nextTick } from "vue";
import { describe, it, expect, vi, beforeAll, beforeEach, afterEach } from "vitest";
import StopPage from "../../src/views/StopsPage.vue";
import api from "@/services/api";

describe("StopPage Component", () => {
  const STOPS_FROM_API = ["Stop A", "Stop B", "Stop BB", "Stop C"];

  let container: HTMLElement;
  let Component: ReturnType<typeof createApp>;

  beforeEach(() => {
    container = document.createElement("div");
    document.body.appendChild(container);
    Component = createApp(StopPage);
    Component.mount(container);
  });

  afterEach(() => {
    Component.unmount();
    document.body.removeChild(container);
  });

  beforeAll(() => {
    vi.spyOn(api, "getSortedStops").mockResolvedValue(STOPS_FROM_API);
  });

  it("renders a list of stops in correct order", async () => {
    await nextTick();

    const items = container.querySelectorAll(".list-group-item");

    expect(items.length).toBe(STOPS_FROM_API.length);
    expect(items[2].textContent).toBe(STOPS_FROM_API[2]);
  });

  it("filters stops based on search term", async () => {
    const SEARCH_TERM = "B";
    const filteredElements = STOPS_FROM_API.filter((el) => el.includes(SEARCH_TERM));
    await nextTick();

    const input = container.querySelector(".search") as HTMLInputElement;
    if (input) {
      input.value = SEARCH_TERM;
      input.dispatchEvent(new Event("input"));
    } else {
      throw new Error("Input field not found");
    }

    await nextTick();

    const items = container.querySelectorAll(".list-group-item");
    expect(items.length).toBe(filteredElements.length);
    expect(items[0].textContent?.trim()).toBe(filteredElements[0]);
  });
});
