import * as React from 'react';

import styles from './style.css';
import { observer } from 'mobx-react-lite';
import { EN_MENU_TYPE } from '../../../models/enum/EN_MENU_TYPE';
import { EditorStore } from '../../../stores/EditorStore';
import { IBlogPostData } from '../../../models/interface/IBlogPostData';
// import { storage } from '../../../lib/storage';
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
    });
  }, []);

  if (editData) {
    EditorStore.subTitle = editData.subTitle;
    EditorStore.title = editData.title;
  }

  async function clickPost() {
    EditorStore.contents = toastEditor.current!.getHtml();

    // const htmlObject = document.createElement('div');
    // htmlObject.innerHTML = EditorStore.contents;

    // const imgTags = htmlObject.getElementsByTagName('img');
    // const byteImg = atob(imgTags[0].currentSrc.replace(/^data:image\/(png|jpeg|jpg);base64,/, ''));
    // const arrBuf = new ArrayBuffer(byteImg.length);
    // const intArr = new Uint8Array(arrBuf);

    // Array(byteImg.length).forEach((_, idx) => {
    //   intArr[idx] = byteImg.charCodeAt(idx);
    // });

    // const type = imgTags[0].currentSrc.split(';')[0].replace('data:', '');
    // // const blob = new Blob([intArr], { type });

    // console.log(imgTags);

    // const img = new File([intArr], imgTags[0].alt, { type });
    // const fileURI = await storage.fileUpload(img);

    // if (fileURI === null) {
    //   return;
    // }

    // console.log(fileURI);

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
      <div ref={toastEditorEl} />
      <div className={styles.buttonBox}>
        <button onClick={clickPost}>{'POST'}</button>
      </div>
      {/* <input
        style={{ display: 'none' }}
        ref={ref => (imageRef = ref)}
        type="file"
        accept="image/*"
        onChange={imageChange}
      /> */}
    </main>
  );
};

export default observer(Editor);
