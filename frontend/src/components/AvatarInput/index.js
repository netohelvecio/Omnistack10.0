import React, { useState, useRef, useEffect } from 'react';
import { useField } from '@rocketseat/unform';

import { Container } from './styles';

export default function AvatarInput({ handleChange, preview }) {
  const { defaultValue, registerField } = useField('avatar_url');

  const [file, setFile] = useState(defaultValue && defaultValue.id);
  // const [preview, setPreview] = useState(defaultValue && defaultValue.url);

  const ref = useRef();

  useEffect(() => {
    if (ref.current) {
      registerField({
        name: 'avatar_url',
        ref: ref.current,
        path: 'dataset.file',
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <label htmlFor="avatar_url">
        <img
          src={preview || 'https://api.adorable.io/avatars/140/kappa.png'}
          alt=""
        />

        <input
          type="file"
          id="avatar_url"
          accept="image/*"
          data-file={file}
          onChange={handleChange}
          ref={ref}
        />
      </label>
    </Container>
  );
}
