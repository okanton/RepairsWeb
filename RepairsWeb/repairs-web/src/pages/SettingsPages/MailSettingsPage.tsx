import { Grid, Paper, Typography } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import AppSimpleDialog from "../../components/Dialog/AppSimpleDialog";
import ConfirmationDialog from "../../components/Dialog/ConfirmationDialog";
import { Routes } from "../../constants/routes";
import { mailDataActions } from "../../dataLayer/mails-data-slice";
import CRUIDPanel from "../../features/CommonComponents/CRUIDPanel";
import MailSettingsTable from "../../features/Settings/MailSettings/MailSettingsTable";
import NewMailDialog from "../../features/Settings/MailSettings/NewMailDialog";
import { userAccessInformaionSelector } from "../../selectors/common-selectors";
import {
  allMailsSelector,
  selectedMailIdSelector,
  selectedMailSelector,
} from "../../selectors/mails-selectors";
import { initialMail, mailSettingsActions } from "../../slices/mail-settings";

const MailSettingsPage = () => {
  const dispatch = useDispatch();
  const [confDialog, setConfDialog] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [title, setTitle] = useState("");
  const mails = useSelector(allMailsSelector);
  const userAccess = useSelector(userAccessInformaionSelector);
  const selectedMailId = useSelector(selectedMailIdSelector);
  const selectedMail = useSelector(selectedMailSelector);
  const history = useHistory();
  useEffect(() => {
    dispatch(mailDataActions.mailsLoading());
  }, [dispatch]);
  if (!userAccess.roles.includes("Administrator"))
    history.push(Routes.ACCESS_DENIED);

  const onClickAddHandler = () => {
    setTitle("Добавление сервисной организации");
    dispatch(mailSettingsActions.setSelectedMail(initialMail));
    setShowEdit(true);
  };
  const onClickEditHandler = () => {
    setTitle("Изменение сервисной организации");
    var mail = mails.find((p) => p.id === (selectedMailId[0] as number));
    if (mail) {
      dispatch(mailSettingsActions.setSelectedMail(mail));
      setShowEdit(true);
    }
  };
  const onClickDeleteHandler = () => {
    setConfDialog(true);
  };
  const onCanselConfirmDialog = () => {
    setConfDialog(false);
  };
  const onConfirmDialog = () => {
    dispatch(mailDataActions.deleteMail(selectedMailId[0] as number));
    setConfDialog(false);
  };
  const closeDialogHandler = () => {
    setShowEdit(false);
  };

  const saveHandler = () => {
    dispatch(mailDataActions.saveMail(selectedMail));
    setShowEdit(false);
  };

  return (
    <Grid container direction="column" spacing={1}>
      <Grid item>
        <CRUIDPanel
          disableEdit={selectedMailId.length === 0}
          clickAdd={onClickAddHandler}
          clickEdit={onClickEditHandler}
          clickDelete={onClickDeleteHandler}
        />
      </Grid>
      <Grid item>
        <Paper>
          <Typography
            align="center"
            variant="h5"
            style={{ paddingTop: 10, paddingBottom: 10 }}
          >
            Почтовые адреса сервисных организаций
          </Typography>
          <MailSettingsTable items={mails} />
        </Paper>
      </Grid>
      <ConfirmationDialog
        open={confDialog}
        dialogMessage="Вы уверены, что хотите удалить этот почтовый адрес?"
        onCancel={onCanselConfirmDialog}
        onConfirm={onConfirmDialog}
      />
      <AppSimpleDialog
        open={showEdit}
        onEscapeKeyDown={closeDialogHandler}
        maxWidth="xs"
        fullWidth
      >
        <NewMailDialog
          title={title}
          onCloseDialog={closeDialogHandler}
          onSaveMail={saveHandler}
        />
      </AppSimpleDialog>
    </Grid>
  );
};

export default React.memo(MailSettingsPage);
