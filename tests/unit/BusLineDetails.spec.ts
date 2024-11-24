import { createApp, nextTick } from "vue";
import { describe, it, expect, beforeAll, afterAll } from "vitest";
import BusLineDetails from "@/components/BusLineDetails.vue";
import { SortedStop } from "@/types/SortedStop";

describe("BusLineDetails Component", () => {
  let container: HTMLDivElement;
  let app: ReturnType<typeof createApp>;

  const STOPS_FROM_API: SortedStop[] = [
    { id: 1, name: "Stop 1", order: 1, times: ["10:00", "12:00"] },
    { id: 2, name: "Stop 2", order: 2, times: ["14:00", "16:00"] },
  ];
  const LINE_FROM_API = "Line 1";

  beforeAll(() => {
    container = document.createElement("div");
    document.body.appendChild(container);

    app = createApp(BusLineDetails, {
      line: LINE_FROM_API,
      stops: STOPS_FROM_API,
    });
    app.mount(container);
  });

  afterAll(() => {
    app.unmount();
    document.body.removeChild(container);
  });

  it("should render bus stops correctly", async () => {
    await nextTick();

    const stopItems = container.querySelectorAll(".stops > .list-group-item");
    expect(stopItems.length).toBe(STOPS_FROM_API.length);
    expect(stopItems[0]?.textContent).toBe(STOPS_FROM_API[0].name);
    expect(stopItems[1]?.textContent).toBe(STOPS_FROM_API[1].name);
  });

  it("should display bus stop times when a stop is selected", async () => {
    await nextTick();

    const stopItems = container.querySelectorAll(".stops > .list-group-item");
    stopItems[0]?.dispatchEvent(new MouseEvent("click"));

    await nextTick();

    const timeItems = container.querySelectorAll(".times > .list-group-item");
    expect(timeItems.length).toBe(STOPS_FROM_API[0].times.length);
    expect(timeItems[0]?.textContent).toBe(STOPS_FROM_API[0].times[0]);
    expect(timeItems[1]?.textContent).toBe(STOPS_FROM_API[0].times[1]);
  });

  it("should show message when no line is selected", async () => {
    await nextTick();

    const emptyStops: SortedStop[] = [];
    app = createApp(BusLineDetails, { line: null, stops: emptyStops });
    app.mount(container);

    await nextTick();

    const message = container.querySelector(".text-muted-stops");
    expect(message?.textContent).toBe("Please select the bus line first.");
  });

  it("should display message when no busstop is selected", async () => {
    await nextTick();
    const emptyStops: SortedStop[] = [];
    app = createApp(BusLineDetails, { line: LINE_FROM_API, stops: emptyStops });

    await nextTick();

    const message = container.querySelector(".text-muted-times");
    expect(message?.textContent).toBe(
      "Please select a bus stop to view times."
    );
  });
});
