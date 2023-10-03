import React, { useEffect, useState } from "react";

import "./autorization.scss";

interface IWarning {
  title: string;
  description: string;
}

const Autorization = (): React.ReactElement => {
  const [warning, setWarning] = useState<IWarning>();

  useEffect(() => {
    setWarning({ title: "Holy guacamole!", description: "You should check in on some of those fields below." })
  }, []);

  return (
    <div className='autorization'>
      <div className='content'>
         {warning && (
          <div className='warning'>
            <b>{warning.title}</b>
            <p>{warning.description}</p>
            <div className='cross' onClick={(): void => setWarning(undefined)}>×</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Autorization;
