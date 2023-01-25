import React, { Children, useState } from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";
import { SSection, SSpan, SUl, SButtonContainer } from "./styles";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserSlash } from "@fortawesome/free-solid-svg-icons";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "calc(1vw + 500px)",
  bgcolor: "background.paper",
  borderRadius: "8px",
  boxShadow: 24,
  outline: "none",
  padding: "20px 30px",
};

const WarningModal = (props) => {
  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  return (
    <SSection>
      {props.profileSidebar && (
        <Button className="modal-button" onClick={handleOpen}>
          <FontAwesomeIcon className="user-delete" icon={faUserSlash} />
          회원탈퇴
        </Button>
      )}
      {props.lectureCancel && (
        <Button
          className="modal-button lecture__cancel-button"
          onClick={handleOpen}
        >
          수강취소
        </Button>
      )}
      <Modal
        open={open}
        onClose={handleClose}
        className="modal"
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} className="modal-container">
          <Typography
            id="modal-modal-title"
            className="modal-title"
            variant="h6"
            component="h2"
          >
            <SSpan>{props.title}</SSpan>
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            {props.children}
            <SUl lectureCancel={props.lectureCancel}>
              <li className="delete-warning">{props.warningContent}</li>
              <li>{props.content}</li>
            </SUl>
          </Typography>
          <SButtonContainer>
            <button className="delete-button">확인</button>
            <button className="cancel-button" onClick={handleClose}>
              취소
            </button>
          </SButtonContainer>
        </Box>
      </Modal>
    </SSection>
  );
};

export default WarningModal;