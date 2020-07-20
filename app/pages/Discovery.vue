<template>
  <Page class="page" @loaded="onLoadPage" :actionBarHidden="true">
    <GridLayout v-if="!runningAnimations">

      <MLKitTextRecognition
        v-if="searchText"
        width="*"
        height="*"
        processEveryNthFrame="5"
        :torchOn="torchOn"
        :pause="hasContainerNumberFound"
        @scanResult="onTextRecognitionResult"
      />

      <GridLayout rows="*, 320, *" columns="*, 5/6*, *">
        <Label class="mask" row="0" col="0" colSpan="3"></Label>
        <Label class="mask" row="2" col="0" colSpan="3"></Label>
        <Label class="mask" row="1" col="0"></Label>
        <Label class="mask" row="1" col="2"></Label>
        <GridLayout row="1" col="1" rows="1/6*, *, 1/6*" columns="1/6*, *, 1/6*">
          <Label class="frame-top-left" row="0" col="0"></Label>
          <Label class="frame-top-right" row="0" col="2"></Label>
          <Label class="frame-bottom-left" row="2" col="0"></Label>
          <Label class="frame-bottom-right" row="2" col="2"></Label>
          <StackLayout class="swing" row="0" col="0" colSpan="3">
            <Label height="1" marginBottom="1" borderBottomWidth="1" borderColor="rgba(4, 156, 136, 0.1)"></Label>
            <Label height="1" marginBottom="1" borderBottomWidth="1" borderColor="rgba(4, 156, 136, 0.2)"></Label>
            <Label height="1" marginBottom="1" borderBottomWidth="1" borderColor="rgba(4, 156, 136, 0.3)"></Label>
            <Label height="1" marginBottom="1" borderBottomWidth="1" borderColor="rgba(4, 156, 136, 0.4)"></Label>
            <Label height="1" marginBottom="1" borderBottomWidth="1" borderColor="rgba(4, 156, 136, 0.5)"></Label>
            <Label height="1" marginBottom="1" borderBottomWidth="1" borderColor="rgba(4, 156, 136, 0.6)"></Label>
            <Label height="1" marginBottom="1" borderBottomWidth="1" borderColor="rgba(4, 156, 136, 0.7)"></Label>
            <Label height="1" marginBottom="1" borderBottomWidth="1" borderColor="rgba(4, 156, 136, 0.8)"></Label>
            <Label height="1" marginBottom="1" borderBottomWidth="1" borderColor="rgba(4, 156, 136, 0.9)"></Label>
            <Label height="1" marginBottom="1" borderBottomWidth="1" borderColor="rgba(4, 156, 136, 1)"></Label>
          </StackLayout>
        </GridLayout>
      </GridLayout>

      <GridLayout rows="auto" columns="auto, auto" horizontalAlignment="right" class="m-t-4 m-r-8">
        <Label col="0" text="Torch" class="c-white"></Label>
        <Switch col="1" @checkedChange="toggleTorch"></Switch>
      </GridLayout>

      <DockLayout stretchLastChild="false">
        <FlexboxLayout dock="bottom" horizontalAlignment="center">
          <fab
            row="1"
            class="fab-central-button fas active"
            text.decode="&#xf06e;"
          ></fab>
        </FlexboxLayout>
      </DockLayout>

      <GridLayout v-if="searchText" rows="auto" columns="auto, auto" horizontalAlignment="left" class="m-t-4 m-r-8">
        <Label col="0" class="mlkit-result" textWrap="true" :text="textRecognized"></Label>
      </GridLayout>
    </GridLayout>

    <GridLayout v-else>
      <LottieView
        height="*"
        src="scan.json"
        :loop="true"
        v-if="hasContainerNumberFound"
        :autoPlay="hasContainerNumberFound"
      ></LottieView>
    </GridLayout>
  </Page>
</template>

<script lang="ts">
import { mapActions, mapGetters } from 'vuex';
import { TYPES } from '../store/types';
import FeedbackNotification from '@/utils/FeedbackNotification';
import { boxTechApi } from '@/api/http/api';
import { MESSAGE_NOT_RECOGNISE_CONTAINER_CODE } from '@/common/exceptions/constants';
import getContainerCode from '@/utils/ContainerValidator';

export default {
  data() {
    return {
      torchOn: false,
      textRecognized: '',
      searchText: true,
      searchCodes: false,
      hasContainerNumberFound: null,
      runningAnimations: false,
    };
  },
  methods: {
    ...mapActions({
      updateIdentifiedContainer: `${TYPES.modules.CORE}/${TYPES.actions.UPDATE_IDENTIFIED_CONTAINER}`,
    }),
    onLoadPage() {
      this.hasContainerNumberFound = false;
      this.runningAnimations = false;
    },
    async getIdentifyContainerInfo(containerNumber) {
      console.log('containerNumber: ', containerNumber);
      await boxTechApi
        .getContainerInfo(containerNumber)
        .then((response) => {
          console.log('RESPONSE: ', response.data)
          this.updateIdentifiedContainer(response.data[0]);
          this.hasContainerNumberFound = false;
          this.$navigator.navigate('container', {
            frame: 'main',
            animated: true,
            transition: {
              name: 'slideBottom',
              duration: 800,
              curve: 'spring',
            },
          });
        })
        .catch(async (err) => {
          await FeedbackNotification.showPopupWarning(`${MESSAGE_NOT_RECOGNISE_CONTAINER_CODE}: ${containerNumber}`);
          this.hasContainerNumberFound = false;
          this.runningAnimations = false;
        });
    },
    async onTextRecognitionResult(result) {
      if (global.isDevEnv) console.log('onTextRecognitionResult: ' + result.value.text);
      // this.textRecognized = result.value.text;
      if (!this.hasContainerNumberFound) {
        const containerNumber = getContainerCode(result.value.text);
        if (containerNumber) {
          this.runningAnimations = true;
          this.hasContainerNumberFound = true;
          let _that = this;
          await setTimeout(function () {
            _that.getIdentifyContainerInfo(containerNumber);
          }, 4000);
        }
      }
    },
    toggleTorch(event) {
      this.torchOn = event.value;
    },
  },
};
</script>

<style scoped lang="scss">
ActionBar {
  background-color: #ffffff;
  color: #ffffff;
}
.swing {
  animation-name: swingAnimation;
  animation-duration: 4s;
  animation-iteration-count: 100;
  animation-timing-function: cubic-bezier(0.42, 0, 1, 1);
}

@keyframes swingAnimation {
  0% {
    transform: translate(0, 0);
  }
  50% {
    transform: translate(0, 320);
  }
  100% {
    transform: translate(0, 0);
  }
}

Label.mlkit-result {
  margin: 5;
  text-align: left;
  color: white;
  font-size: 17;
}

.mask {
  background-color: rgba(0, 0, 0, 0.2);
}

.frame-top-left {
  border-top-width: 3;
  border-left-width: 3;
  border-color: #049c88;
}

.frame-top-right {
  border-top-width: 3;
  border-right-width: 3;
  border-color: #049c88;
}

.frame-bottom-left {
  border-bottom-width: 3;
  border-left-width: 3;
  border-color: #049c88;
}

.frame-bottom-right {
  border-bottom-width: 3;
  border-right-width: 3;
  border-color: #049c88;
}
.fab-central-button {
  height: 80;
  width: 80;
  margin: 40;
  horizontal-align: center;
}
.fab-buttons {
  height: 70;
  width: 70;
  margin: 40;
  horizontal-align: center;
}
.active {
  background-color: #049c88;
  color: white;
}
.inactive {
  background-color: white;
  color: #049c88;
}
</style>
