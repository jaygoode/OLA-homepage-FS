import { Button, TextField, Grid, Paper, Typography } from "@material-ui/core";

const Contact = () => {
  return (
    <>
      <div>
        <Grid container spacing={1} justifyContent="center" direction="row">
          <Grid item>
            <Grid
              container
              direction="column"
              justifyContent="center"
              spacing={2}
            >
              <Paper className="contact-form" variant="elevation" elevation={2}>
                <Grid>
                  <Typography component="h1" variant="h5">
                    Reserve a spot in the next event!
                  </Typography>
                  Send us your name through this form and well contact you about
                  payment.
                </Grid>
                <Grid item>
                  <form className="Form">
                    <Grid container direction="column" spacing={2}>
                      <Grid item>
                        <TextField
                          type="email"
                          placeholder="Email"
                          fullWidth
                          name="email"
                          variant="outlined"
                          required
                          autoFocus
                        />
                      </Grid>
                      <Grid item>
                        <TextField
                          type="name"
                          placeholder="name"
                          fullWidth
                          name="name"
                          variant="outlined"
                          required
                        />
                      </Grid>
                      <Grid item>
                        <Button
                          variant="contained"
                          color="primary"
                          type="submit"
                        >
                          Send
                        </Button>
                      </Grid>
                    </Grid>
                  </form>
                </Grid>
              </Paper>
            </Grid>
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Contact;
