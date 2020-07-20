<template>
  <Page actionBarHidden="true">
    <FlexboxLayout class="page">
      <StackLayout class="form">
        <Image
          class="logo"
          src="https://www.bic-boxtech.org/bic/wp-content/themes/bic/images/bic-boxtech-logo-2018.png"
          stretch="aspectFit"
        />

        <GridLayout rows="auto, auto, auto">
          <StackLayout row="0" class="input-field">
            <TextField
              class="input"
              hint="Email"
              :isEnabled="!processing"
              keyboardType="email"
              autocorrect="false"
              autocapitalizationType="none"
              v-model="user.userName"
              returnKeyType="next"
              @returnPress="focusPassword"
            ></TextField>
            <StackLayout class="hr-light"></StackLayout>
          </StackLayout>

          <StackLayout row="1" class="input-field">
            <TextField
              class="input"
              ref="password"
              :isEnabled="!processing"
              hint="Password"
              secure="true"
              v-model="user.password"
              :returnKeyType="isLoggingIn ? 'done' : 'next'"
              @returnPress="focusConfirmPassword"
            ></TextField>
            <StackLayout class="hr-light"></StackLayout>
          </StackLayout>

          <StackLayout row="2" v-show="!isLoggingIn" class="input-field">
            <TextField
              class="input"
              ref="confirmPassword"
              :isEnabled="!processing"
              hint="Confirm password"
              secure="true"
              v-model="user.confirmPassword"
              returnKeyType="done"
            ></TextField>
            <StackLayout class="hr-light"></StackLayout>
          </StackLayout>

          <ActivityIndicator rowspan="3" :busy="processing"></ActivityIndicator>
        </GridLayout>

        <Button
          :text="isLoggingIn ? 'Log In' : 'Sign Up'"
          :isEnabled="!processing"
          @tap="submit"
          class="btn btn-primary m-t-20"
        ></Button>
        <Label *v-show="isLoggingIn" text="Forgot your password?" class="login-label" @tap="forgotPassword()"></Label>
      </StackLayout>

      <Label class="login-label sign-up-label" @tap="toggleForm">
        <FormattedString>
          <Span :text="isLoggingIn ? 'Don’t have an account? ' : 'Back to Login'"></Span>
          <Span :text="isLoggingIn ? 'Sign up' : ''" class="bold"></Span>
        </FormattedString>
      </Label>
    </FlexboxLayout>
  </Page>
</template>

<script>
import Home from './Home';
import FeedbackNotification from '@/utils/FeedbackNotification';

export default {
  data() {
    return {
      isLoggingIn: true,
      processing: false,
      user: {
        userName: '',
        password: '',
        confirmPassword: '',
      },
    };
  },
  methods: {
    toggleForm() {
      this.isLoggingIn = !this.isLoggingIn;
    },

    submit() {
      if (!this.user.userName || !this.user.password) {
        this.alert('Please provide both an email address and password.');
        return;
      }

      this.processing = true;
      if (this.isLoggingIn) {
        this.login();
      } else {
        this.register();
      }
    },

    login() {
      this.$auth
        .login(this.user)
        .then(() => {
          this.processing = false;
          this.$navigator.navigate('home', { frame: 'main', clearHistory: true });
        })
        .catch(() => {
          this.processing = false;
          FeedbackNotification.showPopupWarning('Unfortunately we could not find your account.');
        });
    },

    register() {
      if (this.user.password != this.user.confirmPassword) {
        this.alert('Your passwords do not match.');
        this.processing = false;
        return;
      }

      this.$auth
        .register(this.user)
        .then(() => {
          this.processing = false;
          this.alert('Your account was successfully created.');
          this.isLoggingIn = true;
        })
        .catch(() => {
          this.processing = false;
          this.alert('Unfortunately we were unable to create your account.');
        });
    },

    forgotPassword() {
      prompt({
        title: 'Forgot Password',
        message: 'Enter the email address you used to register for APP NAME to reset your password.',
        inputType: 'email',
        defaultText: '',
        okButtonText: 'Ok',
        cancelButtonText: 'Cancel',
      }).then((data) => {
        if (data.result) {
          this.$auth
            .resetPassword(data.text.trim())
            .then(() => {
              this.alert(
                'Your password was successfully reset. Please check your email for instructions on choosing a new password.',
              );
            })
            .catch(() => {
              this.alert('Unfortunately, an error occurred resetting your password.');
            });
        }
      });
    },

    focusPassword() {
      this.$refs.password.nativeView.focus();
    },
    focusConfirmPassword() {
      if (!this.isLoggingIn) {
        this.$refs.confirmPassword.nativeView.focus();
      }
    },

    alert(message) {
      return alert({
        title: 'Shipping Containers App',
        okButtonText: 'OK',
        message: message,
      });
    },
  },
};
</script>

<style scoped>
.page {
  align-items: center;
  flex-direction: column;
}

.form {
  margin-left: 30;
  margin-right: 30;
  flex-grow: 2;
  vertical-align: middle;
}

.logo {
  margin-bottom: 12;
  height: 250;
  font-weight: bold;
}

.header {
  horizontal-align: center;
  font-size: 25;
  font-weight: 600;
  margin-bottom: 70;
  text-align: center;
  color: #d51a1a;
}

.input-field {
  margin-bottom: 25;
}

.input {
  font-size: 18;
  placeholder-color: #a8a8a8;
}

.input:disabled {
  background-color: white;
  opacity: 0.5;
}

.btn-primary {
  margin: 30 5 15 5;
  background-color: #049c88;
  color: white;
}

.login-label {
  horizontal-align: center;
  color: #a8a8a8;
  font-size: 16;
}

.sign-up-label {
  margin-bottom: 20;
}

.bold {
  color: #000000;
}
</style>
