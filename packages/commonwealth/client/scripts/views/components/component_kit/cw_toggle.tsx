import React from 'react';

import './cw_toggle.scss';

import { getClasses } from './helpers';
import type { BaseStyleProps } from './types';
import { ComponentType } from './types';

export type ToggleStyleProps = {
  checked?: boolean;
} & BaseStyleProps;

type ToggleProps = {
  onChange?: (e?: any) => void;
  readOnly?: boolean;
} & ToggleStyleProps;

export const CWToggle = ({
  className,
  disabled = false,
  onChange,
  checked,
  readOnly,
}: ToggleProps) => {
  const params = {
    disabled,
    onChange,
    checked,
    type: 'checkbox',
    readOnly,
  };

  return (
    <label
      className={getClasses<ToggleStyleProps>(
        {
          checked,
          disabled,
          className,
        },
        ComponentType.Toggle,
      )}
    >
      <input className="toggle-input" {...params} />
      <div className="slider" />
    </label>
  );
};
