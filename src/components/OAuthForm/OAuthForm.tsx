import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Container from '@material-ui/core/Container';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import * as React from 'react';
import { config } from '../../config';
import * as s from './OAuthForm.css';
import * as T from './OAuthForm.types';

const { oauthUrl, clientId, respType, getTokenText, saveButtonText, oauthFormTitle } = config;

const OAuthForm: React.FunctionComponent<T.IOAuthFormProps> = props => {
  return (
    <Container maxWidth="xs">
      <div className={s.root}>
        <Avatar className={s.avatar}>
          <LockOutlinedIcon />
        </Avatar>

        <Typography component="h1" variant="h5">
          {oauthFormTitle}
        </Typography>

        <form className={s.form} noValidate>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="token"
            label="Введите token"
            name="token"
            autoFocus
            onChange={props.onChangeToken}
          />

          <Button
            className={s.submit}
            color="primary"
            fullWidth
            onClick={props.onSubmitToken}
            type="button"
            variant="contained"
          >
            {saveButtonText}
          </Button>

          <Grid container>
            <Grid item xs>
              <Link
                href={`${oauthUrl}?response_type=${respType}&client_id=${clientId}`}
                target="_blank"
                variant="body2"
              >
                {getTokenText}
              </Link>
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );
};

export default OAuthForm;
