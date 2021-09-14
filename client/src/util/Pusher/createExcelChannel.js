import { toast } from "react-toastify";
import CustomToastWithLink from "../../components/Common/CustomToastWithLink";
import Texts from "../../constants/Texts";
import pusher from "./pusher";

const subscribeCreateExcelChannel = () => {
  var channel = pusher.subscribe("teknik-apre-channel");
  channel.bind("create-excel", (data) => {
    if (data.error) {
      toast.error(Texts.excelFileReadyError, { autoClose: false });
      return;
    }
    toast.info(
      CustomToastWithLink({
        url: Texts.apiUrl + data.url,
        text: Texts.excelFileReady,
      }),
      { autoClose: false }
    );
  });
};

export default subscribeCreateExcelChannel;
