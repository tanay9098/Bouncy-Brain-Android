// src/utils/sound.ts
import { Audio } from 'expo-av';

let tabAlertSound: Audio.Sound | null = null;
let sessionCompleteSound: Audio.Sound | null = null;

// Load sounds on app start
export async function loadSounds(): Promise<void> {
  try {
    // Tab alert sound
    const { sound: alertSound } = await Audio.Sound.createAsync(
      require('../../assets/sounds/tab-alert.mp3'),
      { shouldPlay: false }
    );
    tabAlertSound = alertSound;

    // Session complete sound
    const { sound: completeSound } = await Audio.Sound.createAsync(
      require('../../assets/sounds/session-complete.mp3'),
      { shouldPlay: false }
    );
    sessionCompleteSound = completeSound;
  } catch (error) {
    console.warn('Error loading sounds:', error);
  }
}

// Play tab alert sound
export async function playTabAlert(): Promise<void> {
  try {
    if (tabAlertSound) {
      await tabAlertSound.replayAsync();
    }
  } catch (error) {
    console.warn('Error playing tab alert:', error);
  }
}

// Play session complete sound
export async function playSessionComplete(): Promise<void> {
  try {
    if (sessionCompleteSound) {
      await sessionCompleteSound.replayAsync();
    }
  } catch (error) {
    console.warn('Error playing session complete:', error);
  }
}

// Unload sounds (call on app unmount)
export async function unloadSounds(): Promise<void> {
  try {
    if (tabAlertSound) {
      await tabAlertSound.unloadAsync();
      tabAlertSound = null;
    }
    if (sessionCompleteSound) {
      await sessionCompleteSound.unloadAsync();
      sessionCompleteSound = null;
    }
  } catch (error) {
    console.warn('Error unloading sounds:', error);
  }
}