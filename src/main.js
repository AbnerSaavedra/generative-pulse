import './style.css';
import { Haptics, ImpactStyle } from '@capacitor/haptics';
import { Preferences } from '@capacitor/preferences';
import { createGenerativeSketch } from './sketch.js';

const STORAGE_KEY = 'generative-pulse-settings';
const SESSION_KEY = 'generative-pulse-session';
const ADVICE_TOPICS = [
  { value: '', label: 'Consejo general' },
  { value: 'focus', label: 'Foco' },
  { value: 'study', label: 'Estudio' },
  { value: 'calm', label: 'Calma' },
  { value: 'motivation', label: 'Motivacion' },
  { value: 'productivity', label: 'Productividad' },
  { value: 'rest', label: 'Descanso' },
  { value: 'custom', label: 'Otro tema' },
];

const state = {
  isRunning: false,
  isBreak: false,
  remainingSeconds: 25 * 60,
  totalSeconds: 25 * 60,
  pulseBoost: 0,
  quote: 'Pulsa iniciar para comenzar tu bloque de enfoque.',
  quoteMeta: 'Consejo general',
  translatedQuote: '',
  isShowingTranslation: false,
};

let timerId = null;
const topicOptionsMarkup = ADVICE_TOPICS.map(
  (topic) => `<option value="${topic.value}">${topic.label}</option>`,
).join('');

document.querySelector('#app').innerHTML = `
  <main class="app-shell">
    <header class="hero">
      <p class="kicker">Capacitor + Vite + p5.js</p>
      <h1>GenerativePulse</h1>
      <p class="subtitle">Temporizador de foco con visual generativa, vibracion nativa y persistencia local.</p>
    </header>

    <section class="layout-grid">
      <section class="panel canvas-panel">
        <h2>Canvas Vivo</h2>
        <p>La animacion responde al avance del tiempo y al estado de la sesion.</p>
        <div id="canvas-root" aria-label="Canvas generativo"></div>
      </section>

      <section class="panel control-panel">
        <h2>Control de Sesion</h2>

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
          <label>
            Tema del consejo
            <select id="api-topic">
              ${topicOptionsMarkup}
            </select>
          </label>
          <label id="custom-topic-field" class="custom-topic-field hidden">
            Tema personalizado
            <input id="api-topic-custom" type="text" maxlength="40" placeholder="ej. creatividad, energia, examen" />
          </label>
          <p class="field-help">Usa un tema sugerido para pedir un consejo que la API pueda devolver con mas fiabilidad.</p>
          <button class="btn btn-secondary" type="submit">Guardar configuracion</button>
        </form>

        <article class="quote-box">
          <h3>Dato externo</h3>
          <p id="quote-meta" class="quote-meta"></p>
          <p id="quote-text"></p>
          <div class="quote-actions">
            <button id="fetch-quote-btn" class="btn" type="button">Actualizar dato</button>
            <button id="translate-quote-btn" class="btn" type="button">Traducir al espanol</button>
          </div>
        </article>
      </section>
    </section>
  </main>
`;

const timerDisplay = document.querySelector('#timer-display');
const modeDisplay = document.querySelector('#mode-display');
const quoteText = document.querySelector('#quote-text');
const quoteMeta = document.querySelector('#quote-meta');
const focusInput = document.querySelector('#focus-minutes');
const breakInput = document.querySelector('#break-minutes');
const apiInput = document.querySelector('#api-endpoint');
const topicInput = document.querySelector('#api-topic');
const customTopicField = document.querySelector('#custom-topic-field');
const customTopicInput = document.querySelector('#api-topic-custom');
const translateQuoteButton = document.querySelector('#translate-quote-btn');

const defaults = {
  focusMinutes: 25,
  breakMinutes: 5,
  apiEndpoint: 'https://api.adviceslip.com/advice',
  adviceTopic: 'focus',
  customAdviceTopic: '',
};

const getTopicLabel = (topicValue) => (
  ADVICE_TOPICS.find((topic) => topic.value === topicValue)?.label || topicValue || 'Consejo general'
);

const getEffectiveTopic = () => (
  settings.adviceTopic === 'custom'
    ? settings.customAdviceTopic.trim()
    : settings.adviceTopic.trim()
);

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
  quoteText.textContent = state.isShowingTranslation && state.translatedQuote
    ? state.translatedQuote
    : state.quote;
  quoteMeta.textContent = state.quoteMeta;
  translateQuoteButton.textContent = state.isShowingTranslation ? 'Ver original' : 'Traducir al espanol';
  customTopicField.classList.toggle('hidden', topicInput.value !== 'custom');
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
      quoteMeta: state.quoteMeta,
      translatedQuote: state.translatedQuote,
      isShowingTranslation: state.isShowingTranslation,
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
    state.quoteMeta = parsed.quoteMeta || state.quoteMeta;
    state.translatedQuote = parsed.translatedQuote || '';
    state.isShowingTranslation = Boolean(parsed.isShowingTranslation);
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

