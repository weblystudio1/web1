import React, { useState, useEffect, useRef } from "react";

const BUSINESS_DATA = {
  businessName: "Webly Studio",
  phone: "054-352-1136",
  phoneInternational: "+972 54-352-1136",
  whatsappRaw: "972543521136",
  email: "weblystudio1@gmail.com",
  accessibilityOfficerName: "Webly Studio",
  accessibilityPhone: "+972 54-352-1136",
  accessibilityEmail: "weblystudio1@gmail.com",
};

function getWhatsAppUrl() {
  return `https://wa.me/972543521136?text=${encodeURIComponent(
    "שלום Webly, הגעתי דרך דף הנחיתה ואשמח לבדיקת התאמה עבור העסק שלי."
  )}`;
}

function triggerAnalytics(eventName: string, details?: Record<string, any>) {
  try {
    if (typeof window !== "undefined") {
      const event = new CustomEvent("webly_analytics_event", {
        detail: {
          eventName,
          timestamp: new Date().toISOString(),
          ...details,
        },
      });
      window.dispatchEvent(event);
    }
  } catch {
    // noop
  }
}

const STRINGS = {
  header: {
    logoName: "WEBLY",
    logoSub: "STUDIO",
  },
  leadForm: {
    title: "בואו נבדוק מה העסק שלכם באמת צריך",
    subtitle:
      "השאירו פרטים ונחזור אליכם עם כיוון ברור והערכה מותאמת — ללא התחייבות.",
    fullNameLabel: "שם מלא",
    businessNameLabel: "שם העסק (אופציונלי)",
    phoneLabel: "טלפון",
    emailLabel: "כתובת אימייל (אופציונלי)",
    solutionTypeLabel: "סוג הפתרון שמעניין אותי",
    solutionOptions: [
      { id: "not_sure", label: "אשמח לייעוץ — לא בטוח מה מתאים" },
      { id: "landing_page", label: "דף נחיתה לקמפיין" },
      { id: "business_site", label: "אתר תדמית מקצועי" },
      { id: "ecommerce_store", label: "חנות דיגיטלית (E-Commerce)" },
      { id: "custom_automation", label: "מערכת עסקית ואוטומציות" },
    ],
    messageLabel: "הודעה קצרה או דגשים מיוחדים (אופציונלי)",
    privacyLabel:
      "קראתי ואני מאשר/ת את מדיניות הפרטיות לצורך קבלת מענה לפנייתי.",
    submitButton: "שלחו לי התאמה ראשונית",
    whatsappAltTitle: "מעדיפים לדבר עכשיו?",
    whatsappAltButton: "פתחו שיחה ב־WhatsApp",
    requiredNotice: "* שדות חובה מסומנים בכוכבית",
    validation: {
      fullNameRequired: "נא להזין שם מלא",
      phoneRequired: "נא להזין מספר טלפון תקין ליצירת קשר",
      privacyRequired: "יש לאשר את מדיניות הפרטיות כדי לשלוח את הטופס",
    },
    successMessage:
      "פנייתכם התקבלה בהצלחה! נחזור אליכם בהקדם עם בדיקת התאמה ראשונית.",
  },
  footer: {
    tagline:
      "בניית אתרים מותאמים לצורכי העסק, עם נגישות מהיסוד ויחס אישי.",
    accessibilityStatementLink: "הצהרת נגישות",
    privacyPolicyLink: "מדיניות פרטיות",
    backToTop: "חזרה לראש העמוד",
  },
};

const Header = ({ onOpenAccessibility }: { onOpenAccessibility: () => void }) => {
  const [isOpen, setIsOpen] = useState(false);

  const scrollTo = (id: string) => {
    setIsOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <header id="main-header" className="short-header">
      <a className="brand" href="#hero-section" aria-label="Webly Studio — ראש העמוד">
        <strong>webly</strong>
        <span>studio</span>
      </a>
      <nav aria-label="ניווט ראשי" className={isOpen ? "short-nav is-open" : "short-nav"}>
        <button type="button" onClick={() => scrollTo("story")}>
          למה אנחנו
        </button>
        <button type="button" onClick={() => scrollTo("lead-form")}>
          יצירת קשר
        </button>
      </nav>
      <div className="header-actions">
        <button
          type="button"
          className="a11y-trigger"
          onClick={onOpenAccessibility}
          aria-label="פתיחת כלי נגישות"
        >
          נגישות
        </button>
        <button type="button" className="header-cta" onClick={() => scrollTo("lead-form")}>
          בואו נדבר
        </button>
        <button
          type="button"
          className="menu-trigger"
          onClick={() => setIsOpen((prev) => !prev)}
          aria-expanded={isOpen}
          aria-controls="main-mobile-nav"
          aria-label={isOpen ? "סגירת תפריט" : "פתיחת תפריט"}
        >
          {isOpen ? "×" : "☰"}
        </button>
      </div>
    </header>
  );
};

const TICKER_ITEMS = [
  "LANDING PAGES",
  "WEBSITES",
  "E-COMMERCE",
  "AUTOMATIONS",
  "CUSTOM DEV",
  "ACCESSIBLE DESIGN",
];

const TICKER_SEQUENCE = [
  ...TICKER_ITEMS,
  ...TICKER_ITEMS,
  ...TICKER_ITEMS,
  ...TICKER_ITEMS,
];

