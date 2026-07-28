import { cx } from '@/lib/utils';
import './Button.css';

const buttonVariant = Object.freeze({
  primary: 'primary',
  danger: 'danger',
  warning: 'warning',
  ghost: 'ghost',
});

export const Button = ({
  type = 'button',
  variant = buttonVariant.primary,
  className = '',
  ...props
}) => (
  <button type={type} className={cx('button', variant, className)} {...props} />
);

Button.variant = buttonVariant;
