import "./styles.scss";

const AlertWindow = ({
 title,
 confirmFunction,
 cancelFunction,
 confirmText,
 cancelText,
}: {
 title: string;
 confirmFunction: () => void;
 cancelFunction: () => void;
 confirmText?: string;
 cancelText?: string;
}) => (
 <div className="alert-window-shadow">
  <div className="alert-window">
   <h2 className="alert-window__title">{title}</h2>
   <div className="alert-window__buttons">
    <button
     className="alert-window__button"
     onClick={() => cancelFunction()}
    >
     {cancelText ? cancelText : "Cancel"}
    </button>
    <button
     className="alert-window__button"
     onClick={() => confirmFunction()}
    >
     {confirmText ? confirmText : "Yes"}
    </button>
   </div>
  </div>
 </div>
);

export default AlertWindow;
