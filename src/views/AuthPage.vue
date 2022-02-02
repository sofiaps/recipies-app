<template>
  <ion-page>
    <ion-content :fullscreen="true">
    <ion-item-group v-if="showLogin">
        <LoginForm />
         <p class="ion-text-center">No account yet? <span class="clickable" @click="showLogin = false">Signup</span> instead.</p>
    </ion-item-group>
    
    <div v-else>
      <SignUpForm/>
      <p class="ion-text-center">Already registered? <span class="clickable" @click="showLogin = true">Login</span> instead.</p>
    </div>
    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import {
  IonPage,
  IonContent,
  IonItemGroup,
} from '@ionic/vue';
import { defineComponent, ref } from 'vue';
import LoginForm from '@/components/LoginForm.vue';
import SignUpForm from '@/components/SignUpForm.vue';

export default defineComponent({
  components: {
    IonPage,
    IonContent,
    IonItemGroup,
    LoginForm,
    SignUpForm,
  },
  setup() {
    const showLogin = ref(true);

    return { showLogin };
  },
});
</script>

<style>
 .clickable {
    font-weight: bold;
    text-decoration: underline;
    cursor: pointer;
 }
</style>
