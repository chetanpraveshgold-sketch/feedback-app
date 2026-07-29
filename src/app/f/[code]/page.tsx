"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";

// Local translations matrix for English, Hindi, and Marathi
const translations = {
  en: {
    subtitle: "Customer Feedback Form",
    lang_label: "Language",
    rating_title: "How likely are you to recommend Pravesh Gold to your family or friends?",
    nps_min_label: "Not Likely",
    nps_max_label: "Extremely Likely",
    what_went_wrong: "What did you not like?",
    what_to_improve: "What can we do better?",
    what_liked: "What did you like most?",
    other_label: "Other (Please specify)",
    other_placeholder: "Enter details...",
    comment_label: "Tell us more about your experience (Optional)",
    comment_placeholder: "Write your feedback here...",
    contact_ask: "Would you like us to contact you to help improve your experience?",
    comment_ask_title: "Would you like to tell us more about your experience?",
    yes: "Yes",
    no: "No",
    mobile_label: "Mobile Number",
    mobile_placeholder: "Enter 10-digit mobile number",
    mobile_error: "Enter a valid 10-digit mobile number.",
    submit: "Submit Feedback",
    submitting: "Submitting...",
    success_title: "Thank You!",
    success_msg_low: "Thank you for your feedback. We are sorry for the bad experience. We will work hard to make it better.",
    success_msg_mid: "Thank you for your feedback. We will use your suggestions to make your next visit better.",
    success_msg_high: "Thank you for the great rating! We are happy you enjoyed your visit. See you again soon!",
    ref_id: "Reference ID",
    required: "This field is required.",
    page_unavailable_title: "Form Link Expired",
    page_unavailable_msg: "This feedback link code is no longer active. Please request a new form link from the showroom coordinator.",
    net_error_title: "Submission Error",
    net_error_msg: "A network issue occurred while connecting to Google Sheets. We kept your input safe—please click below to try again.",
    retry: "Try Again",
    return_review: "Review Responses",
    labels: {
      0: "Poor",
      1: "Poor",
      2: "Poor",
      3: "Poor",
      4: "Poor",
      5: "Poor",
      6: "Poor",
      7: "Average",
      8: "Average",
      9: "Good",
      10: "Good"
    },
    reasons: {
      staff_guidance: "Staff service or behavior",
      waiting_time: "Waiting time",
      pricing_clarity: "Pricing and making charges",
      availability: "Jewellery collection and sizes",
      billing_exchange: "Billing or old-gold exchange",
      designs: "More jewellery designs",
      fast_service: "Faster service",
      guidance: "Better staff service",
      clear_pricing: "Clear pricing",
      showroom_comfort: "Store comfort and seating",
      helpful_staff: "Helpful and polite staff",
      variety_designs: "Beautiful jewellery designs",
      transparent_pricing: "Clear and honest pricing",
      fast_billing: "Fast service and billing",
      showroom_exp: "Comfortable store environment",
      overall_trust: "Trust and good service",
      other: "Something else"
    }
  },
  hi: {
    subtitle: "ग्राहक फीडबैक फॉर्म",
    lang_label: "भाषा",
    rating_title: "आप अपने परिवार या दोस्तों को प्रवेश गोल्ड की सलाह (Recommend) देने के लिए कितने सहमत हैं?",
    nps_min_label: "संभावना नहीं है",
    nps_max_label: "बहुत अधिक संभावना है",
    what_went_wrong: "आपको क्या पसंद नहीं आया?",
    what_to_improve: "हम क्या बेहतर कर सकते हैं?",
    what_liked: "आपको सबसे अच्छा क्या लगा?",
    other_label: "कुछ और (बताएं)",
    other_placeholder: "यहाँ लिखें...",
    comment_label: "अगर आप कुछ और बताना चाहें (ऐच्छिक)",
    comment_placeholder: "अपनी बात यहाँ लिखें...",
    contact_ask: "क्या आप चाहते हैं कि बेहतर अनुभव के लिए हम आपसे संपर्क करें?",
    comment_ask_title: "क्या आप अपने अनुभव के बारे में हमें कुछ और बताना चाहेंगे?",
    yes: "हाँ",
    no: "नहीं",
    mobile_label: "मोबाइल नंबर",
    mobile_placeholder: "10 अंकों का मोबाइल नंबर डालें",
    mobile_error: "कृपया सही 10 अंकों का मोबाइल नंबर डालें।",
    submit: "फीडबैक भेजें",
    submitting: "सबमिट हो रहा है...",
    success_title: "थैंक यू!",
    success_msg_low: "फीडबैक के लिए धन्यवाद। खराब अनुभव के लिए हम माफ़ी चाहते हैं। हम इसे बेहतर करने की पूरी कोशिश करेंगे।",
    success_msg_mid: "फीडबैक के लिए धन्यवाद। अगली बार आपका अनुभव और बेहतर बनाने के लिए हम आपकी सलाह पर ध्यान देंगे।",
    success_msg_high: "शानदार रेटिंग के लिए थैंक यू! आपको हमारे यहाँ आकर अच्छा लगा, यह जानकर बहुत ख़ुशी हुई। जल्द ही फिर मिलेंगे!",
    ref_id: "रेफरेंस आईडी",
    required: "यह भरना जरूरी है।",
    page_unavailable_title: "लिंक उपलब्ध नहीं है",
    page_unavailable_msg: "यह लिंक अब एक्टिव नहीं है। कृपया नया लिंक लें।",
    net_error_title: "सबमिट नहीं हो पाया",
    net_error_msg: "कनेक्शन में दिक्कत आई। आपकी जानकारी सुरक्षित है—कृपया दोबारा कोशिश करें।",
    retry: "दोबारा कोशिश करें",
    return_review: "फीडबैक देखें",
    labels: {
      0: "खराब (Poor)",
      1: "खराब (Poor)",
      2: "खराब (Poor)",
      3: "खराब (Poor)",
      4: "खराब (Poor)",
      5: "खराब (Poor)",
      6: "खराब (Poor)",
      7: "ठीक-ठाक (Average)",
      8: "ठीक-ठाक (Average)",
      9: "बहुत बढ़िया (Good)",
      10: "बहुत बढ़िया (Good)"
    },
    reasons: {
      staff_guidance: "स्टाफ की सर्विस या व्यवहार",
      waiting_time: "इंतजार का समय (वेटिंग)",
      pricing_clarity: "कीमत या मेकिंग चार्ज",
      availability: "ज्वेलरी कलेक्शन या साइज",
      billing_exchange: "बिलिंग या पुराना गोल्ड एक्सचेंज",
      designs: "और नए ज्वेलरी डिजाइन",
      fast_service: "फास्ट सर्विस",
      guidance: "स्टाफ का अच्छा व्यवहार",
      clear_pricing: "साफ-सुथरी कीमतें",
      showroom_comfort: "स्टोर में बैठने की जगह",
      helpful_staff: "मददगार और नम्र स्टाफ",
      variety_designs: "सुंदर और नए डिजाइन",
      transparent_pricing: "साफ और ईमानदार रेट",
      fast_billing: "तेज सर्विस और बिलिंग",
      showroom_exp: "स्टोर का बढ़िया माहौल",
      overall_trust: "भरोसा और अच्छी सर्विस",
      other: "कुछ और"
    }
  },
  mr: {
    subtitle: "कस्टमर फीडबॅक फॉर्म",
    lang_label: "भाषा",
    rating_title: "तुम्ही तुमच्या कुटुंबियांना किंवा मित्रांना प्रवेश गोल्डची शिफारस करण्याची शक्यता किती आहे?",
    nps_min_label: "शक्यता नाही",
    nps_max_label: "खूप शक्यता आहे",
    what_went_wrong: "तुम्हाला काय आवडलं नाही?",
    what_to_improve: "आम्ही काय सुधारू शकतो?",
    what_liked: "तुम्हाला सर्वात जास्त काय आवडलं?",
    other_label: "इतर काही (सांगा)",
    other_placeholder: "इथे लिहा...",
    comment_label: "अजून काही सांगायचे असल्यास (ऐच्छिक)",
    comment_placeholder: "तुमची प्रतिक्रिया इथे लिहा...",
    contact_ask: "उत्तम अनुभवासाठी आम्ही तुमच्याशी संपर्क साधावा असे तुम्हाला वाटते का?",
    comment_ask_title: "तुम्हाला तुमच्या अनुभवाबद्दल अजून काही सांगायला आवडेल का?",
    yes: "हो",
    no: "नाही",
    mobile_label: "मोबाईल नंबर",
    mobile_placeholder: "10-अंकी मोबाईल नंबर टाका",
    mobile_error: "कृपया योग्य 10-अंकी मोबाईल नंबर टाका.",
    submit: "फीडबॅक पाठवा",
    submitting: "सबमिट होत आहे...",
    success_title: "थँक्यू!",
    success_msg_low: "फीडबॅकबद्दल मनापासून धन्यवाद. वाईट अनुभवाबद्दल आम्ही माफी मागतो. आम्ही यात नक्की सुधारणा करू.",
    success_msg_mid: "फीडबॅकबद्दल धन्यवाद. पुढच्या वेळी तुमचा अनुभव अजून चांगला करण्यासाठी आम्ही नक्की प्रयत्न करू.",
    success_msg_high: "छान रेटिंग दिल्याबद्दल खूप खूप थँक्यू! तुम्हाला भेट देऊन आनंद झाला. लवकरच पुन्हा भेटूया!",
    ref_id: "रेफरन्स आयडी",
    required: "ही माहिती भरणे गरजेचे आहे.",
    page_unavailable_title: "लिंक उपलब्ध नाही",
    page_unavailable_msg: "ही लिंक आता ॲक्टिव्ह नाही. कृपया नवीन लिंक घ्या.",
    net_error_title: "सबमिट झाले नाही",
    net_error_msg: "कनेक्शनमध्ये अडचण आली. आपली माहिती सुरक्षित आहे—कृपया पुन्हा प्रयत्न करा.",
    retry: "पुन्हा प्रयत्न करा",
    return_review: "फीडबॅक तपासा",
    labels: {
      0: "वाईट (Poor)",
      1: "वाईट (Poor)",
      2: "वाईट (Poor)",
      3: "वाईट (Poor)",
      4: "वाईट (Poor)",
      5: "वाईट (Poor)",
      6: "वाईट (Poor)",
      7: "मध्यम (Average)",
      8: "मध्यम (Average)",
      9: "उत्कृष्ट (Good)",
      10: "उत्कृष्ट (Good)"
    },
    reasons: {
      staff_guidance: "स्टाफची सर्व्हिस किंवा वागणूक",
      waiting_time: "वेळ (वेटिंग)",
      pricing_clarity: "किंमत किंवा मेकिंग चार्जेस",
      availability: "दागिन्यांचे कलेक्शन किंवा साईझ",
      billing_exchange: "बिलिंग किंवा जुने सोने एक्सचेंज",
      designs: "अजून नवीन दागिन्यांचे डिझाईन्स",
      fast_service: "फास्ट सर्व्हिस",
      guidance: "स्टाफची चांगली सर्व्हिस",
      clear_pricing: "स्पष्ट किंमत",
      showroom_comfort: "स्टोअरमध्ये बसण्याची सोय",
      helpful_staff: "मदत करणारे नम्र स्टाफ",
      variety_designs: "सुंदर आणि नवीन डिझाईन्स",
      transparent_pricing: "पारदर्शक आणि प्रामाणिक रेट",
      fast_billing: "जलद सर्व्हिस आणि बिलिंग",
      showroom_exp: "स्टोअरचे छान वातावरण",
      overall_trust: "विश्वास आणि उत्तम सर्व्हिस",
      other: "इतर काही"
    }
  }
};
type TranslationType = typeof translations.en;

