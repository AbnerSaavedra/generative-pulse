import './style.css';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { Preferences } from '@capacitor/preferences';
import { createGenerativeSketch } from './sketch.js';

const STORAGE_KEY = 'generative-pulse-settings';
const SESSION_KEY = 'generative-pulse-session';

const state = {
  isRunning: false,
  isBreak: false,
  remainingSeconds: 25 * 60,
  totalSeconds: 25 * 60,
  pulseBoost: 0,
  quote: 'Pulsa iniciar para comenzar tu bloque de enfoque.',
};

let timerId = null;

document.querySelector('#app').innerHTML = `
  <main class="app-shell">
    <header class="hero">
      <p class="kicker">Capacitor + Vite + p5.js</p>
      <h1>GenerativePulse</h1>
      <p class="subtitle">Temporizador de foco con visual generativa, vibración nativa y persistencia local.</p>
    </header>

    <section class="layout-grid">
      <section class="panel canvas-panel">
        <h2>Canvas Vivo</h2>
        <p>La animación responde al avance del tiempo y al estado de la sesión.</p>
        <div id="canvas-root" aria-label="Canvas generativo"></div>
      </section>

      <section class="panel control-panel">
        <h2>Control de Sesión</h2>

        <div class="timer" id="timer-display">25:00</div>
        <p class="mode" id="mode-display">Modo foco</p>

        <div class="actions">
          <button id="start-btn" type="button" class="btn btn-primary">Iniciar</button>
          <button id="pause-btn" type="button" class="btn">Pausar</button>
          <button id="reset-btn" type="button" class="btn">Reiniciar</button>
        </div>

        <form id="settings-form" class="settings">
          <label>
            Minutos foco
            <input id="focus-minutes" type="number" min="1" max="90" required />
          </label>
          <label>
            Minutos descanso
            <input id="break-minutes" type="number" min="1" max="30" required />
          </label>
          <label>
            API externa (sin clave)
            <input id="api-endpoint" type="url" required />
          </label>
          <button class="btn btn-secondary" type="submit">Guardar configuración</button>
        </form>

        <article class="quote-box">
          <h3>Dato externo</h3>
          <p id="quote-text"></p>
          <button id="fetch-quote-btn" class="btn" type="button">Actualizar dato</button>
        </article>
      </section>
    </section>
  </main>
`;

const timerDisplay = document.querySelector('#timer-display');
const modeDisplay = document.querySelector('#mode-display');
const quoteText = document.querySelector('#quote-text');
const focusInput = document.querySelector('#focus-minutes');
const breakInput = document.querySelector('#break-minutes');
const apiInput = document.querySelector('#api-endpoint');

const defaults = {
  focusMinutes: 25,
  breakMinutes: 5,
  apiEndpoint: 'https://api.adviceslip.com/advice',
};

let settings = { ...defaults };

createGenerativeSketch('canvas-root', () => state);

const secondsFromMinutes = (minutes) => Math.max(1, Math.floor(minutes)) * 60;

const formatSeconds = (seconds) => {
  const minutes = Math.floor(seconds / 60);
  const remaining = seconds % 60;
  return `${String(minutes).padStart(2, '0')}:${String(remaining).padStart(2, '0')}`;
};

const refreshUI = () => {
  timerDisplay.textContent = formatSeconds(state.remainingSeconds);
  modeDisplay.textContent = state.isBreak ? 'Modo descanso' : 'Modo foco';
  quoteText.textContent = state.quote;
};

const notifyNative = async () => {
  try {
    await Haptics.impact({ style: ImpactStyle.Medium });
  } catch (error) {
    console.warn('Haptics no disponible en este dispositivo.', error);
  }
};

const saveSessionState = async () => {
  await Preferences.set({
    key: SESSION_KEY,
    value: JSON.stringify({
      isRunning: state.isRunning,
      isBreak: state.isBreak,
      remainingSeconds: state.remainingSeconds,
      totalSeconds: state.totalSeconds,
      quote: state.quote,
    }),
  });
};

