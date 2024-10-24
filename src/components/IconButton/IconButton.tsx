import { Slottable } from '@radix-ui/react-slot';
import { type ClassValue, clsx } from 'clsx';
import { forwardRef } from 'react';

import { getSubtree } from '../../helpers';
import { useButtonLikeProps, usePlatform } from '../../hooks';
import { FatherComponent, type FatherComponentProps } from '../FatherComponent';
import { Ripple } from '../Ripple';
import styles from './IconButton.module.scss';

export type IconButtonSize = 'small' | 'medium' | 'large';
export type IconButtonMode = 'primary' | 'secondary' | 'tertiary' | 'link';
export type IconButtonAppearance = 'accent' | 'negative' | 'neutral' | 'contrast-static';
export type IconButtonInnerElementKey = 'content';

export interface IconButtonProps extends FatherComponentProps {
  size?: IconButtonSize
  mode?: IconButtonMode
  appearance?: IconButtonAppearance
  disabled?: boolean
  innerClassNames?: { [K in IconButtonInnerElementKey]?: ClassValue }
}

export const IconButton = forwardRef<HTMLDivElement, IconButtonProps>((props, forwardedRef) => {
  const {
    children,
    className,
    disabled,
    innerClassNames,
    asChild = false,
    fallbackElement = 'button',
    size = 'medium',
    mode = 'primary',
    appearance = 'accent',
    ...rest
  } = props;

  const platform = usePlatform();
  const buttonLikeProps = useButtonLikeProps({ asChild, children, disabled, fallbackElement });

  const withRipple = platform === 'android' && mode !== 'link';

  const rootClassName = clsx(
    styles.IconButton,
    styles[`IconButton_appearance_${appearance}`],
    styles[`IconButton_mode_${mode}`],
    styles[`IconButton_size_${size}`], {
      [styles.IconButton_disabled]: disabled,
      [styles.IconButton_activeMode_highlight]: !withRipple,
      [styles.IconButton_activeMode_ripple]: withRipple
    },
    className
  );

  return (
    <FatherComponent
      ref={forwardedRef}
      className={rootClassName}
      asChild={asChild}
      fallbackElement={fallbackElement}
      {...buttonLikeProps}
      {...rest}
    >
      <Slottable>
        {getSubtree({ asChild, children }, (children) => (
          <span
            key="subtree-container"
            className={clsx(styles.IconButton__content, innerClassNames?.content)}
          >
            {children}
          </span>
        ))}
      </Slottable>

      {platform === 'android' && !disabled && <Ripple className={styles.IconButton__ripple} />}
    </FatherComponent>
  );
});

IconButton.displayName = 'IconButton';
