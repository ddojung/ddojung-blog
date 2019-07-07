import * as React from 'react';
import * as PIXI from 'pixi.js';

const Cursor: React.FC = () => {
  const customCursor = React.useRef<HTMLDivElement>(null);
  const pixiApp = React.useRef<PIXI.Application>(null);

  React.useEffect(() => {
    if (!customCursor.current || !pixiApp.current) {
      return;
    }

    const app = new PIXI.Application();

    document.body.appendChild(app.view);

    const defaultIcon = "url('/static/media/donut.svg'),auto";

    app.renderer.plugins.interaction.cursorStyles.default = defaultIcon;

    const container = new PIXI.Container();

    app.stage.addChild(container);

    customCursor.current.appendChild(app);
  }, []);

  return <div ref={customCursor} />;
};

export default Cursor;
