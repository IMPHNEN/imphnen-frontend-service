import { Button } from '@imphnen-frontend-service/ui/atoms';
import { LandingPage } from '@imphnen-frontend-service/ui/organisms';
import { FC, ReactElement, useState } from 'react';

import { createPortal } from 'react-dom';
import { ModalsGacha } from "@imphnen-frontend-service/ui/organisms"

export const Components: FC = (): ReactElement => {
  const [showModal, setShowModal] = useState(false)

  return (
    <>
      <LandingPage />

      {/**Izin pake untuk debug modals gacha */}
      <div>
        <p>Debug : Test Modals Gacha</p>
        <Button onClick={
          () => setShowModal(true)
        }>Tekan</Button>
      </div>
      {showModal && createPortal(
        <ModalsGacha></ModalsGacha>,
        document.body
      )}
      {/**Izin pake untuk debug modals gacha */}
    </>
  );
};

export default Components;