const playCelebrationChime = () => {
  if (typeof window === "undefined") return;
  try {
    const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
    if (!AudioCtx) return;
    const ctx = new AudioCtx();
    
    const playNote = (freq: number, startTime: number, duration: number, volume: number) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      
      // Warm, sweet chime tone (triangle wave)
      osc.type = "triangle";
      osc.frequency.setValueAtTime(freq, startTime);
      
      gain.gain.setValueAtTime(0, startTime);
      gain.gain.linearRampToValueAtTime(volume, startTime + 0.015);
      gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      
      osc.start(startTime);
      osc.stop(startTime + duration + 0.05);
    };

    const now = ctx.currentTime;
    // Premium ascending major-third double chime:
    // First ring (C6 + E6) for crystal body
    playNote(1046.50, now, 0.45, 0.09);
    playNote(1318.51, now, 0.45, 0.05);
    
    // Second ring (G6 + C7) for bright resonance 0.08 seconds later
    playNote(1567.98, now + 0.08, 0.55, 0.09);
    playNote(2093.00, now + 0.08, 0.55, 0.05);
  } catch {
    // Ignore audio context errors gracefully
  }
};

const FrownFace = (
  <svg viewBox="0 0 24 24" className="w-4 h-4 sm:w-5.5 sm:h-5.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <circle cx="8.5" cy="9.5" r="1.4" fill="currentColor" stroke="none" />
    <circle cx="15.5" cy="9.5" r="1.4" fill="currentColor" stroke="none" />
    <path d="M7.5 16 Q12 12.5 16.5 16" />
  </svg>
);

