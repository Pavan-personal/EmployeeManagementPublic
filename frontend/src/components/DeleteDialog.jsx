import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useTheme } from "@mui/material/styles";
import axios from "axios";
import { loadingAtom } from "../recoil/loadingAtom";
import { useRecoilState } from "recoil";
import toast from "react-hot-toast";
import { effectLoadAtom } from "../recoil/effectLoadAtom";

export default function DeleteDialog(props) {
  const [open, setOpen] = React.useState(false);
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down("md"));
  const [effect, setEffect] = useRecoilState(effectLoadAtom);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleCloseAndDelete = async () => {
    setOpen(false);
    try {
      const id = props.eid;
      console.log(id);
      const response = await axios.delete(
        "https://employee-management-system-zeta-eight.vercel.app/admin/remove/" + id,
        {
          headers: {
            Authorization: "Bearer " + localStorage.getItem("token"),
          },
        }
      );
      if (response.data.success) {
        toast.success(response.data.message);
        setEffect(!effect);
        // window.location.reload();
      }
      setLoad(false);
    } catch (error) {
      setEffect(!effect);
      console.log(error);
    }
  };

  return (
    <React.Fragment>
      <svg
        onClick={handleClickOpen}
        xmlns="http://www.w3.org/2000/svg"
        className="w-5 fill-red-500 cursor-pointer hover:fill-red-700"
        viewBox="0 0 24 24"
      >
        <path
          d="M19 7a1 1 0 0 0-1 1v11.191A1.92 1.92 0 0 1 15.99 21H8.01A1.92 1.92 0 0 1 6 19.191V8a1 1 0 0 0-2 0v11.191A3.918 3.918 0 0 0 8.01 23h7.98A3.918 3.918 0 0 0 20 19.191V8a1 1 0 0 0-1-1Zm1-3h-4V2a1 1 0 0 0-1-1H9a1 1 0 0 0-1 1v2H4a1 1 0 0 0 0 2h16a1 1 0 0 0 0-2ZM10 4V3h4v1Z"
          data-original="#000000"
        />
        <path
          d="M11 17v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Zm4 0v-7a1 1 0 0 0-2 0v7a1 1 0 0 0 2 0Z"
          data-original="#000000"
        />
      </svg>
      <Dialog
        fullScreen={fullScreen}
        open={open}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogContent>
          <DialogContentText>
            Are you sure to want to remove employee?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button autoFocus onClick={handleClose}>
            Disagree
          </Button>
          <Button onClick={handleCloseAndDelete} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </React.Fragment>
  );
}
