import { createApp } from 'vue';
import { describe, it, expect  } from 'vitest';
import LinesGrid from '../../src/components/LinesGrid.vue';

describe('LinesGrid Component', () => {
  it('renders bus lines in ascending order', () => {
    const container = document.createElement('div');
    document.body.appendChild(container);

    const lines = [105, 101, 102];
    const Component = createApp(LinesGrid, { lines });
    Component.mount(container);

    const buttons = container.querySelectorAll('button');
    expect(buttons.length).toBe(lines.length); 
    if (buttons.length > 0) {
      expect(buttons[0].textContent).toBe('101');
    } else {
      throw new Error('Buttons not found');
    }

    Component.unmount();
    document.body.removeChild(container);
  });
});
