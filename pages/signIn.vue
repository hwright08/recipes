<template>
  <v-container class="d-flex justify-space-around">
    <v-card style="width: 500px; margin-top: 5%;">
      <v-card-text>
        <h1 class="mb-4">
          {{ createAccount ? 'Create Account' : 'Log In' }}
        </h1>

        <v-form ref="form">
          <template v-if="createAccount">
            <Label for="name" required>Name</Label>
            <TextField
              v-model="formData.name"
              id="name"
              :rules="[ required ]"
            />
          </template>

          <Label for="email" required>Email</Label>
          <TextField
            v-model="formData.email"
            id="email"
            :rules="[ required ]"
          />

          <Label for="password" required>Password</Label>
          <TextField
            v-model="formData.password"
            id="password"
            type="password"
            :rules="[ required ]"
          />
        </v-form>

        <v-btn class="my-4" color="primary" block @click="handleAccountAction">
          {{ createAccount ? 'Create Account' : 'Log In' }}
        </v-btn>
        <div class="d-flex justify-center">
          <v-btn small text @click="swapType">
            {{ !createAccount ? 'Create Account' : 'Log In' }}
          </v-btn>
        </div>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
import required from '~/mixins/required';

export default {
  name: 'SignIn',

  mixins: [required],

  data: () => ({
    formData: {},
    createAccount: false
  }),

  methods: {
    swapType() {
      this.formData = {};
      this.createAccount = !this.createAccount;
    },

    handleAccountAction() {
      if (!this.$refs.form.validate()) return;
      this.createAccount ? this.signUp() : this.login();
    },

    signUp() {
      this.$fire.auth
        .createUserWithEmailAndPassword(this.formData.email, this.formData.password)
          .then(userCredential => {
            this.$fire.auth.currentUser.sendEmailVerification()
              .then(() => {
                // Email verification sent!
              })
              .catch((err) => console.log("Caught error in sending email verification link to user", err));

            const currentUser = this.$fire.auth.currentUser;
            currentUser.updateProfile({ displayName: this.formData.name })
              .then(() => {
                // Update successful
              })
              .catch((err) => console.log("update user profile error", err));

            const authUser = {
              uid: userCredential.user.uid,
              email: userCredential.user.email,
            };

            this.$store.dispatch("onAuthStateChangedAction", { authUser })
              .then(() => this.$router.replace("/recipes"))
              .catch(err => console.log("User State error", err));
          })
          .catch(err => {
            console.log("Signup error", err);
          });
    },

    login() {
      this.$fire.auth.signInWithEmailAndPassword(this.formData.email, this.formData.password)
      .then(userCredential => {
        const authUser = {
          uid: userCredential.user.uid,
          email: userCredential.user.email,
          name: userCredential.user.displayName
        };

        this.$store.dispatch("onAuthStateChangedAction", { authUser })
          .then(() => this.$router.replace("/recipes"))
          .catch(err => console.log("User State error", err));
      })
      .catch(err => {
        console.log("Login error", err);
      });
    }
  }
};
</script>
