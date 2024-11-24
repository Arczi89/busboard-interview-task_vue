import axios from "axios";
import type { Stop } from "../types/Stop";
import { SortedStop } from "@/types/SortedStop";

const apiClient = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    "Content-Type": "application/json",
  },
});

export default {
  async getStops(): Promise<Stop[]> {
    return apiClient.get<Stop[]>("/stops").then((response) => response.data);
  },

  async getSortedStops(order: "ASC" | "DESC"): Promise<string[]> {
    const stops = await this.getStops();
    return [...new Set(stops.map((stop) => stop.stop))].sort((a, b) => {
      if (order === "ASC") {
        return a.localeCompare(b);
      } else {
        return b.localeCompare(a);
      }
    });
  },

  async getLines(): Promise<number[]> {
    const stops = await this.getStops();
    const lines = Array.from(new Set(stops.map((stop) => stop.line)));
    return lines.sort((a, b) => a - b);
  },

  async getStopsByLine(line: number): Promise<SortedStop[]> {
    const stops = await this.getStops();

    const stopsForLine = stops.filter((stop) => stop.line === line);

    const groupedStops = Object.values(
      stopsForLine.reduce((acc, stop, index) => {
        const key = `${stop.order}-${stop.stop}`;
        if (!acc[key]) {
          acc[key] = {
            id: index + 1,
            name: stop.stop,
            times: [],
            order: stop.order,
          };
        }
        acc[key].times.push(stop.time);
        return acc;
      }, {} as Record<string, SortedStop>)
    );

    return groupedStops.sort((a, b) => a.order - b.order);
  },

  async getTimesByStop(stopName: string): Promise<string[]> {
    const stops = await this.getStops();
    const times = stops
      .filter((stop) => stop.stop === stopName)
      .map((stop) => stop.time);

    return times.sort(
      (a, b) => this.convertToMinutes(a) - this.convertToMinutes(b)
    );
  },

  convertToMinutes(time: string): number {
    const [hours, minutes] = time.split(":").map(Number);
    return hours * 60 + minutes;
  },
};
