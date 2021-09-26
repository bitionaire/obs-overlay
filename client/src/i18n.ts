import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
    en: {
        translation: {
            "start.title": "Starting …",
            "pause.title": "Taking a break …",
            "end.title": "The end",
            "end.thx": "THX",
            "end.thx__subtitle": "for tuning in",
            "end.thx__p1": "I'm looking forward to the next session with you and hope you enjoyed today's stream.",
            "end.thx__p2": "If so, join my lovely followers and don't miss the next one.",
            "follower.before": "",
            "follower.after": " now follows",
        }
    },
    de: {
        translation: {
            "start.title": "Ab geht's …",
            "pause.title": "Kurze Pause …",
            "end.title": "Ende",
            "end.thx": "DANKE",
            "end.thx__subtitle": "für's Einschalten",
            "end.thx__p1": "Ich hoffe euch hat's gefallen und ihr seid auch beim nächsten mal wieder dabei.",
            "end.thx__p2": "Um  keine Minute zu verpassen solltet ihr euch jetzt gleich der Liste meiner liebenswerten Follower anschließen.",
            "follower.before": "Willkommen ",
            "follower.after": "",
        }
    }
};

i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources,
        lng: "de",
        interpolation: {
            escapeValue: false // react already safes from xss
        }
    });

export default i18n;