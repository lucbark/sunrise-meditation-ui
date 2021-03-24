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
  userName: "",
  emailId: "",
  password: "", 
  confirmPassword: "", 
  weeklyGoal: "",
}

export default function SignUp() {
  const classes = useStyles();
  const [responseData, setResponseData] = React.useState([]);

  const validate = (fieldValues = values) => {
    let temp = { ...errors }

    if ('userName' in fieldValues) {
      if(temp.userName = fieldValues.userName) {
          temp.userName = "";
        } else {
          temp.userName = "This field is required.";          
        }
    }
    if ('emailId' in fieldValues) {
      if(temp.emailId = (/$^|.+@.+..+/).test(fieldValues.emailId)) {
        temp.emailId = "";
      } else {
        temp.emailId = "Email is not valid.";
      }
    }
    if ('password' in fieldValues) {
      if(temp.password = fieldValues.password) {
        temp.password = "";
      } else {
        temp.password = "This field is required.";
      }
    }
    if ('confirmPassword' in fieldValues) {
      if(temp.confirmPassword = fieldValues.confirmPassword) {
        temp.confirmPassword = "";
      } else {
        temp.confirmPassword = "This field is required.";
      }
    }
    if('weeklyGoal' in fieldValues) {
      if(temp.weeklyGoal = fieldValues.weeklyGoal) {
        temp.weeklyGoal = "";
      } else {
        temp.weeklyGoal = "This field is required.";
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
    
      axios.post("http://localhost:8080/register", user)
      .then(res => {
        setResponseData(res.data);
        console.log("res.data : " , res.data);
       }
      ).catch(() => {
        alert("User Registration failed!")
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
          Registration
        </Typography>
        <Form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12}>
              <Controls.Input
                name="userName"              
                label="User Name"              
                onChange={handleInputChange}                
                value={values.userName}
                error={errors.userName}
              />
              <Controls.Input
                name="emailId"              
                label="Email Id"              
                onChange={handleInputChange}
                value={values.emailId}
                error={errors.emailId}
              />
              <Controls.Input
                name="password"              
                label="Password"              
                onChange={handleInputChange}        
                value={values.password}
                error={errors.password}
              />
              <Controls.Input
                name="confirmPassword"              
                label="confirmPassword"              
                onChange={handleInputChange}        
                value={values.confirmPassword}
                error={errors.confirmPassword}
              />
              <Controls.Input
                name="weeklyGoal"              
                label="Weekly Goal (in minutes)"
                onChange={handleInputChange} 
                value={values.weeklyGoal}
                error={errors.weeklyGoal}
              />
              <Controls.Button
                type="submit"
                text="Sign Up" />
              <Controls.Button
                text="Reset"
                color="default"
                onClick={resetForm} />
            </Grid>
          </Grid>
        </Form>
      </div>     
    </Container>
  );
}