const loadSessionState = async () => {
  const { value } = await Preferences.get({ key: SESSION_KEY });
  if (!value) {
    return false;
  }

  try {
    const parsed = JSON.parse(value);
    state.isRunning = Boolean(parsed.isRunning);
    state.isBreak = Boolean(parsed.isBreak);
    state.remainingSeconds = Number(parsed.remainingSeconds) || secondsFromMinutes(settings.focusMinutes);
    state.totalSeconds = Number(parsed.totalSeconds) || secondsFromMinutes(settings.focusMinutes);
    state.quote = parsed.quote || state.quote;
    return true;
  } catch (error) {
    console.warn('No se pudo restaurar la sesion guardada.', error);
    return false;
  }
};

const stopTimer = () => {
  if (timerId) {
    clearInterval(timerId);
    timerId = null;
  }
  state.isRunning = false;
  void saveSessionState();
};

const switchMode = () => {
  state.isBreak = !state.isBreak;
  state.totalSeconds = secondsFromMinutes(
    state.isBreak ? settings.breakMinutes : settings.focusMinutes,
  );
  state.remainingSeconds = state.totalSeconds;
};

const loadAdvice = async () => {
  try {
    const response = await fetch(`${settings.apiEndpoint}?t=${Date.now()}`);
    const data = await response.json();
    state.quote = data?.slip?.advice || 'Sin dato disponible en la API.';
  } catch (error) {
    state.quote = 'No se pudo conectar con la API externa.';
    console.warn('Error cargando API externa:', error);
  }
  refreshUI();
  await saveSessionState();
};

const tick = async () => {
  if (!state.isRunning) {
    return;
  }

  state.remainingSeconds -= 1;
  state.pulseBoost = 1;

  if (state.remainingSeconds <= 0) {
    await notifyNative();
    switchMode();
    await loadAdvice();
  }

  refreshUI();
  await saveSessionState();
};

const startTimer = () => {
  if (state.isRunning) {
    return;
  }

  state.isRunning = true;
  state.pulseBoost = 1;
  timerId = setInterval(() => {
    void tick();
  }, 1000);
  void saveSessionState();
};

const resetTimer = () => {
  stopTimer();
  state.isBreak = false;
  state.totalSeconds = secondsFromMinutes(settings.focusMinutes);
  state.remainingSeconds = state.totalSeconds;
  refreshUI();
  void saveSessionState();
};

const saveSettings = async () => {
  await Preferences.set({
    key: STORAGE_KEY,
    value: JSON.stringify(settings),
  });
};

const loadSettings = async () => {
  const { value } = await Preferences.get({ key: STORAGE_KEY });
  if (!value) {
    return;
  }

  try {
    const parsed = JSON.parse(value);
    settings = {
      focusMinutes: Number(parsed.focusMinutes) || defaults.focusMinutes,
      breakMinutes: Number(parsed.breakMinutes) || defaults.breakMinutes,
      apiEndpoint: parsed.apiEndpoint || defaults.apiEndpoint,
    };
  } catch (error) {
    console.warn('No se pudieron cargar las preferencias guardadas.', error);
  }
};

const hydrateForm = () => {
  focusInput.value = String(settings.focusMinutes);
  breakInput.value = String(settings.breakMinutes);
  apiInput.value = settings.apiEndpoint;
};

document.querySelector('#start-btn').addEventListener('click', startTimer);
document.querySelector('#pause-btn').addEventListener('click', stopTimer);
document.querySelector('#reset-btn').addEventListener('click', resetTimer);

document.querySelector('#fetch-quote-btn').addEventListener('click', () => {
  void loadAdvice();
});

document.querySelector('#settings-form').addEventListener('submit', async (event) => {
  event.preventDefault();

  settings.focusMinutes = Number(focusInput.value);
  settings.breakMinutes = Number(breakInput.value);
  settings.apiEndpoint = apiInput.value.trim();

  await saveSettings();
  resetTimer();
  state.quote = 'Configuración guardada localmente.';
  refreshUI();
});

const bootstrap = async () => {
  await loadSettings();
  hydrateForm();
  const restored = await loadSessionState();

  if (!restored) {
    state.totalSeconds = secondsFromMinutes(settings.focusMinutes);
    state.remainingSeconds = state.totalSeconds;
  }

  refreshUI();

  if (!restored) {
    await loadAdvice();
  }

  if (state.isRunning) {
    state.isRunning = false;
    startTimer();
  }
};

window.addEventListener('beforeunload', () => {
  void saveSessionState();
});

void bootstrap();
