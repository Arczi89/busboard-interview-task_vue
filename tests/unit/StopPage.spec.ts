import { createApp, nextTick } from 'vue';
import { describe, it, expect, vi, beforeAll } from 'vitest';
import StopPage from '../../src/views/StopsPage.vue';

describe('StopPage Component', () => {
  const STOPS_FROM_API = [
    { stop: 'Stop A' },
    { stop: 'Stop B' },
    { stop: 'Stop BB' },
    { stop: 'Stop C' },
  ];

  beforeAll(() => {
    vi.doMock('../../src/services/api', () => ({
      getStops: vi.fn().mockResolvedValue(STOPS_FROM_API),
    }));
  });

  it('renders a list of stops in correct order', async () => {
    const container = document.createElement('div');
    document.body.appendChild(container);

    const Component = createApp(StopPage);
    Component.mount(container);

    await nextTick();

    const items = container.querySelectorAll('.list-group-item');
    expect(items.length).toBe(STOPS_FROM_API.length);
    expect(items[2].textContent).toBe(STOPS_FROM_API[2].stop);

    Component.unmount();
    document.body.removeChild(container);
  });

  it('filters stops based on search term', async () => {
    const SEARCH_TERM = 'B';
    const filteredElements = STOPS_FROM_API.filter(el => el.stop.includes(SEARCH_TERM));
    const container = document.createElement('div');
    document.body.appendChild(container);

    const Component = createApp(StopPage);
    Component.mount(container);

    await nextTick();

    const input = container.querySelector('input');
    if (input) {
      input.value = SEARCH_TERM;
      input.dispatchEvent(new Event('input'));
    } else {
      throw new Error('Input field not found');
    }

    await nextTick();

    const items = container.querySelectorAll('.list-group-item');
    expect(items.length).toBe(filteredElements.length);
    expect(items[0].textContent).toBe(filteredElements[0].stop);

    Component.unmount();
    document.body.removeChild(container);
  });
});