const Hero = () => {
  const heroRef = useRef<HTMLElement | null>(null);

  const handlePointerMove = (e: React.PointerEvent<HTMLElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    e.currentTarget.style.setProperty("--pointer-x", `${e.clientX - rect.left}px`);
    e.currentTarget.style.setProperty("--pointer-y", `${e.clientY - rect.top}px`);
  };

  return (
    <section
      ref={heroRef}
      onPointerMove={handlePointerMove}
      id="hero-section"
      className="short-hero"
      aria-labelledby="hero-heading"
    >
      <div className="hero-grid" aria-hidden="true" />
      <div className="hero-glow" aria-hidden="true" />
      <div className="short-hero__copy">
        <h1 id="hero-heading">
          בונים לעסק שלכם
          <br />
          <span>בדיוק</span> את מה שהוא צריך.
        </h1>
        <p className="hero-sub">
          דפי נחיתה, אתרי תדמית, חנויות ואוטומציות — במחיר שמתאים להיקף האמיתי של הפרויקט, עם יחס אישי ונגישות מהבסיס.
        </p>
        <div className="hero-actions">
          <a
            href="#lead-form"
            className="cta-main"
            onClick={() => triggerAnalytics("cta_hero_click", { source: "hero" })}
          >
            <span>קבלו הצעה שמתאימה לעסק</span>
            <b aria-hidden="true">↙</b>
          </a>
          <a
            href={getWhatsAppUrl()}
            target="_blank"
            rel="noopener noreferrer"
            className="cta-link"
            onClick={() => triggerAnalytics("whatsapp_click", { source: "hero" })}
          >
            דברו איתנו ב־WhatsApp
          </a>
        </div>
      </div>

      <div className="value-shell">
        <div className="value-shell__top">
          <span>WEBLY / CAPABILITIES</span>
          <span className="live-dot">מקבלים פרויקטים חדשים</span>
        </div>
        <div className="value-list" aria-label="היתרונות של Webly">
          <article>
            <span>01</span>
            <h2>רק מה שצריך</h2>
            <p>מתאימים את סוג האתר לעסק, לא להפך.</p>
            <i aria-hidden="true">↗</i>
          </article>
          <article>
            <span>02</span>
            <h2>נגיש מהבסיס</h2>
            <p>נגישות כחלק מהעיצוב והקוד, לא רק תוסף.</p>
            <i aria-hidden="true">↗</i>
          </article>
          <article>
            <span>03</span>
            <h2>פשוט או מורכב</h2>
            <p>מדף נחיתה ועד חנות ומערכת אוטומציה.</p>
            <i aria-hidden="true">↗</i>
          </article>
          <article>
            <span>04</span>
            <h2>יחס אישי</h2>
            <p>עובדים ישירות איתנו, בשקיפות ובגובה העיניים.</p>
            <i aria-hidden="true">↗</i>
          </article>
        </div>
      </div>

      <div className="tech-ticker" aria-hidden="true" dir="ltr">
        <div className="tech-ticker__track">
          {TICKER_SEQUENCE.map((item, idx) => (
            <span key={`t1-${idx}`} className="tech-ticker__item">
              <span>{item}</span>
              <b aria-hidden="true">✦</b>
            </span>
          ))}
        </div>
        <div className="tech-ticker__track" aria-hidden="true">
          {TICKER_SEQUENCE.map((item, idx) => (
            <span key={`t2-${idx}`} className="tech-ticker__item">
              <span>{item}</span>
              <b aria-hidden="true">✦</b>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

const Story = () => (
  <section id="story" className="short-story" aria-labelledby="story-heading">
    <div className="story-photo">
      <img 
        src="https://res.cloudinary.com/dqsxisjlg/image/upload/v1788533429/8ce0e91e-2229-4b2d-82ba-9f0c32e09f3e.png" 
        alt="תמונה של השותף ב-Webly" 
        className="absolute inset-0 w-full h-full object-cover z-0" 
        loading="lazy"
        referrerPolicy="no-referrer"
      />
      <i aria-hidden="true">PORTRAIT / 01</i>
    </div>
    <div className="story-copy">
      <p className="kicker">מאחורי Webly</p>
      <h2 id="story-heading">
        צעיר בגיל.
        <br />
        רציני בעבודה.
      </h2>
      <p>
        השותף והמפתח המוביל שלנו בן 17 ולומד בתיכון ליד האוניברסיטה העברית בירושלים. מאחוריו ארבע שנות למידה וניסיון ושנתיים של עשייה מקצועית בפועל.
      </p>
      <p className="story-note">
        הגישה שלו פשוטה: להבין את העסק לעומק, לבחור רק את מה שנחוץ ולבנות כל פרט כמו שצריך.
      </p>
      <dl className="story-stats">
        <div>
          <dt>4</dt>
          <dd>שנות ניסיון ולמידה</dd>
        </div>
        <div>
          <dt>2</dt>
          <dd>שנות עשייה בפועל</dd>
        </div>
      </dl>
    </div>
  </section>
);

const LeadForm = ({
  initialSolutionType,
  onOpenPrivacyModal,
}: {
  initialSolutionType?: string;
  onOpenPrivacyModal: () => void;
}) => {
  const [fullName, setFullName] = useState("");
  const [businessName, setBusinessName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [solutionType, setSolutionType] = useState(initialSolutionType || "not_sure");
  const [message, setMessage] = useState("");
  const [privacyAgreed, setPrivacyAgreed] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  const errorSummaryRef = useRef<HTMLDivElement | null>(null);
  const fullNameRef = useRef<HTMLInputElement | null>(null);
  const phoneRef = useRef<HTMLInputElement | null>(null);
  const privacyRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    if (initialSolutionType) {
      setSolutionType(initialSolutionType);
    }
  }, [initialSolutionType]);

  const handleStart = () => {
    if (!hasStarted) {
      setHasStarted(true);
      triggerAnalytics("lead_form_start");
    }
  };

  const validate = () => {
    const errs: Record<string, string> = {};
    if (!fullName.trim()) {
      errs.fullName = STRINGS.leadForm.validation.fullNameRequired;
    }
    const cleanPhone = phone.replace(/[\s-]/g, "");
    if (!cleanPhone || cleanPhone.length < 9) {
      errs.phone = STRINGS.leadForm.validation.phoneRequired;
    }
    if (!privacyAgreed) {
      errs.privacy = STRINGS.leadForm.validation.privacyRequired;
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) {
      triggerAnalytics("lead_form_error", {
        errorField: Object.keys(errors)[0] || "validation",
      });
      setTimeout(() => {
        errorSummaryRef.current?.focus();
      }, 50);
      return;
    }

    setIsSubmitting(true);
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "7a9ce23f-d8c5-4207-8d66-884aac2a8deb",
          name: fullName,
          email: email || "לא הוזן",
          phone: phone,
          business_name: businessName || "לא הוזן",
          solution_type: solutionType,
          message: message || "לא הוזן",
          from_name: "Webly Studio Lead",
        }),
      });

      const result = await response.json();
      
      if (result.success) {
        setIsSubmitted(true);
        triggerAnalytics("lead_form_submit", { recommendation: solutionType });
      } else {
        setErrors({ submit: "אירעה שגיאה בשליחת הטופס, אנא נסה שוב." });
        setTimeout(() => errorSummaryRef.current?.focus(), 50);
      }
    } catch (error) {
      setErrors({ submit: "אירעה שגיאה בשליחת הטופס, אנא נסה שוב." });
      setTimeout(() => errorSummaryRef.current?.focus(), 50);
    } finally {
      setIsSubmitting(false);
    }
  };

  const errorCount = Object.keys(errors).length;

  return (
    <section
      id="contact"
      className="scroll-mt-20 py-12 sm:py-16 lg:py-20 bg-[#07111F]"
      aria-labelledby="form-heading"
    >
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <span className="inline-flex items-center gap-1.5 rounded-full border border-[#1E334D] bg-[#0D1B2A] px-3.5 py-1 text-xs font-bold text-[#00D2B4]">
            יצירת קשר מהירה
          </span>
          <h2
            id="form-heading"
            className="mt-3 text-2xl font-extrabold tracking-tight text-[#F7FAFC] sm:text-3xl lg:text-4xl"
          >
            {STRINGS.leadForm.title}
          </h2>
          <p className="mt-2 text-base text-[#CBD5E1]">{STRINGS.leadForm.subtitle}</p>
        </div>

        <div className="mt-8 rounded-2xl border border-[#1E334D] bg-[#0D1B2A] p-6 shadow-xl sm:p-8">
          {errorCount > 0 && (
            <div
              ref={errorSummaryRef}
              tabIndex={-1}
              role="alert"
              aria-labelledby="error-summary-heading"
              className="mb-6 rounded-xl border border-red-500/50 bg-red-950/40 p-4 focus:outline-none focus:ring-2 focus:ring-red-400"
            >
              <h3 id="error-summary-heading" className="text-sm font-bold text-red-300">
                נמצאו {errorCount} שגיאות בטופס. נא לתקן את השדות הבאים:
              </h3>
              <ul className="mt-2 list-disc list-inside space-y-1 text-xs text-red-200">
                {errors.submit && (
                  <li>
                    <span className="text-red-200">{errors.submit}</span>
                  </li>
                )}
                {errors.fullName && (
                  <li>
                    <a
                      href="#field-fullname"
                      onClick={(e) => {
                        e.preventDefault();
                        fullNameRef.current?.focus();
                      }}
                      className="underline hover:text-white"
                    >
                      {errors.fullName}
                    </a>
                  </li>
                )}
                {errors.phone && (
                  <li>
                    <a
                      href="#field-phone"
                      onClick={(e) => {
                        e.preventDefault();
                        phoneRef.current?.focus();
                      }}
                      className="underline hover:text-white"
                    >
                      {errors.phone}
                    </a>
                  </li>
                )}
                {errors.privacy && (
                  <li>
                    <a
                      href="#field-privacy"
                      onClick={(e) => {
                        e.preventDefault();
                        privacyRef.current?.focus();
                      }}
                      className="underline hover:text-white"
                    >
                      {errors.privacy}
                    </a>
                  </li>
                )}
              </ul>
            </div>
          )}

          {isSubmitted ? (
            <div
              role="status"
              aria-live="polite"
              className="rounded-xl border border-[#00D2B4]/50 bg-[#00D2B4]/10 p-6 text-center"
            >
              <div
                className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#00D2B4] text-[#04171E]"
                aria-hidden="true"
              >
                <svg
                  className="h-6 w-6"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="3"
                  viewBox="0 0 24 24"
                >
                  <polyline points="20 6 9 17 4 12" />
                </svg>
              </div>
              <h3 className="mt-3 text-xl font-bold text-[#F7FAFC]">
                {STRINGS.leadForm.successMessage}
              </h3>
              <p className="mt-2 text-xs text-[#CBD5E1]">
                תודה שפניתם אלינו, נציג Webly יצור עמכם קשר בהקדם.
              </p>
              <button
                type="button"
                onClick={() => setIsSubmitted(false)}
                className="mt-5 inline-flex rounded-lg border border-[#1E334D] bg-[#07111F] px-4 py-2 text-xs font-semibold text-[#CBD5E1] transition-colors hover:text-[#00D2B4]"
              >
                שליחת פנייה נוספת
              </button>
            </div>
          ) : (
            <form
              id="lead-form"
              onSubmit={handleSubmit}
              noValidate
              className="space-y-4"
              aria-label="טופס השארת פרטים לבדיקת התאמה"
            >
              <p className="text-xs text-[#94A3B8]">{STRINGS.leadForm.requiredNotice}</p>

              <div>
                <label
                  htmlFor="field-fullname"
                  className="block text-sm font-semibold text-[#F7FAFC]"
                >
                  {STRINGS.leadForm.fullNameLabel}{" "}
                  <span className="text-red-400" aria-hidden="true">
                    *
                  </span>
                </label>
                <input
                  ref={fullNameRef}
                  type="text"
                  id="field-fullname"
                  name="fullname"
                  autoComplete="name"
                  required
                  value={fullName}
                  onFocus={handleStart}
                  onChange={(e) => {
                    setFullName(e.target.value);
                    if (errors.fullName) setErrors((prev) => ({ ...prev, fullName: "" }));
                  }}
                  aria-invalid={!!errors.fullName}
                  aria-describedby={errors.fullName ? "error-fullname" : undefined}
                  className={`mt-1.5 w-full rounded-xl border bg-[#07111F] px-4 py-3 text-base text-[#F7FAFC] placeholder:text-[#64748B] focus:outline-none focus:ring-2 ${
                    errors.fullName
                      ? "border-red-500 focus:ring-red-400"
                      : "border-[#1E334D] focus:border-[#00D2B4] focus:ring-[#00D2B4]"
                  }`}
                  placeholder="למשל: ישראל ישראלי"
                />
                {errors.fullName && (
                  <p id="error-fullname" className="mt-1 text-xs font-medium text-red-400">
                    {errors.fullName}
                  </p>
                )}
              </div>

              <div>
                <label
                  htmlFor="field-businessname"
                  className="block text-sm font-semibold text-[#F7FAFC]"
                >
                  {STRINGS.leadForm.businessNameLabel}
                </label>
                <input
                  type="text"
                  id="field-businessname"
                  name="organization"
                  autoComplete="organization"
                  value={businessName}
                  onFocus={handleStart}
                  onChange={(e) => setBusinessName(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-[#1E334D] bg-[#07111F] px-4 py-3 text-base text-[#F7FAFC] placeholder:text-[#64748B] focus:border-[#00D2B4] focus:outline-none focus:ring-2 focus:ring-[#00D2B4]"
                  placeholder="למשל: סטודיו לצילום / חנות בגדים"
                />
              </div>

              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="field-phone"
                    className="block text-sm font-semibold text-[#F7FAFC]"
                  >
                    {STRINGS.leadForm.phoneLabel}{" "}
                    <span className="text-red-400" aria-hidden="true">
                      *
                    </span>
                  </label>
                  <input
                    ref={phoneRef}
                    type="tel"
                    id="field-phone"
                    name="tel"
                    inputMode="tel"
                    autoComplete="tel"
                    required
                    dir="ltr"
                    value={phone}
                    onFocus={handleStart}
                    onChange={(e) => {
                      setPhone(e.target.value);
                      if (errors.phone) setErrors((prev) => ({ ...prev, phone: "" }));
                    }}
                    aria-invalid={!!errors.phone}
                    aria-describedby={errors.phone ? "error-phone" : undefined}
                    className={`mt-1.5 w-full text-right rounded-xl border bg-[#07111F] px-4 py-3 text-base text-[#F7FAFC] placeholder:text-[#64748B] focus:outline-none focus:ring-2 ${
                      errors.phone
                        ? "border-red-500 focus:ring-red-400"
                        : "border-[#1E334D] focus:border-[#00D2B4] focus:ring-[#00D2B4]"
                    }`}
                    placeholder="050-1234567"
                  />
                  {errors.phone && (
                    <p id="error-phone" className="mt-1 text-xs font-medium text-red-400">
                      {errors.phone}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="field-email"
                    className="block text-sm font-semibold text-[#F7FAFC]"
                  >
                    {STRINGS.leadForm.emailLabel}
                  </label>
                  <input
                    type="email"
                    id="field-email"
                    name="email"
                    autoComplete="email"
                    dir="ltr"
                    value={email}
                    onFocus={handleStart}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mt-1.5 w-full text-right rounded-xl border border-[#1E334D] bg-[#07111F] px-4 py-3 text-base text-[#F7FAFC] placeholder:text-[#64748B] focus:border-[#00D2B4] focus:outline-none focus:ring-2 focus:ring-[#00D2B4]"
                    placeholder="name@example.co.il"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="field-solutiontype"
                  className="block text-sm font-semibold text-[#F7FAFC]"
                >
                  {STRINGS.leadForm.solutionTypeLabel}
                </label>
                <select
                  id="field-solutiontype"
                  name="solutionType"
                  value={solutionType}
                  onChange={(e) => setSolutionType(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-[#1E334D] bg-[#07111F] px-4 py-3 text-base text-[#F7FAFC] focus:border-[#00D2B4] focus:outline-none focus:ring-2 focus:ring-[#00D2B4]"
                >
                  {STRINGS.leadForm.solutionOptions.map((opt) => (
                    <option key={opt.id} value={opt.id} className="bg-[#07111F]">
                      {opt.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label
                  htmlFor="field-message"
                  className="block text-sm font-semibold text-[#F7FAFC]"
                >
                  {STRINGS.leadForm.messageLabel}
                </label>
                <textarea
                  id="field-message"
                  name="message"
                  rows={3}
                  value={message}
                  onFocus={handleStart}
                  onChange={(e) => setMessage(e.target.value)}
                  className="mt-1.5 w-full rounded-xl border border-[#1E334D] bg-[#07111F] px-4 py-3 text-base text-[#F7FAFC] placeholder:text-[#64748B] focus:border-[#00D2B4] focus:outline-none focus:ring-2 focus:ring-[#00D2B4]"
                  placeholder="ספרו לנו בקצרה על העסק או שאלות שיש לכם..."
                />
              </div>

              <div className="pt-2">
                <div className="flex items-start gap-3">
                  <input
                    ref={privacyRef}
                    type="checkbox"
                    id="field-privacy"
                    name="privacyAgreed"
                    required
                    checked={privacyAgreed}
                    onChange={(e) => {
                      setPrivacyAgreed(e.target.checked);
                      if (errors.privacy) setErrors((prev) => ({ ...prev, privacy: "" }));
                    }}
                    aria-invalid={!!errors.privacy}
                    aria-describedby={errors.privacy ? "error-privacy" : undefined}
                    className="mt-1 h-5 w-5 shrink-0 rounded border-[#1E334D] bg-[#07111F] accent-[#00D2B4] focus:ring-2 focus:ring-[#00D2B4]"
                  />
                  <label htmlFor="field-privacy" className="text-xs leading-relaxed text-[#CBD5E1]">
                    <span>{STRINGS.leadForm.privacyLabel} </span>
                    <button
                      type="button"
                      onClick={onOpenPrivacyModal}
                      className="text-[#00D2B4] underline hover:text-[#00E5C5] focus-visible:rounded"
                    >
                      לקריאת מדיניות הפרטיות
                    </button>
                    <span className="text-red-400 font-bold" aria-hidden="true">
                      {" "}
                      *
                    </span>
                  </label>
                </div>
                {errors.privacy && (
                  <p id="error-privacy" className="mt-1 text-xs font-medium text-red-400">
                    {errors.privacy}
                  </p>
                )}
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full rounded-xl bg-[#00D2B4] py-3.5 px-6 text-center text-base font-bold text-[#04171E] shadow-lg shadow-[#00D2B4]/15 transition-all hover:bg-[#00E5C5] active:scale-[0.99] disabled:opacity-50 focus-visible:rounded-xl"
                >
                  {isSubmitting ? "בודק פרטים..." : STRINGS.leadForm.submitButton}
                </button>
              </div>

              <div className="relative my-6 text-center">
                <div className="absolute inset-0 flex items-center" aria-hidden="true">
                  <div className="w-full border-t border-[#1E334D]" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-[#0D1B2A] px-3 font-semibold text-[#94A3B8]">או</span>
                </div>
              </div>

              <div className="text-center">
                <p className="text-xs text-[#CBD5E1] mb-2 font-medium">
                  {STRINGS.leadForm.whatsappAltTitle}
                </p>
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => triggerAnalytics("whatsapp_click", { source: "lead_form_alternative" })}
                  className="inline-flex w-full items-center justify-center gap-2.5 rounded-xl border border-[#1E334D] bg-[#07111F] py-3 px-6 text-sm font-bold text-[#F7FAFC] transition-all hover:border-[#00D2B4] hover:bg-[#132238] active:scale-[0.99] focus-visible:rounded-xl"
                >
                  <svg
                    aria-hidden="true"
                    className="h-5 w-5 text-[#25D366]"
                    fill="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
                  </svg>
                  {STRINGS.leadForm.whatsappAltButton}
                </a>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

const Footer = ({
  onOpenAccessibilityStatement,
  onOpenPrivacyPolicy,
}: {
  onOpenAccessibilityStatement: () => void;
  onOpenPrivacyPolicy: () => void;
}) => {
  const currentYear = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    const header = document.getElementById("main-header");
    header?.focus();
  };

  return (
    <footer
      id="main-footer"
      className="border-t border-[#1E334D] bg-[#050C17] py-12 text-[#CBD5E1]"
      role="contentinfo"
    >
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-6">
            <div className="flex items-baseline gap-1.5">
              <span className="text-2xl font-black tracking-tight text-[#F7FAFC]">
                {STRINGS.header.logoName}
              </span>
              <span className="text-xs font-semibold tracking-widest text-[#00D2B4]">
                {STRINGS.header.logoSub}
              </span>
            </div>
            <p className="mt-3 max-w-md text-sm text-[#94A3B8] leading-relaxed">
              {STRINGS.footer.tagline}
            </p>
          </div>

          <div className="md:col-span-3">
            <h3 className="text-sm font-bold text-[#F7FAFC]">פרטי התקשרות</h3>
            <ul className="mt-3 space-y-2 text-xs text-[#CBD5E1]">
              <li>
                <span className="text-[#94A3B8]">טלפון: </span>
                <a
                  href={`tel:${BUSINESS_DATA.phoneInternational.replace(/\s+/g, "")}`}
                  className="font-medium text-[#F7FAFC] hover:text-[#00D2B4] transition-colors"
                  dir="ltr"
                >
                  {BUSINESS_DATA.phoneInternational}
                </a>
              </li>
              <li>
                <span className="text-[#94A3B8]">וואטסאפ: </span>
                <a
                  href={getWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-medium text-[#F7FAFC] hover:text-[#00D2B4] transition-colors"
                  dir="ltr"
                >
                  {BUSINESS_DATA.phoneInternational}
                </a>
              </li>
              <li>
                <span className="text-[#94A3B8]">אימייל: </span>
                <a
                  href={`mailto:${BUSINESS_DATA.email}`}
                  className="font-medium text-[#F7FAFC] hover:text-[#00D2B4] transition-colors"
                  dir="ltr"
                >
                  {BUSINESS_DATA.email}
                </a>
              </li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <h3 className="text-sm font-bold text-[#F7FAFC]">מידע ונגישות</h3>
            <ul className="mt-3 space-y-2 text-xs">
              <li>
                <button
                  type="button"
                  onClick={onOpenAccessibilityStatement}
                  className="text-[#CBD5E1] underline hover:text-[#00D2B4] focus-visible:rounded"
                >
                  {STRINGS.footer.accessibilityStatementLink}
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={onOpenPrivacyPolicy}
                  className="text-[#CBD5E1] underline hover:text-[#00D2B4] focus-visible:rounded"
                >
                  {STRINGS.footer.privacyPolicyLink}
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-[#1A2C42] pt-6 sm:flex-row text-xs text-[#94A3B8]">
          <p>
            © {currentYear} {BUSINESS_DATA.businessName}. כל הזכויות שמורות.
          </p>
          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-1.5 font-semibold text-[#CBD5E1] transition-colors hover:text-[#00D2B4] focus-visible:rounded"
          >
            <span>{STRINGS.footer.backToTop}</span>
            <span aria-hidden="true">↑</span>
          </button>
        </div>
      </div>
    </footer>
  );
};

const MobileStickyBar = () => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const contactEl = document.getElementById("contact");
      if (contactEl) {
        const rect = contactEl.getBoundingClientRect();
        if (rect.top < window.innerHeight && rect.bottom > 0) {
          setIsVisible(false);
          return;
        }
      }
      setIsVisible(true);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    triggerAnalytics("cta_hero_click", { source: "mobile_sticky_cta" });
    const el =
      document.getElementById("selector") ||
      document.getElementById("contact") ||
      document.getElementById("lead-form");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
      el.focus();
    }
  };

  if (!isVisible) return null;

  return (
    <aside
      className="fixed inset-x-0 bottom-0 z-30 border-t border-[#1E334D] bg-[#07111F]/95 p-3 backdrop-blur-md transition-all sm:hidden"
      aria-label="פעולות מהירות למובייל"
    >
      <div className="flex items-center gap-2">
        <button
          type="button"
          onClick={handleClick}
          className="flex-1 rounded-xl bg-[#00D2B4] py-2.5 px-3 text-center text-sm font-bold text-[#04171E] shadow-sm active:scale-[0.98] focus-visible:rounded-xl"
        >
          בדיקת התאמה ללא עלות
        </button>
        <a
          href={getWhatsAppUrl()}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => triggerAnalytics("whatsapp_click", { source: "mobile_sticky_whatsapp" })}
          className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-[#1E334D] bg-[#0D1B2A] text-[#25D366] transition-colors hover:border-[#00D2B4] active:scale-[0.98] focus-visible:rounded-xl"
          aria-label="פתיחת שיחה ב־WhatsApp"
          title="וואטסאפ"
        >
          <svg aria-hidden="true" className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z" />
          </svg>
        </a>
      </div>
    </aside>
  );
};

interface AccSettings {
  fontSize: "normal" | "lg" | "xl";
  highContrast: boolean;
  highlightLinks: boolean;
  stopAnimations: boolean;
  largeCursor: boolean;
  readableFont: boolean;
}

const DEFAULT_ACC_SETTINGS: AccSettings = {
  fontSize: "normal",
  highContrast: false,
  highlightLinks: false,
  stopAnimations: false,
  largeCursor: false,
  readableFont: false,
};

const AccessibilityPanel = ({
  isOpen,
  onClose,
  triggerRef,
}: {
  isOpen: boolean;
  onClose: () => void;
  triggerRef?: React.RefObject<HTMLElement | null>;
}) => {
  const [settings, setSettings] = useState<AccSettings>(() => {
    try {
      if (typeof window !== "undefined" && "localStorage" in window) {
        const stored = window.localStorage.getItem("webly_acc_settings");
        if (stored) return JSON.parse(stored);
      }
    } catch {
      // noop
    }
    return DEFAULT_ACC_SETTINGS;
  });

  const panelRef = useRef<HTMLDivElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove("acc-text-lg", "acc-text-xl");
    if (settings.fontSize === "lg") root.classList.add("acc-text-lg");
    if (settings.fontSize === "xl") root.classList.add("acc-text-xl");

    if (settings.highContrast) root.classList.add("acc-high-contrast");
    else root.classList.remove("acc-high-contrast");

    if (settings.highlightLinks) root.classList.add("acc-highlight-links");
    else root.classList.remove("acc-highlight-links");

    if (settings.stopAnimations) root.classList.add("acc-stop-anim");
    else root.classList.remove("acc-stop-anim");

    if (settings.largeCursor) root.classList.add("acc-large-cursor");
    else root.classList.remove("acc-large-cursor");

    if (settings.readableFont) root.classList.add("acc-readable-font");
    else root.classList.remove("acc-readable-font");

    try {
      if (typeof window !== "undefined" && "localStorage" in window) {
        window.localStorage.setItem("webly_acc_settings", JSON.stringify(settings));
      }
    } catch {
      // noop
    }
  }, [settings]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
        triggerRef?.current?.focus();
      }
    };

    if (isOpen) {
      triggerAnalytics("accessibility_panel_open");
      document.addEventListener("keydown", handleKeyDown);
      setTimeout(() => {
        closeBtnRef.current?.focus();
      }, 50);
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [isOpen, onClose, triggerRef]);

  const updateSetting = <K extends keyof AccSettings>(key: K, val: AccSettings[K]) => {
    setSettings((prev) => ({ ...prev, [key]: val }));
  };

  const resetSettings = () => {
    setSettings(DEFAULT_ACC_SETTINGS);
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 overflow-hidden bg-black/60 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="acc-panel-title"
    >
      <div className="fixed inset-0 cursor-default" onClick={onClose} aria-hidden="true" />
      <div
        ref={panelRef}
        className="fixed inset-y-0 left-0 max-w-full flex w-full sm:w-96 shadow-2xl transition-transform"
      >
        <div className="relative flex w-full flex-col overflow-y-auto border-r border-[#1E334D] bg-[#07111F] p-6 text-right">
          <div className="flex items-center justify-between border-b border-[#1A2C42] pb-4">
            <div className="flex items-center gap-2.5">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#132238] text-[#00D2B4]">
                <svg
                  aria-hidden="true"
                  className="h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="4" r="2" />
                  <path d="m4 9 8 2 8-2" />
                  <path d="M6.5 13 4 21" />
                  <path d="M17.5 13 20 21" />
                  <path d="M12 11v10" />
                </svg>
              </span>
              <div>
                <h2 id="acc-panel-title" className="text-base font-bold text-[#F7FAFC]">
                  התאמות נגישות
                </h2>
                <p className="text-[11px] text-[#94A3B8]">כלי נוחות משלים לקוראים ומבקרים</p>
              </div>
            </div>
            <button
              ref={closeBtnRef}
              type="button"
              onClick={onClose}
              className="rounded-lg border border-[#1E334D] bg-[#0D1B2A] p-2 text-[#CBD5E1] transition-colors hover:text-[#00D2B4] focus-visible:rounded-lg"
              aria-label="סגירת סרגל נגישות"
            >
              <svg
                aria-hidden="true"
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M18 6 6 18M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div className="mt-6 space-y-5">
            <div className="rounded-xl border border-[#1E334D] bg-[#0D1B2A] p-4">
              <span className="block text-xs font-bold text-[#F7FAFC]">גודל טקסט</span>
              <div
                className="mt-2.5 grid grid-cols-3 gap-2"
                role="radiogroup"
                aria-label="בחירת גודל טקסט"
              >
                {[
                  { id: "normal", label: "רגיל (100%)" },
                  { id: "lg", label: "בינוני (+15%)" },
                  { id: "xl", label: "גדול (+30%)" },
                ].map((item) => {
                  const isChecked = settings.fontSize === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      role="radio"
                      aria-checked={isChecked}
                      onClick={() => updateSetting("fontSize", item.id as any)}
                      className={`rounded-lg border py-2 px-2 text-center text-xs font-semibold transition-colors ${
                        isChecked
                          ? "border-[#00D2B4] bg-[#132238] text-[#00D2B4]"
                          : "border-[#1E334D] bg-[#07111F] text-[#CBD5E1] hover:border-[#2C4A6F]"
                      }`}
                    >
                      {item.label}
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="flex items-center justify-between rounded-xl border border-[#1E334D] bg-[#0D1B2A] p-4">
              <div>
                <span className="block text-xs font-bold text-[#F7FAFC]">ניגודיות גבוהה</span>
                <span className="text-[11px] text-[#94A3B8]">
                  העמקת ניגודיות לטקסט ולרקעים
                </span>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={settings.highContrast}
                onClick={() => updateSetting("highContrast", !settings.highContrast)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00D2B4] ${
                  settings.highContrast ? "bg-[#00D2B4]" : "bg-[#1E334D]"
                }`}
              >
                <span className="sr-only">הפעלת ניגודיות גבוהה</span>
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    settings.highContrast ? "translate-x-0" : "-translate-x-5"
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between rounded-xl border border-[#1E334D] bg-[#0D1B2A] p-4">
              <div>
                <span className="block text-xs font-bold text-[#F7FAFC]">הדגשת קישורים</span>
                <span className="text-[11px] text-[#94A3B8]">
                  קו תחתון מודגש לכל הקישורים
                </span>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={settings.highlightLinks}
                onClick={() => updateSetting("highlightLinks", !settings.highlightLinks)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00D2B4] ${
                  settings.highlightLinks ? "bg-[#00D2B4]" : "bg-[#1E334D]"
                }`}
              >
                <span className="sr-only">הפעלת הדגשת קישורים</span>
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    settings.highlightLinks ? "translate-x-0" : "-translate-x-5"
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between rounded-xl border border-[#1E334D] bg-[#0D1B2A] p-4">
              <div>
                <span className="block text-xs font-bold text-[#F7FAFC]">עצירת אנימציות</span>
                <span className="text-[11px] text-[#94A3B8]">
                  ביטול תנועות ומעברים בעמוד
                </span>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={settings.stopAnimations}
                onClick={() => updateSetting("stopAnimations", !settings.stopAnimations)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00D2B4] ${
                  settings.stopAnimations ? "bg-[#00D2B4]" : "bg-[#1E334D]"
                }`}
              >
                <span className="sr-only">הפעלת עצירת אנימציות</span>
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    settings.stopAnimations ? "translate-x-0" : "-translate-x-5"
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between rounded-xl border border-[#1E334D] bg-[#0D1B2A] p-4">
              <div>
                <span className="block text-xs font-bold text-[#F7FAFC]">גופן קריא</span>
                <span className="text-[11px] text-[#94A3B8]">
                  מעבר לפונט Assistant קריא ונקי
                </span>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={settings.readableFont}
                onClick={() => updateSetting("readableFont", !settings.readableFont)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00D2B4] ${
                  settings.readableFont ? "bg-[#00D2B4]" : "bg-[#1E334D]"
                }`}
              >
                <span className="sr-only">הפעלת גופן קריא</span>
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    settings.readableFont ? "translate-x-0" : "-translate-x-5"
                  }`}
                />
              </button>
            </div>

            <div className="flex items-center justify-between rounded-xl border border-[#1E334D] bg-[#0D1B2A] p-4">
              <div>
                <span className="block text-xs font-bold text-[#F7FAFC]">סמן מוגדל</span>
                <span className="text-[11px] text-[#94A3B8]">
                  סמן עכבר בצבע טורקיז וגדול
                </span>
              </div>
              <button
                type="button"
                role="switch"
                aria-checked={settings.largeCursor}
                onClick={() => updateSetting("largeCursor", !settings.largeCursor)}
                className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#00D2B4] ${
                  settings.largeCursor ? "bg-[#00D2B4]" : "bg-[#1E334D]"
                }`}
              >
                <span className="sr-only">הפעלת סמן מוגדל</span>
                <span
                  className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
                    settings.largeCursor ? "translate-x-0" : "-translate-x-5"
                  }`}
                />
              </button>
            </div>
          </div>

          <div className="mt-8 border-t border-[#1A2C42] pt-4">
            <button
              type="button"
              onClick={resetSettings}
              className="w-full rounded-xl border border-[#1E334D] bg-[#0D1B2A] py-2.5 text-xs font-bold text-[#CBD5E1] transition-colors hover:border-red-500/60 hover:text-red-300"
            >
              איפוס הגדרות נגישות
            </button>
          </div>

          <div className="mt-6 rounded-lg bg-[#0D1B2A]/50 p-3 text-[11px] text-[#94A3B8] leading-relaxed">
            <strong>לתשומת לבכם:</strong> סרגל זה נועד לנוחות נוספת. האתר נבנה מראש על פי עקרונות נגישות בקוד, במבנה ובמקלדת.
          </div>
        </div>
      </div>
    </div>
  );
};

const AccessibilityStatementModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
      setTimeout(() => closeBtnRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="acc-statement-title"
    >
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />
      <div
        ref={modalRef}
        className="relative z-10 max-h-[90vh] w-full max-w-3xl overflow-y-auto rounded-2xl border border-[#1E334D] bg-[#07111F] p-6 text-right text-[#CBD5E1] shadow-2xl sm:p-8"
      >
        <div className="flex items-center justify-between border-b border-[#1A2C42] pb-4">
          <h2 id="acc-statement-title" className="text-2xl font-bold text-[#F7FAFC]">
            הצהרת נגישות — Webly Studio
          </h2>
          <button
            ref={closeBtnRef}
            type="button"
            onClick={onClose}
            className="rounded-lg border border-[#1E334D] bg-[#0D1B2A] p-2 text-[#CBD5E1] transition-colors hover:text-[#00D2B4] focus-visible:rounded-lg"
            aria-label="סגירת הצהרת נגישות"
          >
            <svg
              aria-hidden="true"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="mt-6 space-y-5 text-sm leading-relaxed">
          <section>
            <h3 className="text-base font-bold text-[#F7FAFC]">1. מבוא ומחויבות לנגישות</h3>
            <p className="mt-1">
              ב־{BUSINESS_DATA.businessName} אנו רואים חשיבות עליונה במתן שירות שוויוני, מכבד ונגיש לכלל המשתמשים, לרבות אנשים עם מוגבלות. האתר תוכנן ונבנה מתוך שאיפה לספק חוויית גלישה מיטבית ופשוטה לכל מבקר.
            </p>
          </section>

          <section>
            <h3 className="text-base font-bold text-[#F7FAFC]">2. התאמה לתקנים</h3>
            <p className="mt-1">
              אתר זה תוכנן במטרה להתאים להוראות תקן ישראלי ת"י 5568 (חלק 1) ברמת AA, המבוסס על הנחיות הנגישות הבינלאומיות WCAG 2.0 בכפוף להתאמות הנדרשות בדין הישראלי. בנוסף שולבו עקרונות מתקדמים מ־WCAG 2.1/2.2.
            </p>
          </section>

          <section>
            <h3 className="text-base font-bold text-[#F7FAFC]">3. התאמות נגישות שיושמו באתר</h3>
            <ul className="mt-2 list-disc list-inside space-y-1.5">
              <li>
                <strong className="text-[#F7FAFC]">ניווט מקלדת מלא:</strong> כל הפקדים, הכפתורים, הקישורים והטפסים ניתנים להפעלה מלאה באמצעות מקלדת (Tab, Enter, Space, Escape, חיצים).
              </li>
              <li>
                <strong className="text-[#F7FAFC]">פוקוס גלוי:</strong> מסגרת פוקוס ברורה ובולטת בצבע טורקיז עם ניגודיות גבוהה בכל רכיב שמקבל מיקוד.
              </li>
              <li>
                <strong className="text-[#F7FAFC]">מבנה כותרות סמנטי:</strong> היררכיה לוגית תקינה של H1, H2 ו־H3 לניווט קל באמצעות טכנולוגיות מסייעות.
              </li>
              <li>
                <strong className="text-[#F7FAFC]">טקסטים חלופיים:</strong> הגדרת טקסט חלופי (Alt) למדיה משמעותית והסתרת אייקונים דקורטיביים מקוראי מסך.
              </li>
              <li>
                <strong className="text-[#F7FAFC]">טפסים נגישים:</strong> שדות עם תגיות Label מקושרות, ציון שדות חובה, והודעות שגיאה מקושרות באמצעות aria-describedby.
              </li>
              <li>
                <strong className="text-[#F7FAFC]">ניגודיות צבעים:</strong> עמידה ביחסי ניגודיות של לפחות 4.5:1 לטקסט רגיל ו־3:1 לטקסט גדול ואלמנטים גרפיים.
              </li>
              <li>
                <strong className="text-[#F7FAFC]">הגדלת תצוגה:</strong> תמיכה בהגדלת גודל הגופן עד 200% ללא אובדן מידע או שבירת תצוגה.
              </li>
              <li>
                <strong className="text-[#F7FAFC]">תמיכה בהפחתת תנועה:</strong> האתר מכבד הגדרות מערכת של prefers-reduced-motion, וכולל כפתור עצירה מפורש לאלמנט המונפש.
              </li>
            </ul>
          </section>

          <section>
            <h3 className="text-base font-bold text-[#F7FAFC]">4. טכנולוגיות האתר</h3>
            <p className="mt-1">האתר מבוסס על HTML5 סמנטי, CSS3 (Tailwind), React ו־TypeScript.</p>
          </section>

          <section>
            <h3 className="text-base font-bold text-[#F7FAFC]">5. שירותי צד שלישי ומגבלות ידועות</h3>
            <p className="mt-1">
              האתר אינו מטמיע תוכן צד שלישי שאינו נגיש. במידה ויוטמעו בעתיד רכיבים חיצוניים שאינם בשליטת Webly (כגון מפות Google או ממשקי תשלום חיצוניים), יבוצעו מירב המאמצים להבטיח את נגישותם המקסימלית.
            </p>
          </section>

          <section>
            <h3 className="text-base font-bold text-[#F7FAFC]">6. הסדרי נגישות פיזיים</h3>
            <p className="mt-1">
              Webly Studio פועלת כסטודיו דיגיטלי מקוון בלבד ואינה מקיימת קבלת קהל פיזית. כלל השירותים, הפגישות וההתקשרויות מתבצעים באמצעים מקוונים, טלפוניים ודיגיטליים נגישים.
            </p>
          </section>

          <section className="rounded-xl border border-[#1E334D] bg-[#0D1B2A] p-4">
            <h3 className="text-base font-bold text-[#00D2B4]">
              7. פרטי רכז/ת הנגישות ודיווח על תקלות
            </h3>
            <p className="mt-1">
              נתקלתם בבעיית נגישות או שיש לכם הצעה לשיפור? נשמח לקבל את פנייתכם ולטפל בה בהקדם:
            </p>
            <ul className="mt-2 space-y-1 text-xs">
              <li>
                <strong>איש/אשת קשר לנגישות:</strong> {BUSINESS_DATA.accessibilityOfficerName}
              </li>
              <li>
                <strong>טלפון:</strong>{" "}
                <a
                  href={`tel:${BUSINESS_DATA.phoneInternational.replace(/\s+/g, "")}`}
                  className="text-[#00D2B4] hover:underline"
                  dir="ltr"
                >
                  {BUSINESS_DATA.phoneInternational}
                </a>
              </li>
              <li>
                <strong>אימייל:</strong>{" "}
                <a
                  href={`mailto:${BUSINESS_DATA.email}`}
                  className="text-[#00D2B4] hover:underline"
                  dir="ltr"
                >
                  {BUSINESS_DATA.email}
                </a>
              </li>
              <li>
                <strong>תאריך עדכון אחרון:</strong> ספטמבר 2026
              </li>
            </ul>
          </section>
        </div>

        <div className="mt-6 border-t border-[#1A2C42] pt-4 text-left">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl bg-[#00D2B4] px-5 py-2.5 text-xs font-bold text-[#04171E] transition-all hover:bg-[#00E5C5]"
          >
            סגירה
          </button>
        </div>
      </div>
    </div>
  );
};

const PrivacyPolicyModal = ({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const closeBtnRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) onClose();
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
      setTimeout(() => closeBtnRef.current?.focus(), 50);
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs"
      role="dialog"
      aria-modal="true"
      aria-labelledby="privacy-modal-title"
    >
      <div className="fixed inset-0" onClick={onClose} aria-hidden="true" />
      <div
        ref={modalRef}
        className="relative z-10 max-h-[90vh] w-full max-w-2xl overflow-y-auto rounded-2xl border border-[#1E334D] bg-[#07111F] p-6 text-right text-[#CBD5E1] shadow-2xl sm:p-8"
      >
        <div className="flex items-center justify-between border-b border-[#1A2C42] pb-4">
          <h2 id="privacy-modal-title" className="text-xl font-bold text-[#F7FAFC]">
            מדיניות פרטיות — Webly Studio
          </h2>
          <button
            ref={closeBtnRef}
            type="button"
            onClick={onClose}
            className="rounded-lg border border-[#1E334D] bg-[#0D1B2A] p-2 text-[#CBD5E1] transition-colors hover:text-[#00D2B4] focus-visible:rounded-lg"
            aria-label="סגירת מדיניות פרטיות"
          >
            <svg
              aria-hidden="true"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M18 6 6 18M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="mt-5 space-y-4 text-xs sm:text-sm leading-relaxed">
          <p>אנו ב־{BUSINESS_DATA.businessName} מחויבים להגנה על פרטיות המשתמשים באתרנו.</p>
          <h3 className="text-sm font-bold text-[#F7FAFC]">1. איסוף מידע</h3>
          <p>
            המידע הנאסף באתר מתקבל אך ורק כאשר אתם בוחרים במפורש להזין אותו בטופס יצירת הקשר (שם, טלפון, אימייל והודעה) לצורך קבלת בדיקת התאמה והצעת מחיר.
          </p>
          <h3 className="text-sm font-bold text-[#F7FAFC]">2. שימוש במידע</h3>
          <p>
            הפרטים משמשים אך ורק לצורך יצירת קשר חוזר עימכם, מתן מענה לשאלותיכם ואפיון הצרכים של העסק שלכם. איננו מעבירים, מוכרים או משתפים את פרטיכם עם גורמים מסחריים חיצוניים.
          </p>
          <h3 className="text-sm font-bold text-[#F7FAFC]">3. עוגיות ומעקב</h3>
          <p>
            באתר לא מופעלות עוגיות שיווקיות פולשניות ללא הסכמה. אירועי ניווט נשמרים באופן אנונימי בלבד ללא פרטים מזהים אישיים (PII).
          </p>
          <h3 className="text-sm font-bold text-[#F7FAFC]">4. יצירת קשר בנושאי פרטיות</h3>
          <p>
            בכל שאלה או בקשה לעיון, תיקון או מחיקה של פרטיכם ממאגר הפניות, ניתן לפנות אלינו באימייל:{" "}
            <a
              href={`mailto:${BUSINESS_DATA.email}`}
              className="font-mono text-[#00D2B4] hover:underline"
              dir="ltr"
            >
              {BUSINESS_DATA.email}
            </a>
          </p>
        </div>

        <div className="mt-6 border-t border-[#1A2C42] pt-4 text-left">
          <button
            type="button"
            onClick={onClose}
            className="rounded-xl bg-[#00D2B4] px-5 py-2 text-xs font-bold text-[#04171E] transition-all hover:bg-[#00E5C5]"
          >
            הבנתי, תודה
          </button>
        </div>
      </div>
    </div>
  );
};

export default function App() {
  const [isAccPanelOpen, setIsAccPanelOpen] = useState(false);
  const [isAccStatementOpen, setIsAccStatementOpen] = useState(false);
  const [isPrivacyModalOpen, setIsPrivacyModalOpen] = useState(false);

  return (
    <div className="webly-site min-h-screen flex flex-col font-sans">
      <a href="#main-content" className="skip-to-content">
        דלגו לתוכן הראשי
      </a>
      <Header onOpenAccessibility={() => setIsAccPanelOpen(true)} />
      <main id="main-content" className="flex-1 focus:outline-none" tabIndex={-1}>
        <Hero />
        <Story />
        <LeadForm
          initialSolutionType="not_sure"
          onOpenPrivacyModal={() => setIsPrivacyModalOpen(true)}
        />
      </main>
      <Footer
        onOpenAccessibilityStatement={() => setIsAccStatementOpen(true)}
        onOpenPrivacyPolicy={() => setIsPrivacyModalOpen(true)}
      />
      <MobileStickyBar />
      <AccessibilityPanel
        isOpen={isAccPanelOpen}
        onClose={() => setIsAccPanelOpen(false)}
      />
      <AccessibilityStatementModal
        isOpen={isAccStatementOpen}
        onClose={() => setIsAccStatementOpen(false)}
      />
      <PrivacyPolicyModal
        isOpen={isPrivacyModalOpen}
        onClose={() => setIsPrivacyModalOpen(false)}
      />
    </div>
  );
}
