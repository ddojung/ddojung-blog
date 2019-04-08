import * as React from 'react';

import styles from './style.css';
import dynamic from 'next/dynamic';
import { observer } from 'mobx-react-lite';
import { EN_MENU_TYPE } from '../../../models/enum/EN_MENU_TYPE';
import { EditorStore } from '../../../stores/EditorStore';
import { IBlogPostData } from '../../../models/interface/IBlogPostData';

// dynamic import: https://github.com/zeit/next.js/#dynamic-import
const ReactQuill = dynamic(() => import('react-quill'), { ssr: false });
const modules = {
  toolbar: {
    container: [
      ['bold', 'italic', 'underline', 'strike'], // toggled buttons
      ['blockquote', 'code-block'],
      [{ header: 1 }, { header: 2 }], // custom button values
      [{ list: 'ordered' }, { list: 'bullet' }],
      [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
      [{ indent: '-1' }, { indent: '+1' }], // outdent/indent

      [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
      [{ header: [1, 2, 3, 4, 5, 6, false] }],

      [{ color: [] }, { background: [] }], // dropdown with defaults from theme
      [{ font: [] }],
      [{ align: [] }],

      ['clean'], // remove formatting button
    ],
  },
};

function handleTitleInput(event: React.ChangeEvent<HTMLInputElement>) {
  EditorStore.title = event.target.value;
}

function handleSubTitleInput(event: React.ChangeEvent<HTMLInputElement>) {
  EditorStore.subTitle = event.target.value;
}

function handleMenuTypeSelect(event: React.ChangeEvent<HTMLSelectElement>) {
  EditorStore.type = event.target.value as EN_MENU_TYPE;
}

function handleQuillInput(content: string) {
  EditorStore.quillHtml = content;
}

const Editor: React.FC<{ editData: IBlogPostData | null; type: EN_MENU_TYPE }> = ({ editData, type }) => {
  if (editData) {
    EditorStore.quillHtml = editData.contents;
    EditorStore.subTitle = editData.subTitle;
    EditorStore.title = editData.title;
  }

  function clickPost() {
    return editData ? EditorStore.edit() : EditorStore.post();
  }

  const options = Object.values(EN_MENU_TYPE).map(type => (
    <option key={type} value={type}>
      {type}
    </option>
  ));

  return (
    <main className={styles.mainContainer}>
      <div className={styles.titleBox}>
        <select name="type" onChange={handleMenuTypeSelect} defaultValue={type}>
          {options}
        </select>
        <input type="text" defaultValue={EditorStore.title} onChange={handleTitleInput} placeholder="타이틀" />
        <input
          type="text"
          defaultValue={EditorStore.subTitle}
          className={styles.subTitle}
          onChange={handleSubTitleInput}
          placeholder="서브타이틀"
        />
      </div>
      <ReactQuill theme="snow" modules={modules} onChange={handleQuillInput} value={EditorStore.quillHtml}>
        <div className={styles.contextBox} />
      </ReactQuill>
      <div className={styles.buttonBox}>
        <button onClick={clickPost}>{'POST'}</button>
      </div>
    </main>
  );
};

export default observer(Editor);
