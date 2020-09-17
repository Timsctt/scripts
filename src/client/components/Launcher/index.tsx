import React from 'react';

type Props = {
  openLabel: string;
  closeLabel: string;
};

function Launcher({ openLabel, closeLabel }: Props) {
  return (
    <button
      type="button"
      className={'mgen-launcher'}
    >
      {
        <img
          src={'../src/components/Launcher/assets/launcher_button.svg'}
          className="mgen-close-launcher"
          alt={openLabel}
        />
      }
    </button>
  );
}

export default Launcher;
