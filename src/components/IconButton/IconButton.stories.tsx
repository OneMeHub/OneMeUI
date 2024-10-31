import type { Meta, StoryObj } from '@storybook/react';
import { type ReactNode } from 'react';

import Icon16Placeholder from '../../../.storybook/assets/icons/icon-16-placeholder.svg';
import Icon24Placeholder from '../../../.storybook/assets/icons/icon-24-placeholder.svg';
import { OverlayContainer } from '../../../.storybook/components/OverlayContainer';
import { disableArgs, hideArgsControl } from '../../../.storybook/shared/args-manager.ts';
import { useColorScheme } from '../../hooks';
import { IconButton, type IconButtonProps, type IconButtonSize } from './IconButton';

const iconsMapping: Record<IconButtonSize, ReactNode> = {
  small: <Icon16Placeholder />,
  medium: <Icon24Placeholder />,
  large: <Icon24Placeholder />
};

const meta = {
  title: 'Common/IconButton',
  component: IconButton,
  argTypes: {
    ...hideArgsControl(['asChild', 'fallbackElement', 'innerClassNames']),
    ...disableArgs(['aria-label'])
  },
  args: {
    mode: 'primary',
    appearance: 'accent',
    size: 'medium',
    disabled: false,
    'aria-label': 'Название кнопки'
  },
  decorators: [
    (Story, context) => {
      const colorScheme = useColorScheme();

      return (
        <OverlayContainer
          style={{ width: 375 }}
          appearance={context.args.appearance === 'contrast-static' || colorScheme === 'dark' ? 'dark' : 'light'}
        >
          <Story />
        </OverlayContainer>
      );
    }
  ]
} satisfies Meta<IconButtonProps>;

export default meta;
type Story = StoryObj<IconButtonProps>;

export const Playground: Story = {
  render: ({ size = 'medium', ...args }) => {
    return (
      <IconButton
        {...args}
        size={size}
      >
        {iconsMapping[size]}
      </IconButton>
    );
  }
};

export const LinkAsButton: Story = {
  name: 'Link as Button',
  args: {
    children: 'Я — ссылка!'
  },
  render: ({ size = 'medium', children, ...args }) => {
    return (
      <IconButton
        {...args}
        size={size}
        asChild
      >
        <a
          href="https://imgur.com/KFEnxtU"
          target="_blank"
          rel="noreferrer"
        >
          {iconsMapping[size]}
        </a>
      </IconButton>
    );
  }
};