const buildAdviceUrl = (topic) => {
  const cleanEndpoint = settings.apiEndpoint.trim().replace(/\/$/, '');

  if (!topic) {
    return cleanEndpoint;
  }

  if (cleanEndpoint.includes('{query}')) {
    return cleanEndpoint.replace('{query}', encodeURIComponent(topic));
  }

  return `${cleanEndpoint}/search/${encodeURIComponent(topic)}`;
};

const loadAdvice = async () => {
  const topic = getEffectiveTopic();

  try {
    const response = await fetch(`${buildAdviceUrl(topic)}?t=${Date.now()}`);
    const data = await response.json();
    state.translatedQuote = '';
    state.isShowingTranslation = false;

    if (Array.isArray(data?.slips) && data.slips.length > 0) {
      const randomSlip = data.slips[Math.floor(Math.random() * data.slips.length)];
      state.quote = randomSlip.advice || 'Sin dato disponible en la API.';
      state.quoteMeta = `Consejo relacionado con: ${getTopicLabel(topic)}`;
    } else if (data?.slip?.advice) {
      state.quote = data.slip.advice;
      state.quoteMeta = topic ? `Consejo para: ${getTopicLabel(topic)}` : 'Consejo general';
    } else if (topic) {
      const fallbackResponse = await fetch(`${defaults.apiEndpoint}?t=${Date.now()}`);
      const fallbackData = await fallbackResponse.json();
      state.quote = fallbackData?.slip?.advice || 'Sin dato disponible en la API.';
      state.quoteMeta = `Sin coincidencias para: ${getTopicLabel(topic)}. Se muestra un consejo general.`;
    } else {
      state.quote = 'Sin dato disponible en la API.';
      state.quoteMeta = 'Consejo general';
    }
  } catch (error) {
    state.quote = 'No se pudo conectar con la API externa.';
    state.quoteMeta = 'Error de conexion';
    console.warn('Error cargando API externa:', error);
  }

  refreshUI();
  await saveSessionState();
};

const translateAdvice = async () => {
  if (state.isShowingTranslation) {
    state.isShowingTranslation = false;
    refreshUI();
    await saveSessionState();
    return;
  }

  if (state.translatedQuote) {
    state.isShowingTranslation = true;
    refreshUI();
    await saveSessionState();
    return;
  }

  try {
    translateQuoteButton.disabled = true;
    const response = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(state.quote)}&langpair=en|es`,
    );
    const data = await response.json();
    const translatedText = data?.responseData?.translatedText?.trim();

    if (translatedText) {
      state.translatedQuote = translatedText;
      state.isShowingTranslation = true;
      state.quoteMeta = `${state.quoteMeta} · Traducido al espanol`;
    } else {
      state.quoteMeta = 'No se pudo traducir el consejo en este momento.';
    }
  } catch (error) {
    state.quoteMeta = 'No se pudo traducir el consejo en este momento.';
    console.warn('Error traduciendo consejo:', error);
  } finally {
    translateQuoteButton.disabled = false;
    refreshUI();
    await saveSessionState();
  }
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
      adviceTopic: parsed.adviceTopic || defaults.adviceTopic,
      customAdviceTopic: parsed.customAdviceTopic || defaults.customAdviceTopic,
    };
  } catch (error) {
    console.warn('No se pudieron cargar las preferencias guardadas.', error);
  }
};

const hydrateForm = () => {
  focusInput.value = String(settings.focusMinutes);
  breakInput.value = String(settings.breakMinutes);
  apiInput.value = settings.apiEndpoint;
  topicInput.value = settings.adviceTopic;
  customTopicInput.value = settings.customAdviceTopic;
  customTopicField.classList.toggle('hidden', settings.adviceTopic !== 'custom');
};

document.querySelector('#start-btn').addEventListener('click', startTimer);
document.querySelector('#pause-btn').addEventListener('click', stopTimer);
document.querySelector('#reset-btn').addEventListener('click', resetTimer);

document.querySelector('#fetch-quote-btn').addEventListener('click', () => {
  void loadAdvice();
});

translateQuoteButton.addEventListener('click', () => {
  void translateAdvice();
});

topicInput.addEventListener('change', () => {
  customTopicField.classList.toggle('hidden', topicInput.value !== 'custom');
});

document.querySelector('#settings-form').addEventListener('submit', async (event) => {
  event.preventDefault();

  settings.focusMinutes = Number(focusInput.value);
  settings.breakMinutes = Number(breakInput.value);
  settings.apiEndpoint = apiInput.value.trim();
  settings.adviceTopic = topicInput.value.trim();
  settings.customAdviceTopic = customTopicInput.value.trim();

  if (settings.adviceTopic === 'custom' && !settings.customAdviceTopic) {
    state.quote = 'Escribe un tema personalizado antes de guardar la configuracion.';
    state.quoteMeta = 'Tema personalizado requerido';
    refreshUI();
    return;
  }

  await saveSettings();
  resetTimer();
  state.quote = 'Configuracion guardada. Ya puedes pedir un consejo ajustado a tu tema.';
  state.translatedQuote = '';
  state.isShowingTranslation = false;
  state.quoteMeta = getEffectiveTopic()
    ? `Tema activo: ${getTopicLabel(getEffectiveTopic())}`
    : 'Consejo general';
  refreshUI();
  await saveSessionState();
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
