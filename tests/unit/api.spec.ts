import api from "../../src/services/api";
import { vi, describe, it, expect } from "vitest";
import { Stop } from "../../src/types/Stop";

const STOPS_FROM_API: Stop[] = [
  { stop: "Stop A", line: 1, order: 1, time: "10:00" },
  { stop: "Stop C", line: 1, order: 2, time: "10:30" },
  { stop: "Stop D", line: 2, order: 1, time: "11:00" },
  { stop: "Stop B", line: 2, order: 2, time: "11:30" },
];

const SORTED_STOPS = ["Stop A", "Stop B", "Stop C", "Stop D"];

beforeAll(() => {
  /* assume that getStops return correct data from axios from baseUrl */
  vi.spyOn(api, "getStops").mockResolvedValue(STOPS_FROM_API);
});

describe("API Service", () => {
  it("should return sorted stops based on ASC order", async () => {
    const sortedStops = await api.getSortedStops("ASC");
    expect(sortedStops).toEqual(SORTED_STOPS);
  });

  it("should return sorted stops based on DESC order", async () => {
    const sortedStops = await api.getSortedStops("DESC");
    expect(sortedStops).toEqual(SORTED_STOPS.reverse());
  });

  it("should return distinct lines", async () => {
    const lines = await api.getLines();
    expect(lines).toEqual([1, 2]);
  });

  it("should return grouped stops by line", async () => {
    const groupedStops = await api.getStopsByLine(1);
    expect(groupedStops).toEqual([
      { id: 1, name: "Stop A", times: ["10:00"], order: 1 },
      { id: 2, name: "Stop C", times: ["10:30"], order: 2 },
    ]);
  });

  it("should return sorted times by stop", async () => {
    const times = await api.getTimesByStop("Stop A");
    expect(times).toEqual(["10:00"]);
  });

  it("should convert time to minutes correctly", () => {
    const timeInMinutes = api.convertToMinutes("10:30");
    expect(timeInMinutes).toBe(630);
  });
});
