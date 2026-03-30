import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import {
  Drawer,
  DrawerTrigger,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from './drawer';

describe('Drawer', () => {
  it('opens drawer when trigger is clicked', async () => {
    render(
      <Drawer>
        <DrawerTrigger>Open Drawer</DrawerTrigger>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Drawer Title</DrawerTitle>
          </DrawerHeader>
        </DrawerContent>
      </Drawer>
    );

    const user = userEvent.setup();
    await user.click(screen.getByText('Open Drawer'));

    expect(screen.getByText('Drawer Title')).toBeInTheDocument();
  });
});