const NeutralFace = (
  <svg viewBox="0 0 24 24" className="w-4 h-4 sm:w-5.5 sm:h-5.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <circle cx="8.5" cy="9.5" r="1.4" fill="currentColor" stroke="none" />
    <circle cx="15.5" cy="9.5" r="1.4" fill="currentColor" stroke="none" />
    <line x1="7.5" y1="15" x2="16.5" y2="15" />
  </svg>
);

const SmileFace = (
  <svg viewBox="0 0 24 24" className="w-4 h-4 sm:w-5.5 sm:h-5.5" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round">
    <circle cx="8.5" cy="9" r="1.4" fill="currentColor" stroke="none" />
    <circle cx="15.5" cy="9" r="1.4" fill="currentColor" stroke="none" />
    <path d="M7.5 13.5 Q12 18 16.5 13.5" />
  </svg>
);

function FeedbackFormContent() {
  const params = useParams();
  const code = (params?.code as string) || "k9r4";

  const triggerHaptic = (type: "light" | "medium" | "heavy" = "light") => {
    if (typeof window !== "undefined" && typeof navigator !== "undefined" && navigator.vibrate) {
      const pattern = type === "light" ? 10 : type === "medium" ? 20 : 35;
      navigator.vibrate(pattern);
    }
  };

  // Language management
  const [lang, setLang] = useState<"en" | "hi" | "mr">("en");
  const [langDropdownOpen, setLangDropdownOpen] = useState(false);

  // Form Fields
  const [rating, setRating] = useState<number | null>(null);
  const [selectedReasons, setSelectedReasons] = useState<string[]>([]);
  const [otherReason, setOtherReason] = useState("");
  const [experienceComment, setExperienceComment] = useState("");
  const [contactRequested, setContactRequested] = useState<boolean | null>(null);
  const [mobileNumber, setMobileNumber] = useState("");
  // Modal comment states
  const [showCommentModal, setShowCommentModal] = useState(false);
  const [wantsToComment, setWantsToComment] = useState(false);
  const [tempComment, setTempComment] = useState("");

  // System States
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSuccess, setIsSuccess] = useState(false);
  const [networkErrorOccurred, setNetworkErrorOccurred] = useState(false);
  const [refId, setRefId] = useState("");

  // Animation triggers
  

  const q1Ref = useRef<HTMLDivElement>(null);
  const npsRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);

  const t = translations[lang];

  // Close dropdown on click outside
  useEffect(() => {
    function handleOutsideClick() {
      if (langDropdownOpen) setLangDropdownOpen(false);
    }
    window.addEventListener("click", handleOutsideClick);
    return () => window.removeEventListener("click", handleOutsideClick);
  }, [langDropdownOpen]);

  // Restrict to whitelisted showroom form codes
  const isPageUnavailable = code !== "k9r4" && code !== "s6m2";
  if (isPageUnavailable) {
    return <PageUnavailableView t={t} />;
  }

  // Get Star Styling dynamically
  // Select dynamic question checklists by rating sentiment
  const getQuestionLabel = () => {
    if (rating !== null && rating <= 6) return t.what_went_wrong;
    if (rating === 7 || rating === 8) return t.what_to_improve;
    return t.what_liked;
  };

  const getOptionsList = () => {
    if (rating !== null && rating <= 6) {
      return [
        { key: "staff_guidance", label: t.reasons.staff_guidance },
        { key: "waiting_time", label: t.reasons.waiting_time },
        { key: "pricing_clarity", label: t.reasons.pricing_clarity },
        { key: "availability", label: t.reasons.availability },
        { key: "billing_exchange", label: t.reasons.billing_exchange },
        { key: "other", label: t.reasons.other }
      ];
    } else if (rating === 7 || rating === 8) {
      return [
        { key: "designs", label: t.reasons.designs },
        { key: "fast_service", label: t.reasons.fast_service },
        { key: "guidance", label: t.reasons.guidance },
        { key: "clear_pricing", label: t.reasons.clear_pricing },
        { key: "showroom_comfort", label: t.reasons.showroom_comfort },
        { key: "other", label: t.reasons.other }
      ];
    } else if (rating === 9 || rating === 10) {
      return [
        { key: "helpful_staff", label: t.reasons.helpful_staff },
        { key: "variety_designs", label: t.reasons.variety_designs },
        { key: "transparent_pricing", label: t.reasons.transparent_pricing },
        { key: "fast_billing", label: t.reasons.fast_billing },
        { key: "showroom_exp", label: t.reasons.showroom_exp },
        { key: "overall_trust", label: t.reasons.overall_trust },
        { key: "other", label: t.reasons.other }
      ];
    }
    return [];
  };

  const handleReasonToggle = (key: string) => {
    setSelectedReasons((prev) =>
      prev.includes(key) ? prev.filter((r) => r !== key) : [...prev, key]
    );
  };

  // Validator logic
  const validateForm = (): boolean => {
    const newErrors: { [key: string]: string } = {};

    if (rating === null) {
      newErrors.rating = t.required;
    }

    if (rating !== null) {
      if (contactRequested === null) {
        newErrors.contactRequested = t.required;
      } else if (contactRequested === true) {
        const cleanMobile = mobileNumber.trim();
        const mobileRegex = /^[6-9]\d{9}$/;
        if (!cleanMobile) {
          newErrors.mobileNumber = t.required;
        } else if (!mobileRegex.test(cleanMobile)) {
          newErrors.mobileNumber = t.mobile_error;
        }
      }
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setTimeout(() => {
        const errKeys = Object.keys(newErrors);
        let targetRef = q1Ref;
        if (errKeys.includes("rating")) targetRef = q1Ref;
        else if (errKeys.includes("contactRequested") || errKeys.includes("mobileNumber")) {
          if (contactRef && contactRef.current) targetRef = contactRef;
        }

        if (targetRef && targetRef.current) {
          targetRef.current.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }, 100);
      return false;
    }

    return true;
  };

  const submitFeedback = async (commentOverride?: string) => {
    setIsSubmitting(true);
    setNetworkErrorOccurred(false);

    const finalComment = typeof commentOverride === "string" ? commentOverride : experienceComment;
    if (typeof commentOverride === "string") {
      setExperienceComment(commentOverride);
    }

    // Convert keys to active translations strings for storage
    const formattedReasons = selectedReasons.map((key) => {
      const match = getOptionsList().find((opt) => opt.key === key);
      return match ? match.label : key;
    });

    const payload = {
      rating,
      rating_label: rating !== null ? t.labels[rating as keyof typeof t.labels] || "" : "",
      selected_reasons: formattedReasons,
      other_reason: selectedReasons.includes("other") ? otherReason.trim() : "",
      experience_comment: finalComment.trim(),
      contact_requested: !!contactRequested,
      mobile_number: contactRequested ? mobileNumber.trim() : "",
      language: lang
    };

    try {
      const response = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const res = await response.json();
      setIsSubmitting(false);

      if (response.ok && res.status === "success") {
        setRefId(res.referenceId);
        setIsSuccess(true);
        setShowCommentModal(false);
      } else {
        setNetworkErrorOccurred(true);
      }
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch (e) {
      console.error(e);
      setIsSubmitting(false);
      setNetworkErrorOccurred(true);
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;
    setShowCommentModal(true);
    setWantsToComment(false);
    setTempComment("");
  };

    if (networkErrorOccurred) {
    return <NetworkErrorView t={t} onRetry={submitFeedback} onReturn={() => setNetworkErrorOccurred(false)} />;
  }

  if (isSuccess) {
    return <SuccessView t={t} rating={rating!} />;
  }

  return (
    <div className="min-h-screen bg-[#F7F4EF] text-[#171717] font-sans flex flex-col items-center pt-0 sm:pt-6 pb-[calc(1.5rem+env(safe-area-inset-bottom))] px-0 sm:px-4 animate-fade-in relative">
      {/* Dynamic Embedded Animation Keyframes */}
      <style>{`
        * {
          -webkit-tap-highlight-color: transparent;
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(24px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes drawCheck {
          to { stroke-dashoffset: 0; }
        }
        @keyframes scaleIn {
          from { transform: scale(0.8); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        @keyframes bounceStar {
          0% { transform: scale(1); }
          30% { transform: scale(1.35); }
          100% { transform: scale(1); }
        }
        @keyframes floatUp {
          0% { transform: translateY(0) rotate(0deg); opacity: 0; }
          10% { opacity: 0.8; }
          90% { opacity: 0.8; }
          100% { transform: translateY(-160px) rotate(360deg); opacity: 0; }
        }
        @keyframes fadeSlideIn {
          from { opacity: 0; transform: translateY(12px); max-height: 0; }
          to { opacity: 1; transform: translateY(0); max-height: 1000px; }
        }
        .animate-slide-up {
          animation: slideUp 0.65s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-scale-in {
          animation: scaleIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        .star-bounce {
          animation: bounceStar 0.35s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }
        .checkmark-path {
          stroke-dasharray: 48;
          stroke-dashoffset: 48;
          animation: drawCheck 0.6s cubic-bezier(0.65, 0, 0.45, 1) 0.25s forwards;
        }
        .animate-fade-slide-in {
          animation: fadeSlideIn 0.45s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .active-star-red {
          filter: drop-shadow(0 0 6px rgba(211, 47, 47, 0.45));
        }
        .active-star-amber {
          filter: drop-shadow(0 0 6px rgba(251, 192, 45, 0.45));
        }
        .active-star-green {
          filter: drop-shadow(0 0 7px rgba(46, 125, 50, 0.5));
        }
        .card-hover {
          transition: all 0.25s ease;
        }
        .card-hover:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 24px rgba(66, 17, 17, 0.05);
        }
      `}</style>

      <div className="w-full max-w-[550px] bg-white sm:border sm:border-[#E6DED3]/60 rounded-none sm:rounded-2xl shadow-none sm:shadow-[0_12px_40px_rgba(66,17,17,0.04)] flex flex-col justify-between animate-slide-up relative">
        
        {/* Top Header */}
        <header className="bg-[#421111] px-4 sm:px-6 py-4 border-b border-[#AE8448]/30 relative flex justify-center items-center rounded-t-none sm:rounded-t-2xl z-20">
          <Image
            src="/PGLOGO.png"
            alt="Pravesh Gold"
            width={90}
            height={90}
            priority
            className="w-[80px] h-auto object-contain"
          />

          <div className="absolute right-3.5">
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setLangDropdownOpen(!langDropdownOpen);
              }}
              className="flex items-center space-x-1.5 text-[11px] font-bold text-[#E7D2A5] hover:text-white transition-all focus:outline-none bg-white/5 px-2.5 py-1.5 rounded-lg border border-[#AE8448]/25 hover:bg-white/10"
            >
              <span>{lang === "en" ? "English" : lang === "hi" ? "हिंदी" : "मराठी"}</span>
              <svg className={`w-3 h-3 text-[#C8A568] transition-transform duration-200 ${langDropdownOpen ? "rotate-180" : ""}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {langDropdownOpen && (
              <div className="absolute right-0 mt-2 w-28 bg-white border border-[#E6DED3] rounded-lg shadow-lg z-20 py-1 text-gray-800 animate-scale-in">
                <button
                  type="button"
                  onClick={() => { setLang("en"); setLangDropdownOpen(false); }}
                  className={`block w-full text-left px-3.5 py-2 text-xs hover:bg-[#FFF8E8] transition-colors ${lang === "en" ? "font-bold bg-[#FFF8E8] text-[#421111]" : ""}`}
                >
                  English
                </button>
                <button
                  type="button"
                  onClick={() => { setLang("hi"); setLangDropdownOpen(false); }}
                  className={`block w-full text-left px-3.5 py-2 text-xs hover:bg-[#FFF8E8] transition-colors ${lang === "hi" ? "font-bold bg-[#FFF8E8] text-[#421111]" : ""}`}
                >
                  हिंदी
                </button>
                <button
                  type="button"
                  onClick={() => { setLang("mr"); setLangDropdownOpen(false); }}
                  className={`block w-full text-left px-3.5 py-2 text-xs hover:bg-[#FFF8E8] transition-colors ${lang === "mr" ? "font-bold bg-[#FFF8E8] text-[#421111]" : ""}`}
                >
                  मराठी
                </button>
              </div>
            )}
          </div>
        </header>

        {/* Form Body */}
        <main className="flex-1">
          <form onSubmit={handleSubmit}>
            
            {/* Title / Description */}
            <div className="p-6 text-center border-b border-[#FAF9F7] bg-[#FAF9F6]">
              <h2 className="text-[18px] font-serif font-normal text-gray-900 tracking-tight">
                {t.subtitle}
              </h2>
            </div>

            {/* Section 1: NPS Rating Bar */}
            <div ref={q1Ref} className="px-4 sm:px-6 py-6 border-b border-[#E6DED3]/60 text-center space-y-4">
              <label className="block text-sm font-bold text-gray-800 leading-snug">
                {t.rating_title} <span className="text-[#B64F45]">*</span>
              </label>

              {/* Responsive NPS split container - Row 1 (1-6) & Row 2 (7-10) */}
              <div className="space-y-5 max-w-md mx-auto py-3 px-1">
                {/* Row 1: Scores 1 to 6 */}
                <div className="flex flex-row justify-between items-center w-full gap-1 min-[360px]:gap-1.5 sm:gap-2.5">
                  {[1, 2, 3, 4, 5, 6].map((score) => {
                    const isSelected = rating === score;
                    let colorClass = "";
                    let shadowClass = "";
                    let FaceIcon = null;

                    const defaultShadowClass = "shadow-[inset_-1.5px_-1.5px_3.5px_rgba(0,0,0,0.18),inset_1.5px_1.5px_3.5px_rgba(255,255,255,0.4),0_3px_8px_rgba(0,0,0,0.08)]";

                    // Detractors (1-6): Deep Orange/Red 3D gradient
                    colorClass = "bg-gradient-to-br from-[#FF8F6B] via-[#E64A19] to-[#C62828] text-[#1E0800] border-[#B71C1C]/25";
                    shadowClass = "shadow-[inset_-2px_-2px_5px_rgba(0,0,0,0.25),inset_2px_2px_5px_rgba(255,255,255,0.5),0_8px_20px_rgba(230,74,25,0.52)] border-[#E64A19]";
                    FaceIcon = FrownFace;

                    return (
                      <button
                        key={score}
                        type="button"
                        onClick={() => {
                          setRating(score);
                          setSelectedReasons([]);
                          setOtherReason("");
                          setErrors((prev) => ({ ...prev, rating: "" }));
                        }}
                        onMouseDown={() => triggerHaptic("medium")}
                        onTouchStart={() => triggerHaptic("medium")}
                        className={`flex flex-col items-center flex-1 min-w-0 focus:outline-none transition-all duration-200 ${
                          isSelected ? "scale-110 z-10" : "opacity-65 hover:opacity-90"
                        }`}
                      >
                        {/* Icon Circle */}
                        <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border transition-all ${colorClass} ${
                          isSelected ? shadowClass + " border-2 scale-105" : defaultShadowClass + " border-transparent"
                        }`}>
                          {FaceIcon}
                        </div>
                        
                        {/* Number Label */}
                        <span className={`text-[10px] sm:text-xs mt-1.5 font-bold transition-all ${
                          isSelected ? "text-gray-955 scale-110 font-extrabold" : "text-gray-600 font-semibold"
                        }`}>
                          {score}
                        </span>
                      </button>
                    );
                  })}
                </div>

                {/* Row 2: Scores 7 to 10 */}
                <div className="flex flex-row justify-center items-center gap-4.5 sm:gap-6 w-full max-w-[280px] sm:max-w-[340px] mx-auto">
                  {[7, 8, 9, 10].map((score) => {
                    const isSelected = rating === score;
                    let colorClass = "";
                    let shadowClass = "";
                    let FaceIcon = null;

                    const defaultShadowClass = "shadow-[inset_-1.5px_-1.5px_3.5px_rgba(0,0,0,0.18),inset_1.5px_1.5px_3.5px_rgba(255,255,255,0.4),0_3px_8px_rgba(0,0,0,0.08)]";

                    // Passives (7-8): Rich Yellow/Amber 3D gradient
                    if (score <= 8) {
                      colorClass = "bg-gradient-to-br from-[#FFD54F] via-[#FFA000] to-[#E65100] text-[#1E1100] border-[#E65100]/25";
                      shadowClass = "shadow-[inset_-2px_-2px_5px_rgba(0,0,0,0.25),inset_2px_2px_5px_rgba(255,255,255,0.5),0_8px_20px_rgba(255,160,0,0.52)] border-[#FFA000]";
                      FaceIcon = NeutralFace;
                    }
                    // Promoters (9-10): Rich Green 3D gradient
                    else {
                      colorClass = "bg-gradient-to-br from-[#81C784] via-[#388E3C] to-[#1B5E20] text-[#0A250D] border-[#1B5E20]/25";
                      shadowClass = "shadow-[inset_-2px_-2px_5px_rgba(0,0,0,0.25),inset_2px_2px_5px_rgba(255,255,255,0.5),0_8px_20px_rgba(56,142,60,0.62)] border-[#388E3C]";
                      FaceIcon = SmileFace;
                    }

                    return (
                      <button
                        key={score}
                        type="button"
                        onClick={() => {
                          if (score === 9 || score === 10) {
                            playCelebrationChime();
                          }
                          setRating(score);
                          setSelectedReasons([]);
                          setOtherReason("");
                          setErrors((prev) => ({ ...prev, rating: "" }));
                        }}
                        onMouseDown={() => triggerHaptic("medium")}
                        onTouchStart={() => triggerHaptic("medium")}
                        className={`flex flex-col items-center w-8 sm:w-10 focus:outline-none transition-all duration-200 ${
                          isSelected ? "scale-110 z-10" : "opacity-65 hover:opacity-90"
                        }`}
                      >
                        {/* Icon Circle */}
                        <div className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center border transition-all ${colorClass} ${
                          isSelected ? shadowClass + " border-2 scale-105" : defaultShadowClass + " border-transparent"
                        }`}>
                          {FaceIcon}
                        </div>
                        
                        {/* Number Label */}
                        <span className={`text-[10px] sm:text-xs mt-1.5 font-bold transition-all ${
                          isSelected ? "text-gray-955 scale-110 font-extrabold" : "text-gray-600 font-semibold"
                        }`}>
                          {score}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {rating !== null && (
                <div className="flex justify-center animate-scale-in pt-1">
                  <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border ${
                    rating <= 6
                      ? "bg-red-50 text-[#B64F45] border-red-100/60"
                      : rating === 7 || rating === 8
                      ? "bg-amber-50 text-[#C8A568] border-amber-100/60"
                      : "bg-[#F2F7F4] text-[#3E7154] border-[#E2ECE7]"
                  }`}>
                    {t.labels[rating as keyof typeof t.labels]}
                  </span>
                </div>
              )}

              {errors.rating && (
                <p className="text-xs text-[#B64F45] font-semibold animate-scale-in">{errors.rating}</p>
              )}
            </div>
            
            {/* Dynamic Checkbox Options & Progressive Disclosure Form */}
            {rating !== null && (
              <div className="animate-fade-slide-in divide-y divide-[#E6DED3]/40">
                {/* Checklist options */}
                <div className="px-4 sm:px-6 py-6 text-left space-y-3.5 max-w-md mx-auto">
                  <span className="block text-xs font-bold text-[#AE8448] uppercase tracking-wider mb-2.5">
                    {getQuestionLabel()}
                  </span>
                  
                  <div className="grid grid-cols-1 gap-2.5">
                    {getOptionsList().map((opt) => {
                      const isChecked = selectedReasons.includes(opt.key);
                      return (
                        <button
                          key={opt.key}
                          type="button"
                          onClick={() => handleReasonToggle(opt.key)}
                          onMouseDown={() => triggerHaptic("light")}
                          onTouchStart={() => triggerHaptic("light")}
                          className={`flex items-center space-x-3.5 w-full min-h-[46px] px-4 border rounded-xl text-sm text-left transition-all duration-200 card-hover ${
                            isChecked
                              ? "border-[#AE8448] bg-[#FDFBF7] font-semibold text-gray-900 shadow-sm shadow-[#AE8448]/5"
                              : "border-[#E6DED3] bg-[#FAF9F7]/40 text-gray-700 hover:border-[#C8A568] hover:bg-[#FAF6F0]"
                          }`}
                        >
                          <span className={`w-4 h-4 rounded border flex items-center justify-center flex-shrink-0 transition-colors duration-150 ${
                            isChecked 
                              ? "border-[#421111] bg-[#421111] text-white" 
                              : "border-[#D9CFC1] bg-white"
                          }`}>
                            {isChecked && (
                              <svg className="w-2.5 h-2.5 animate-scale-in" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="3.5">
                                <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                              </svg>
                            )}
                          </span>
                          <span>{opt.label}</span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Optional Text input for 'other' selection */}
                  {selectedReasons.includes("other") && (
                    <div className="mt-2.5 animate-fade-slide-in">
                      <input
                        type="text"
                        value={otherReason}
                        onChange={(e) => setOtherReason(e.target.value)}
                        placeholder={t.other_placeholder}
                        className="w-full min-h-[44px] px-3.5 border border-[#D9CFC1] rounded-xl text-base bg-[#FAF9F7] focus:outline-none focus:border-[#C8A568] text-gray-800 font-medium transition-all"
                      />
                    </div>
                  )}
                </div>

                {/* Section 3: Contact Yes/No & Optional Mobile input */}
                <div ref={contactRef} className="px-4 sm:px-6 py-6 bg-[#FAF9F6] space-y-4.5">
                  <label className="block text-xs font-bold text-[#AE8448] uppercase tracking-wider text-center sm:text-left">
                    {t.contact_ask} <span className="text-[#B64F45]">*</span>
                  </label>

                  <div className="flex space-x-3 max-w-md mx-auto">
                    <button
                      type="button"
                      onClick={() => {
                        setContactRequested(true);
                        setErrors((prev) => ({ ...prev, contactRequested: "" }));
                      }}
                      onMouseDown={() => triggerHaptic("light")}
                      onTouchStart={() => triggerHaptic("light")}
                      className={`flex-1 min-h-[46px] px-4 border rounded-xl text-sm font-semibold transition-all duration-200 card-hover ${
                        contactRequested === true
                          ? "border-[#AE8448] bg-[#FDFBF7] text-gray-900 shadow-sm shadow-[#AE8448]/5"
                          : "border-[#E6DED3] bg-[#FAF9F7]/40 text-gray-700 hover:border-[#C8A568] hover:bg-[#FAF6F0]"
                      }`}
                    >
                      {t.yes}
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setContactRequested(false);
                        setMobileNumber("");
                        setErrors((prev) => ({ ...prev, contactRequested: "", mobileNumber: "" }));
                      }}
                      onMouseDown={() => triggerHaptic("light")}
                      onTouchStart={() => triggerHaptic("light")}
                      className={`flex-1 min-h-[46px] px-4 border rounded-xl text-sm font-semibold transition-all duration-200 card-hover ${
                        contactRequested === false
                          ? "border-[#AE8448] bg-[#FDFBF7] text-gray-900 shadow-sm shadow-[#AE8448]/5"
                          : "border-[#E6DED3] bg-[#FAF9F7]/40 text-gray-700 hover:border-[#C8A568] hover:bg-[#FAF6F0]"
                      }`}
                    >
                      {t.no}
                    </button>
                  </div>
                  {errors.contactRequested && (
                    <p className="text-xs text-[#B64F45] font-semibold text-center sm:text-left animate-scale-in">{errors.contactRequested}</p>
                  )}

                  {/* Conditional Mobile Number Input */}
                  {contactRequested === true && (
                    <div className="space-y-1.5 pt-3.5 border-t border-[#E6DED3]/50 animate-fade-slide-in max-w-md mx-auto">
                      <label className="block text-xs font-bold text-gray-700">
                        {t.mobile_label} <span className="text-[#B64F45]">*</span>
                      </label>
                      <input
                        type="tel"
                        inputMode="numeric"
                        maxLength={10}
                        value={mobileNumber}
                        onChange={(e) => {
                          const val = e.target.value.replace(/\D/g, "").slice(0, 10);
                          setMobileNumber(val);
                          setErrors((prev) => ({ ...prev, mobileNumber: "" }));
                        }}
                        placeholder={t.mobile_placeholder}
                        className={`w-full min-h-[44px] px-3.5 border rounded-xl text-base bg-white focus:outline-none transition-all ${
                          errors.mobileNumber ? "border-[#B64F45] bg-[#FAF5F4]" : "border-[#D9CFC1] focus:border-[#421111]"
                        }`}
                      />
                      {errors.mobileNumber && (
                        <p className="text-xs text-[#B64F45] font-semibold animate-scale-in">{errors.mobileNumber}</p>
                      )}
                    </div>
                  )}
                </div>

                {/* Submission button */}
                <div className="px-4 sm:px-6 py-6 bg-white space-y-4 rounded-b-none sm:rounded-b-2xl max-w-md mx-auto">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    onMouseDown={() => triggerHaptic("heavy")}
                    onTouchStart={() => triggerHaptic("heavy")}
                    className="w-full min-h-[50px] bg-[#421111] hover:bg-[#300B0B] text-white hover:text-[#E7D2A5] border border-[#AE8448]/30 rounded-xl text-sm font-semibold tracking-wide uppercase transition-all duration-200 focus:outline-none flex items-center justify-center space-x-2 disabled:opacity-75 disabled:cursor-not-allowed shadow-[0_4px_12px_rgba(66,17,17,0.15)] active:scale-[0.99]"
                  >
                    {isSubmitting ? (
                      <>
                        <svg className="animate-spin h-4 w-4 text-[#C8A568]" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                        <span>{t.submitting}</span>
                      </>
                    ) : (
                      <span>{t.submit}</span>
                    )}
                  </button>
                </div>
              </div>
            )}
            </form>
        {/* Step-by-Step Comment Request Popup Modal */}
      {showCommentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-fade-in">
          <div className="w-full max-w-sm bg-[#FAF8F5] rounded-2xl border border-[#E6DED3] shadow-2xl overflow-hidden animate-scale-in flex flex-col">
            {/* Header branding band */}
            <div className="bg-[#421111] px-5 py-4 text-center border-b border-[#AE8448]/20">
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#C8A568]">
                Pravesh Gold
              </span>
            </div>
            
            <div className="p-6">
              {!wantsToComment ? (
                // Step 1: Ask if they want to give a comment
                <div className="text-center space-y-5">
                  <h3 className="text-base font-bold text-gray-800 leading-snug">
                    {t.comment_ask_title}
                  </h3>
                  <div className="flex space-x-3 pt-2">
                    <button
                      type="button"
                      onClick={() => setWantsToComment(true)}
                      className="flex-1 min-h-[46px] px-4 border border-[#AE8448] bg-[#FDFBF7] text-gray-900 font-bold rounded-xl text-sm transition-all shadow-sm active:scale-[0.97]"
                    >
                      {t.yes}
                    </button>
                    <button
                      type="button"
                      disabled={isSubmitting}
                      onClick={async () => {
                        await submitFeedback("");
                      }}
                      className="flex-1 min-h-[46px] px-4 border border-[#E6DED3] bg-[#FAF9F7]/40 text-gray-700 font-semibold rounded-xl text-sm transition-all hover:bg-gray-50 active:scale-[0.97] flex items-center justify-center"
                    >
                      {isSubmitting ? (
                        <svg className="animate-spin h-5 w-5 text-gray-500" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                      ) : (
                        t.no
                      )}
                    </button>
                  </div>
                </div>
              ) : (
                // Step 2: Show comment input box and final submit button
                <div className="space-y-4 text-left">
                  <label className="block text-xs font-bold text-[#AE8448] uppercase tracking-wider">
                    {t.comment_label}
                  </label>
                  <textarea
                    value={tempComment}
                    onChange={(e) => setTempComment(e.target.value)}
                    placeholder={t.comment_placeholder}
                    className="w-full min-h-[105px] p-3 border border-[#D9CFC1] rounded-xl text-base bg-white focus:outline-none focus:border-[#C8A568] transition-all text-gray-800 font-medium placeholder:text-gray-400"
                  />
                  <div className="flex space-x-3 pt-2">
                    <button
                      type="button"
                      disabled={isSubmitting}
                      onClick={() => {
                        setWantsToComment(false);
                        setTempComment("");
                      }}
                      className="flex-1 min-h-[46px] px-4 border border-[#E6DED3] bg-white text-gray-600 font-semibold rounded-xl text-sm transition-all hover:bg-gray-50 active:scale-[0.97]"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      disabled={isSubmitting}
                      onClick={async () => {
                        await submitFeedback(tempComment);
                      }}
                      className="flex-1 min-h-[46px] px-4 bg-[#421111] hover:bg-[#300B0B] text-white font-bold rounded-xl text-sm transition-all shadow-md active:scale-[0.97] flex items-center justify-center"
                    >
                      {isSubmitting ? (
                        <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                        </svg>
                      ) : (
                        t.submit
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
      
      </main>
      </div>
    </div>
  );
}

export default function FeedbackPage() {
  return (
    <Suspense fallback={
      <div className="flex-1 min-h-screen flex items-center justify-center py-20 bg-[#F7F4EF]">
        <svg className="animate-spin h-6 w-6 text-[#C8A568]" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
        </svg>
      </div>
    }>
      <FeedbackFormContent />
    </Suspense>
  );
}

// Success Template with celebration confetti particles and auto-drawing checkmarks
function SuccessView({ t, rating }: { t: TranslationType; rating: number }) {
  const showConfetti = rating === 9 || rating === 10;

  useEffect(() => {
    if (rating === 9 || rating === 10) {
      playCelebrationChime();
    }
  }, [rating]);

  // Generate random confetti particle styles
  const particles = Array.from({ length: 25 }).map((_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    delay: `${Math.random() * 1.5}s`,
    size: `${Math.random() * 8 + 4}px`,
    color: ['#AE8448', '#3E7154', '#C8A568', '#B64F45'][Math.floor(Math.random() * 4)],
    duration: `${Math.random() * 2 + 2.5}s`
  }));

  const getSuccessMessage = () => {
    if (rating !== null && rating <= 6) return t.success_msg_low;
    if (rating === 7 || rating === 8) return t.success_msg_mid;
    return t.success_msg_high;
  };

  return (
    <div className="min-h-screen bg-[#F7F4EF] flex items-center justify-center p-4 relative overflow-hidden">
      
      {/* Styles for confetti animations */}
      <style>{`
        @keyframes floatUp {
          0% { transform: translateY(120px) rotate(0deg); opacity: 0; }
          15% { opacity: 0.95; }
          85% { opacity: 0.95; }
          100% { transform: translateY(-240px) rotate(360deg); opacity: 0; }
        }
        @keyframes slideUp {
          from { opacity: 0; transform: translateY(28px) scale(0.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes scaleIn {
          from { transform: scale(0.7); opacity: 0; }
          to { transform: scale(1); opacity: 1; }
        }
        @keyframes drawCheck {
          to { stroke-dashoffset: 0; }
        }
        .animate-slide-up {
          animation: slideUp 0.75s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }
        .animate-scale-in {
          animation: scaleIn 0.5s cubic-bezier(0.34, 1.56, 0.64, 1) forwards;
        }
        .checkmark-path {
          stroke-dasharray: 48;
          stroke-dashoffset: 48;
          animation: drawCheck 0.65s cubic-bezier(0.65, 0, 0.45, 1) 0.3s forwards;
        }
      `}</style>

      {/* Background celebration floating confetti */}
      {showConfetti && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          {particles.map((p) => (
            <div
              key={p.id}
              className="absolute opacity-0"
              style={{
                left: p.left,
                bottom: '10%',
                width: p.size,
                height: p.size,
                backgroundColor: p.color,
                borderRadius: Math.random() > 0.55 ? '50%' : '3px',
                animation: `floatUp ${p.duration} ease-out ${p.delay} infinite`
              }}
            />
          ))}
        </div>
      )}

      <div className="w-full max-w-[460px] bg-white border border-[#E6DED3] rounded-2xl p-6 sm:p-8 text-center space-y-5 shadow-xl relative z-10 animate-slide-up">
        
        {/* Animated circle + checkmark */}
        <div className="w-16 h-16 bg-[#E8F0EA] rounded-full flex items-center justify-center mx-auto animate-scale-in">
          <svg className="w-8 h-8 text-[#3E7154]" fill="none" viewBox="0 0 24 24" stroke="currentColor" stroke-width="3.5">
            <path className="checkmark-path" stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </div>

        <div className="space-y-2">
          <h1 className="text-xl font-serif font-normal text-gray-900 tracking-tight">{t.success_title}</h1>
          <p className="text-xs text-gray-500 leading-relaxed max-w-sm mx-auto">{getSuccessMessage()}</p>
        </div>
      </div>
    </div>
  );
}

// Outage Retry Template
function NetworkErrorView({ t, onRetry, onReturn }: { t: TranslationType; onRetry: () => void; onReturn: () => void }) {
  return (
    <div className="min-h-screen bg-[#F7F4EF] flex items-center justify-center p-4">
      <div className="w-full max-w-[460px] bg-white border border-[#B64F45]/30 rounded-2xl p-6 sm:p-8 text-center space-y-4 shadow-sm">
        <div className="w-12 h-12 bg-[#F8ECEB] border border-[#B64F45]/30 text-[#B64F45] rounded-full flex items-center justify-center mx-auto">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
          </svg>
        </div>

        <div className="space-y-1.5">
          <h1 className="text-xl font-serif font-normal text-gray-900 tracking-tight">{t.net_error_title}</h1>
          <p className="text-xs text-gray-500 leading-relaxed">{t.net_error_msg}</p>
        </div>

        <div className="flex space-x-3 pt-2">
          <button
            type="button"
            onClick={onReturn}
            className="flex-1 min-h-[42px] px-4 border border-[#E6DED3] bg-white text-gray-700 hover:border-gray-300 hover:bg-gray-50 rounded-lg text-xs font-semibold transition-all focus:outline-none"
          >
            {t.return_review}
          </button>
          <button
            type="button"
            onClick={onRetry}
            className="flex-1 min-h-[42px] bg-[#421111] text-white hover:bg-[#300B0B] rounded-lg text-xs font-bold transition-all focus:outline-none"
          >
            <span>{t.retry}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

// Form Link Unavailable Template
function PageUnavailableView({ t }: { t: TranslationType }) {
  return (
    <div className="min-h-screen bg-[#F7F4EF] flex items-center justify-center p-4">
      <div className="w-full max-w-[460px] bg-white border border-[#E6DED3] rounded-2xl p-6 sm:p-8 text-center space-y-4 shadow-sm">
        <div className="w-12 h-12 bg-[#FAF9F7] border border-maroon/20 text-[#421111] rounded-full flex items-center justify-center mx-auto">
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="2">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
          </svg>
        </div>

        <div className="space-y-1.5">
          <h1 className="text-xl font-serif font-normal text-gray-900 tracking-tight">{t.page_unavailable_title}</h1>
          <p className="text-xs text-gray-500 leading-relaxed">{t.page_unavailable_msg}</p>
        </div>
      </div>
    </div>
  );
}
