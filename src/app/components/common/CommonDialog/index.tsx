import Dialog, { DialogProps } from '@mui/material/Dialog';
import styled from 'styled-components';
import ContentBox from '../../ContentBox';
import resizeIcon from 'app/images/icons/resize_icon.svg';

interface Props extends DialogProps {
  width?: number;
  height?: number;
  minWidth?: number;
  minHeight?: number;
  onClose?: any;
  onExited?: any;
  open: boolean;
  headerTitle?: any;
  footerContent?: any;
  children?: any;
  backdropProps?: any;
  draggable?: boolean;
  resizable?: boolean;
  noHeader?: boolean;
  padding?: string;
  clickOutside?: boolean;
  // onResizeStop?: (size: PopupSize) => void;
  // onDragStop?: (position: PopupPosition) => void;
  // defaultX?: number;
  // defaultY?: number;
}

// type ResizeCallbackData = {
//   node: HTMLElement;
//   size: PopupSize;
//   handle: ResizeHandleAxis;
// };
// type ResizeHandleAxis = 's' | 'w' | 'e' | 'n' | 'sw' | 'nw' | 'se' | 'ne';
// export type PopupSize = { width: number; height: number };
// export type PopupPosition = { x: number; y: number };

interface CssProps {
  $resizable?: boolean;
}

const ContentWrapper = styled.div<CssProps>`
  display: flex;
  flex-direction: column;

  .box-content {
    max-height: 80vh;
  }

  .box-wrap {
    flex-direction: column;
    display: flex;
    border-radius: unset;
  }

  .footer {
    background-color: var(--global--background-color-4);
    color: white;
    padding: 12px;
    border-top: 1px solid var(--global--background-color-2);
  }

  .resizable_box {
    position: relative;
    max-height: 90vh;
    ${props => (props.$resizable ? '' : 'height: 100% !important')};

    .react-resizable-handle {
      display: ${props => (props.$resizable ? 'block' : 'none')};
      position: absolute;
      width: 15px;
      height: 15px;
      bottom: 5px;
      right: 5px;
      background-size: contain;
      background-image: url(${resizeIcon});
      background-position: bottom right;
      padding: 0 3px 3px 0;
      background-repeat: no-repeat;
      background-origin: content-box;
      box-sizing: border-box;
      cursor: se-resize;
    }
  }
`;

// const maxWidth = document.documentElement.clientWidth * 0.9;
// const maxHeight = document.documentElement.clientHeight * 0.9;

const CommonDialog = (props: Props) => {
  const {
    onClose,
    open,
    headerTitle,
    footerContent,
    children,
    onExited,
    container,
    style,
    backdropProps,
    hideBackdrop,
    noHeader,
    padding,
    clickOutside,
    width,
    // draggable,
    // resizable,
    // height = 400,
    // minWidth = width,
    // minHeight = height,
    // onResizeStop,
    // onDragStop,
    // defaultX,
    // defaultY,
  } = props;

  // const onPopResizeStop = (e: SyntheticEvent, data: ResizeCallbackData) =>
  //   onResizeStop?.(data.size);

  // const onPopDragStop: DraggableEventHandler = (e, data) =>
  //   onDragStop?.({ x: data.x, y: data.y });

  // const PaperComponent = (props: any) => {
  //   return (
  //     <Draggable
  //       handle="#draggable-area"
  //       cancel={'[class*="MuiDialogContent-root"]'}
  //       onStop={onPopDragStop}
  //       defaultPosition={{ x: defaultX || 0, y: defaultY || 0 }}
  //     >
  //       <Paper
  //         style={{
  //           boxShadow:
  //             'rgb(0 0 0 / 20%) 0px 5px 5px -3px, rgb(0 0 0 / 14%) 0px 8px 10px 1px, rgb(0 0 0 / 12%) 0px 3px 14px 2px',
  //         }}
  //         {...props}
  //       />
  //     </Draggable>
  //   );
  // };

  return (
    <Dialog
      style={{
        ...style,
        width: clickOutside ? 'fit-content' : 'unset',
        height: clickOutside ? 'fit-content' : 'unset',
      }}
      container={container}
      BackdropProps={backdropProps}
      // PaperComponent={draggable ? PaperComponent : Paper}
      PaperProps={{
        elevation: 0,
        style: {
          backgroundColor: 'var(--global--background-color-4)',
          overflow: 'hidden',
          borderRadius: 16,
          margin: 12,
          maxWidth: 'unset',
          width: width || 'unset',
          boxShadow: `rgb(0 0 0 / 20%) 0px 5px 5px -3px, rgb(0 0 0 / 14%) 0px 8px 10px 1px, rgb(0 0 0 / 12%) 0px 3px 14px 2px`,
        },
      }}
      onClose={onClose}
      TransitionProps={{ onExited: onExited }}
      open={open}
      hideBackdrop={hideBackdrop}
      disableEnforceFocus={hideBackdrop}
    >
      <ContentWrapper>
        <ContentBox
          noHeader={noHeader}
          onClose={onClose}
          title={headerTitle}
          padding={padding || '12px 24px'}
        >
          {children}
        </ContentBox>
        {footerContent && <div className="footer">{footerContent}</div>}

        {/* <ResizableBox
          width={width}
          height={height}
          minConstraints={[minWidth, minHeight]}
          maxConstraints={[maxWidth, maxHeight]}
          className="resizable_box"
          onResizeStop={onPopResizeStop}
        >
          <ContentBox
            noHeader={noHeader}
            onClose={onClose}
            title={headerTitle}
            padding={padding || '12px 24px'}
          >
            {children}
          </ContentBox>
          {footerContent && <div className="footer">{footerContent}</div>}
        </ResizableBox> */}
      </ContentWrapper>
    </Dialog>
  );
};

export default CommonDialog;
