import * as React from 'react';

import styles from './style.css';
import { observer } from 'mobx-react-lite';
import { EN_MENU_TYPE } from '../../../models/enum/EN_MENU_TYPE';
import { EditorStore } from '../../../stores/EditorStore';
import { IBlogPostData } from '../../../models/interface/IBlogPostData';
import { storage } from '../../../lib/storage';
import ToastEditor from 'tui-editor';

function handleTitleInput(event: React.ChangeEvent<HTMLInputElement>) {
  EditorStore.title = event.target.value;
}

function handleSubTitleInput(event: React.ChangeEvent<HTMLInputElement>) {
  EditorStore.subTitle = event.target.value;
}

function handleMenuTypeSelect(event: React.ChangeEvent<HTMLSelectElement>) {
  EditorStore.type = event.target.value as EN_MENU_TYPE;
}

const Editor: React.FC<{ editData: IBlogPostData | null; type: EN_MENU_TYPE }> = ({ editData, type }) => {
  const toastEditorEl = React.useRef<HTMLDivElement>(null);
  const toastEditor = React.useRef<ToastEditor>();
  const imageRef = React.useRef<HTMLInputElement>(null);
  const [imageURI, setImageURI] = React.useState<string>('');

  React.useEffect(() => {
    import('tui-editor').then(editor => {
      toastEditor.current = new editor.default({
        el: toastEditorEl.current!,
        initialValue: editData ? editData.contents : '',
        previewStyle: 'tab',
        height: '40rem',
        initialEditType: 'wysiwyg',
        useCommandShortcut: true,
        exts: ['scrollSync', 'colorSyntax', 'uml', 'mark', 'table'],
      });
      toastEditor.current
        .getUI()
        .getToolbar()
        .removeItem(15);
    });
  }, []);

  if (editData) {
    EditorStore.subTitle = editData.subTitle;
    EditorStore.title = editData.title;
  }

  async function clickPost() {
    EditorStore.contents = toastEditor.current!.getHtml();

    return editData ? EditorStore.edit() : EditorStore.post();
  }

  async function imageUpload(event: React.ChangeEvent<HTMLInputElement>) {
    if (!event.target.files || !event.target.files[0]) {
      return;
    }

    const img = event.target.files[0];
    const fileURI = await storage.fileUpload(img);

    if (fileURI === null) {
      return;
    }

    setImg(fileURI);
  }

  function setImg(uri: string) {
    const imgTag = `<img src=${uri} />`;

    toastEditor.current!.setHtml(toastEditor.current!.getHtml() + imgTag);
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
      <div ref={toastEditorEl} />
      <div className={styles.buttonBox}>
        <button onClick={clickPost}>{'POST'}</button>
      </div>
      <input ref={imageRef} type="file" accept="image/*" onChange={imageUpload} />
      <input type="text" value={imageURI} placeholder="이미지 URI" onChange={e => setImageURI(e.target.value)} />
      <button onClick={() => setImg(imageURI)}>OK</button>
    </main>
  );
};

export default observer(Editor);
