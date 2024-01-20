import "./styles.scss";

const AlertWindow = ({
 title,
 confirmFunction,
 cancelFunction
}: {
 title: string;
 confirmFunction: () => void;
 cancelFunction: () => void;
}) => (
 <div className="alert-window-shadow">
  <div className="alert-window">
   <h2 className="alert-window__title">{title}</h2>
   <div className="alert-window__buttons">
    <button
     className="alert-window__button"
     onClick={() => cancelFunction()}
    >
     Cancel
    </button>
    <button
     className="alert-window__button"
     onClick={() => confirmFunction()}
    >
     Yes
    </button>
   </div>
  </div>
 </div>
);

export default AlertWindow;
