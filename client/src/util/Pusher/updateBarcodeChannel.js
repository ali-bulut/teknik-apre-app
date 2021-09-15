import { toast } from "react-toastify";
import Texts from "../../constants/Texts";
import pusher from "./pusher";

const subscribeUpdateBarcodeChannel = () => {
  var channel = pusher.subscribe("teknik-apre-channel");
  channel.bind("update-barcode", (data) => {
    if (data.error) {
      toast.error(Texts.barcodeUpdateError, { autoClose: false });
      return;
    }
    toast.info(Texts.barcodeUpdateSuccess, { autoClose: false });
  });
};

export default subscribeUpdateBarcodeChannel;
