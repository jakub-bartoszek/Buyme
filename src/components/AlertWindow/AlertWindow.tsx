import { Product } from "../../App";
import "./styles.scss";

const AlertWindow = ({
 title,
 confirmFunction,
 cancelFunction,
 confirmText,
 cancelText,
 product,
 chosenSize,
 amount
}: {
 title: string;
 confirmFunction: () => void;
 cancelFunction: () => void;
 confirmText?: string;
 cancelText?: string;
 product?: Product;
 chosenSize?: number;
 amount?: number;
}) => (
 <div className="alert-window-shadow">
  <div className="alert-window">
   <h2 className="alert-window__title">{title}</h2>
   {product && (
    <>
     {product.images && (
      <>
       <div className="alert-window__image">
        <img src={product.images[0]} />
       </div>
       <div>
        {chosenSize} : {amount}
       </div>
      </>
     )}
    </>
   )}
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
