import { createApp } from 'vue';
import { describe, it, expect } from 'vitest';
import StopPage from '../../src/views/StopsPage.vue';

describe('StopPage Component', () => {
  it('renders a list of stops', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);

    const Component = createApp(StopPage);
    Component.mount(container);

    const items = container.querySelectorAll('.list-group-item');
    expect(items.length).toBe(3); 
    expect(items[0].textContent).toBe('Stop A'); 

    Component.unmount();
    document.body.removeChild(container);
  });

  it('filters stops based on search term', async () => {
    const container = document.createElement('div');
    document.body.appendChild(container);

    const Component = createApp(StopPage);
    Component.mount(container);

    const input = container.querySelector('input');
    if (input) {
      input.value = 'B';
      input.dispatchEvent(new Event('input'));
    } else {
      throw new Error('Input field not found');
    }

    await new Promise((r) => setTimeout(r, 0));

    const items = container.querySelectorAll('.list-group-item');
    expect(items.length).toBe(1); 
    expect(items[0].textContent).toBe('Stop B');

    Component.unmount();
    document.body.removeChild(container);
  });
});
