import React from 'react';
import { Grid, } from '@material-ui/core';
import Avatar from '@material-ui/core/Avatar';
import CssBaseline from '@material-ui/core/CssBaseline';
import LockOutlinedIcon from '@material-ui/icons/LockOutlined';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import axios from "axios";
import { useForm, Form } from '../components/useForm';
import Controls from "../components/controls/Control";

const useStyles = makeStyles((theme) => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  }, 
}));

const initialFValues = {
  
  emailId: ""
}

export default function SignUp() {
  const classes = useStyles();
  const [responseData, setResponseData] = React.useState([]);

  const validate = (fieldValues = values) => {
    let temp = { ...errors }

   
    if ('emailId' in fieldValues) {
      if(temp.emailId = (/$^|.+@.+..+/).test(fieldValues.emailId)) {
        temp.emailId = "";
      } else {
        temp.emailId = "Email is not valid.";
      }
    }
    
    setErrors({
        ...temp
    })

    if (fieldValues == values)
        return Object.values(temp).every(x => x == "")
  }

  const {
      values,
      setValues,
      errors,
      setErrors,
      handleInputChange,
      resetForm
  } = useForm(initialFValues, true, validate);  

  const handleSubmit = event => {
    event.preventDefault();
    const user = values;

    console.log("user : ", user);
    
      axios.post("http://localhost:8080/forgotPassword")
      .then(res => {
        setResponseData(res.data);
        console.log("res.data : " , res.data);
       }
      ).catch(() => {
        alert("Failed to send email :(")
      });
      resetForm()
  }

  return (
    <Container component="main" maxWidth="xs">   
      <CssBaseline />
      <div className={classes.paper}>
        <div>{responseData}</div>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Forgot Password?
        </Typography>
        <Form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              
              <Controls.Input
                name="emailId"              
                label="Your email address"              
                onChange={handleInputChange}
                value={values.emailId}
                error={errors.emailId}
              />
              <Controls.Button
                type="submit"
                text="Email a password reset link?" />
              
              <div class="wrapper">
                <a href="/login" variant="body2"> Are you trying to login?</a>
              </div>
              <div class="wrapper">
                <a href="/register" variant="body2"> Don't have an account? Sign Up</a>
              </div>
              
            </Grid>
          </Grid>
        </Form>
      </div>     
    </Container>
  );
}