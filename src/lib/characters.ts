/**
 * Open Peeps character library — inline SVG definitions
 * License: CC0 (Public Domain) — openpeeps.com by Pablo Stanley
 * 
 * Characters are stored as inline SVG strings categorized by pose type.
 * Each character has multiple pose variants.
 */

export interface CharacterPose {
  id: string;
  name: string;
  /** Inline SVG string (no <svg> wrapper, just the paths/groups) */
  svg: string;
  viewBox: string;
}

export interface Character {
  id: string;
  name: string;
  library?: string;
  category: "happy" | "thinking" | "celebrating" | "sitting" | "standing" | "waving" | "working";
  description: string;
  /** Base color (skin tone) */
  defaultColor?: string;
  poses: CharacterPose[];
}

// ─── SVG Path Data ────────────────────────────────────────────────────────────
// Simplified Open Peeps-style SVG characters

const STANDING_HAPPY = `
<g>
  <!-- Body -->
  <rect x="140" y="220" width="120" height="160" rx="20" fill="#7C3AED"/>
  <!-- Neck -->
  <rect x="185" y="195" width="30" height="35" rx="8" fill="#F5CBA7"/>
  <!-- Head -->
  <ellipse cx="200" cy="170" rx="55" ry="60" fill="#F5CBA7"/>
  <!-- Eyes -->
  <circle cx="180" cy="158" r="8" fill="#1a1a2e"/>
  <circle cx="220" cy="158" r="8" fill="#1a1a2e"/>
  <circle cx="183" cy="155" r="3" fill="white"/>
  <circle cx="223" cy="155" r="3" fill="white"/>
  <!-- Smile -->
  <path d="M 178 178 Q 200 195 222 178" stroke="#1a1a2e" stroke-width="3" fill="none" stroke-linecap="round"/>
  <!-- Hair -->
  <ellipse cx="200" cy="120" rx="58" ry="30" fill="#2D3748"/>
  <rect x="142" y="110" width="20" height="60" rx="10" fill="#2D3748"/>
  <rect x="238" y="110" width="20" height="60" rx="10" fill="#2D3748"/>
  <!-- Arms -->
  <rect x="80" y="225" width="30" height="90" rx="15" fill="#F5CBA7" transform="rotate(-10 95 270)"/>
  <rect x="290" y="225" width="30" height="90" rx="15" fill="#F5CBA7" transform="rotate(10 305 270)"/>
  <!-- Hands -->
  <circle cx="88" cy="325" r="18" fill="#F5CBA7"/>
  <circle cx="312" cy="325" r="18" fill="#F5CBA7"/>
  <!-- Legs -->
  <rect x="155" y="375" width="35" height="100" rx="15" fill="#2D3748"/>
  <rect x="210" y="375" width="35" height="100" rx="15" fill="#2D3748"/>
  <!-- Feet -->
  <ellipse cx="172" cy="480" rx="28" ry="14" fill="#1a1a2e"/>
  <ellipse cx="228" cy="480" rx="28" ry="14" fill="#1a1a2e"/>
</g>`;

const WAVING_HAPPY = `
<g>
  <!-- Body -->
  <rect x="140" y="220" width="120" height="160" rx="20" fill="#059669"/>
  <!-- Neck -->
  <rect x="185" y="195" width="30" height="35" rx="8" fill="#FDBCB4"/>
  <!-- Head -->
  <ellipse cx="200" cy="170" rx="55" ry="60" fill="#FDBCB4"/>
  <!-- Eyes - happy squint -->
  <path d="M 172 160 Q 180 153 188 160" stroke="#1a1a2e" stroke-width="3" fill="none" stroke-linecap="round"/>
  <path d="M 212 160 Q 220 153 228 160" stroke="#1a1a2e" stroke-width="3" fill="none" stroke-linecap="round"/>
  <!-- Big smile -->
  <path d="M 175 180 Q 200 200 225 180" stroke="#1a1a2e" stroke-width="3" fill="none" stroke-linecap="round"/>
  <!-- Teeth -->
  <path d="M 178 185 Q 200 198 222 185 L 222 192 Q 200 205 178 192 Z" fill="white"/>
  <!-- Hair -->
  <ellipse cx="200" cy="118" rx="60" ry="32" fill="#92400E"/>
  <rect x="142" y="108" width="18" height="65" rx="9" fill="#92400E"/>
  <rect x="240" y="108" width="18" height="65" rx="9" fill="#92400E"/>
  <!-- Waving arm (right, raised) -->
  <rect x="275" y="200" width="28" height="80" rx="14" fill="#FDBCB4" transform="rotate(-50 289 230)"/>
  <!-- Waving hand -->
  <circle cx="330" cy="185" r="20" fill="#FDBCB4"/>
  <!-- Left arm down -->
  <rect x="97" y="230" width="28" height="85" rx="14" fill="#FDBCB4"/>
  <circle cx="111" cy="323" r="17" fill="#FDBCB4"/>
  <!-- Legs -->
  <rect x="155" y="375" width="35" height="100" rx="15" fill="#1E293B"/>
  <rect x="210" y="375" width="35" height="100" rx="15" fill="#1E293B"/>
  <!-- Feet -->
  <ellipse cx="172" cy="480" rx="28" ry="14" fill="#0F172A"/>
  <ellipse cx="228" cy="480" rx="28" ry="14" fill="#0F172A"/>
</g>`;

const SITTING_WORKING = `
<g>
  <!-- Chair -->
  <rect x="100" y="310" width="200" height="15" rx="7" fill="#64748B"/>
  <rect x="108" y="325" width="15" height="120" rx="7" fill="#64748B"/>
  <rect x="277" y="325" width="15" height="120" rx="7" fill="#64748B"/>
  <rect x="290" y="260" width="15" height="70" rx="7" fill="#64748B"/>
  <!-- Laptop -->
  <rect x="140" y="250" width="120" height="75" rx="8" fill="#1E293B"/>
  <rect x="143" y="253" width="114" height="66" rx="6" fill="#0F172A"/>
  <!-- Screen glow -->
  <rect x="145" y="255" width="110" height="62" rx="5" fill="#6366F1" opacity="0.3"/>
  <!-- Code on screen -->
  <rect x="150" y="263" width="60" height="4" rx="2" fill="#818CF8" opacity="0.8"/>
  <rect x="150" y="272" width="85" height="4" rx="2" fill="#34D399" opacity="0.8"/>
  <rect x="155" y="281" width="70" height="4" rx="2" fill="#F472B6" opacity="0.8"/>
  <rect x="150" y="290" width="45" height="4" rx="2" fill="#818CF8" opacity="0.8"/>
  <!-- Laptop base -->
  <rect x="125" y="323" width="150" height="8" rx="4" fill="#334155"/>
  <!-- Body (sitting) -->
  <rect x="148" y="200" width="104" height="120" rx="18" fill="#7C3AED"/>
  <!-- Neck -->
  <rect x="188" y="175" width="24" height="30" rx="7" fill="#C68642"/>
  <!-- Head -->
  <ellipse cx="200" cy="148" rx="52" ry="56" fill="#C68642"/>
  <!-- Eyes focused -->
  <circle cx="182" cy="138" r="7" fill="#1a1a2e"/>
  <circle cx="218" cy="138" r="7" fill="#1a1a2e"/>
  <circle cx="185" cy="136" r="2.5" fill="white"/>
  <circle cx="221" cy="136" r="2.5" fill="white"/>
  <!-- Neutral focused mouth -->
  <rect x="188" y="158" width="24" height="5" rx="2.5" fill="#1a1a2e" opacity="0.5"/>
  <!-- Hair -->
  <ellipse cx="200" cy="100" rx="54" ry="28" fill="#1a1a2e"/>
  <rect x="148" y="90" width="16" height="60" rx="8" fill="#1a1a2e"/>
  <!-- Arms reaching to laptop -->
  <rect x="100" y="230" width="55" height="22" rx="11" fill="#C68642" transform="rotate(30 127 241)"/>
  <rect x="245" y="230" width="55" height="22" rx="11" fill="#C68642" transform="rotate(-30 273 241)"/>
  <!-- Hands -->
  <circle cx="137" cy="262" r="14" fill="#C68642"/>
  <circle cx="263" cy="262" r="14" fill="#C68642"/>
  <!-- Legs (sitting) -->
  <rect x="150" y="310" width="40" height="20" rx="10" fill="#1E293B"/>
  <rect x="210" y="310" width="40" height="20" rx="10" fill="#1E293B"/>
  <!-- Shoes -->
  <ellipse cx="170" cy="330" rx="25" ry="12" fill="#0F172A"/>
  <ellipse cx="230" cy="330" rx="25" ry="12" fill="#0F172A"/>
</g>`;

const CELEBRATING = `
<g>
  <!-- Confetti -->
  <rect x="80" y="60" width="12" height="12" rx="2" fill="#F59E0B" transform="rotate(30 86 66)"/>
  <rect x="290" y="50" width="10" height="10" rx="2" fill="#EC4899" transform="rotate(-20 295 55)"/>
  <circle cx="100" cy="120" r="8" fill="#10B981"/>
  <rect x="280" y="100" width="8" height="14" rx="2" fill="#6366F1" transform="rotate(45 284 107)"/>
  <circle cx="320" cy="180" r="6" fill="#F59E0B"/>
  <rect x="60" y="180" width="10" height="10" rx="2" fill="#EC4899" transform="rotate(15)"/>
  <!-- Body -->
  <rect x="140" y="220" width="120" height="160" rx="20" fill="#DC2626"/>
  <!-- Neck -->
  <rect x="185" y="195" width="30" height="35" rx="8" fill="#FDBCB4"/>
  <!-- Head -->
  <ellipse cx="200" cy="170" rx="55" ry="60" fill="#FDBCB4"/>
  <!-- Eyes - excited wide -->
  <circle cx="180" cy="158" r="9" fill="#1a1a2e"/>
  <circle cx="220" cy="158" r="9" fill="#1a1a2e"/>
  <circle cx="184" cy="154" r="4" fill="white"/>
  <circle cx="224" cy="154" r="4" fill="white"/>
  <!-- Open mouth smile -->
  <path d="M 175 182 Q 200 205 225 182 L 222 190 Q 200 212 178 190 Z" fill="#1a1a2e"/>
  <rect x="180" y="188" width="40" height="12" rx="2" fill="white"/>
  <!-- Hair -->
  <ellipse cx="200" cy="115" rx="60" ry="32" fill="#B45309"/>
  <!-- Both arms raised! -->
  <rect x="82" y="190" width="28" height="80" rx="14" fill="#FDBCB4" transform="rotate(40 96 230)"/>
  <rect x="290" y="190" width="28" height="80" rx="14" fill="#FDBCB4" transform="rotate(-40 304 230)"/>
  <!-- Hands raised -->
  <circle cx="68" cy="185" r="20" fill="#FDBCB4"/>
  <circle cx="332" cy="185" r="20" fill="#FDBCB4"/>
  <!-- Legs jumping -->
  <rect x="155" y="375" width="35" height="90" rx="15" fill="#1E293B" transform="rotate(-8 172 420)"/>
  <rect x="210" y="375" width="35" height="90" rx="15" fill="#1E293B" transform="rotate(8 228 420)"/>
  <!-- Feet -->
  <ellipse cx="168" cy="468" rx="28" ry="14" fill="#0F172A" transform="rotate(-8 168 468)"/>
  <ellipse cx="232" cy="468" rx="28" ry="14" fill="#0F172A" transform="rotate(8 232 468)"/>
</g>`;

const THINKING = `
<g>
  <!-- Body -->
  <rect x="140" y="220" width="120" height="160" rx="20" fill="#0891B2"/>
  <!-- Neck -->
  <rect x="185" y="195" width="30" height="35" rx="8" fill="#F5CBA7"/>
  <!-- Head tilted slightly -->
  <ellipse cx="205" cy="168" rx="55" ry="58" fill="#F5CBA7"/>
  <!-- Eyes looking up-right -->
  <circle cx="188" cy="153" r="7" fill="#1a1a2e"/>
  <circle cx="224" cy="150" r="7" fill="#1a1a2e"/>
  <circle cx="190" cy="151" r="2.5" fill="white"/>
  <circle cx="226" cy="148" r="2.5" fill="white"/>
  <!-- Thinking mouth -->
  <path d="M 188 178 Q 205 182 218 175" stroke="#1a1a2e" stroke-width="2.5" fill="none" stroke-linecap="round"/>
  <!-- Hair -->
  <ellipse cx="205" cy="115" rx="58" ry="30" fill="#4B5563"/>
  <rect x="150" y="108" width="16" height="62" rx="8" fill="#4B5563"/>
  <rect x="245" y="108" width="16" height="62" rx="8" fill="#4B5563"/>
  <!-- Hand on chin -->
  <rect x="240" y="230" width="55" height="22" rx="11" fill="#F5CBA7" transform="rotate(-35 267 241)"/>
  <circle cx="285" cy="212" r="18" fill="#F5CBA7"/>
  <!-- Left arm natural -->
  <rect x="97" y="228" width="28" height="85" rx="14" fill="#F5CBA7"/>
  <circle cx="111" cy="321" r="17" fill="#F5CBA7"/>
  <!-- Thought bubble -->
  <circle cx="310" cy="100" r="8" fill="white" opacity="0.8"/>
  <circle cx="325" cy="82" r="12" fill="white" opacity="0.8"/>
  <circle cx="343" cy="65" r="18" fill="white" opacity="0.9"/>
  <!-- Legs -->
  <rect x="155" y="375" width="35" height="100" rx="15" fill="#1E293B"/>
  <rect x="210" y="375" width="35" height="100" rx="15" fill="#1E293B"/>
  <!-- Feet -->
  <ellipse cx="172" cy="480" rx="28" ry="14" fill="#0F172A"/>
  <ellipse cx="228" cy="480" rx="28" ry="14" fill="#0F172A"/>
</g>`;

const UNDRAW_STYLE = `
<g>
  <!-- Accent shape -->
  <circle cx="200" cy="250" r="140" fill="#6C63FF" opacity="0.1"/>
  <!-- Body -->
  <path d="M 150 280 L 150 420 Q 200 440 250 420 L 250 280 Z" fill="#2F2E41"/>
  <path d="M 170 420 L 170 480 L 190 480 L 190 420 Z" fill="#2F2E41"/>
  <path d="M 210 420 L 210 480 L 230 480 L 230 420 Z" fill="#2F2E41"/>
  <!-- Head -->
  <circle cx="200" cy="150" r="35" fill="#FFB6A2"/>
  <!-- Hair -->
  <path d="M 160 140 Q 200 90 240 140 Q 220 180 200 130 Q 180 180 160 140 Z" fill="#2F2E41"/>
  <!-- Desk/Laptop -->
  <rect x="90" y="260" width="120" height="70" fill="#3F3D56" rx="8" transform="rotate(-10 150 295)"/>
  <rect x="100" y="270" width="100" height="50" fill="#E6E6E6" rx="4" transform="rotate(-10 150 295)"/>
  <!-- Arm -->
  <path d="M 230 200 C 260 250 220 300 150 300" stroke="#FFB6A2" stroke-width="14" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
</g>`;

const HUMAAANS_STYLE = `
<g>
  <!-- Humaaans style is usually sketchy, flat, exaggerated proportions -->
  <!-- Legs long -->
  <path d="M 210 300 C 240 380 220 450 250 480" stroke="#2F2E41" stroke-width="18" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  <path d="M 190 300 C 160 380 180 450 150 480" stroke="#2F2E41" stroke-width="18" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
  <!-- Body wide -->
  <path d="M 140 170 C 180 130 220 130 260 170 C 270 250 250 310 200 310 C 150 310 130 250 140 170 Z" fill="#F08A5D"/>
  <!-- Head small -->
  <circle cx="200" cy="100" r="28" fill="#F3E5AB"/>
  <!-- Hair abstract -->
  <path d="M 175 90 C 175 60 225 60 225 90 C 235 105 225 115 200 95 C 175 115 165 105 175 90 Z" fill="#333333"/>
  <!-- Arms -->
  <path d="M 150 190 C 100 220 100 280 130 310" stroke="#F3E5AB" stroke-width="14" fill="none" stroke-linecap="round"/>
  <path d="M 250 190 C 300 220 300 280 270 310" stroke="#F3E5AB" stroke-width="14" fill="none" stroke-linecap="round"/>
</g>`;

const SALY_3D_STYLE = `
<g>
  <!-- Simulating 3D with heavy gradients -->
  <defs>
    <radialGradient id="salyHead" cx="30%" cy="30%" r="70%">
      <stop offset="0%" stop-color="#FFD6A5"/>
      <stop offset="100%" stop-color="#E29578"/>
    </radialGradient>
    <linearGradient id="salyBody" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#8338EC"/>
      <stop offset="100%" stop-color="#3A0CA3"/>
    </linearGradient>
    <radialGradient id="salyHair" cx="20%" cy="20%" r="80%">
      <stop offset="0%" stop-color="#FF006E"/>
      <stop offset="100%" stop-color="#9D0208"/>
    </radialGradient>
  </defs>
  
  <!-- Shadow -->
  <ellipse cx="200" cy="480" rx="90" ry="15" fill="#000000" opacity="0.1"/>
  
  <!-- Body/Torso (cylinder-like) -->
  <rect x="140" y="210" width="120" height="170" rx="50" fill="url(#salyBody)"/>
  
  <!-- Head (sphere) -->
  <circle cx="200" cy="140" r="55" fill="url(#salyHead)"/>
  
  <!-- 3D Hair -->
  <circle cx="170" cy="90" r="35" fill="url(#salyHair)"/>
  <circle cx="220" cy="80" r="45" fill="url(#salyHair)"/>
  <circle cx="240" cy="130" r="25" fill="url(#salyHair)"/>
  
  <!-- Arms (tubes) -->
  <path d="M 150 240 C 90 270 100 350 140 360" stroke="url(#salyHead)" stroke-width="22" fill="none" stroke-linecap="round"/>
  <path d="M 250 240 C 310 270 300 350 260 360" stroke="url(#salyHead)" stroke-width="22" fill="none" stroke-linecap="round"/>
  
  <!-- Legs (tubes) -->
  <path d="M 175 360 L 175 460" stroke="#3A0CA3" stroke-width="26" fill="none" stroke-linecap="round"/>
  <path d="M 225 360 L 225 460" stroke="#3A0CA3" stroke-width="26" fill="none" stroke-linecap="round"/>
  <!-- Highlights -->
  <path d="M 145 230 Q 145 280 155 350" stroke="#FFFFFF" stroke-width="4" opacity="0.3" fill="none" stroke-linecap="round"/>
</g>`;

// ─── Avataaars / Circle Portraits ───────────────────────────────────────────

const AVATAR_HAPPY_1 = `
<g>
  <circle cx="200" cy="200" r="190" fill="#FDE68A"/>
  <!-- Shoulders -->
  <path d="M 60 380 Q 200 200 340 380 Z" fill="#4F46E5"/>
  <!-- Neck -->
  <rect x="175" y="260" width="50" height="50" rx="10" fill="#FDBA74"/>
  <!-- Head -->
  <circle cx="200" cy="180" r="100" fill="#FDBA74"/>
  <!-- Eyes -->
  <circle cx="160" cy="160" r="12" fill="#1e1b4b"/>
  <circle cx="240" cy="160" r="12" fill="#1e1b4b"/>
  <circle cx="163" cy="155" r="4" fill="white"/>
  <circle cx="243" cy="155" r="4" fill="white"/>
  <!-- Smile -->
  <path d="M 160 210 Q 200 250 240 210" stroke="#1e1b4b" stroke-width="6" fill="none" stroke-linecap="round"/>
  <!-- Hair -->
  <path d="M 100 160 C 100 80 300 80 300 160 Q 310 180 300 200 C 300 100 100 100 100 200 Q 90 180 100 160 Z" fill="#78350F"/>
</g>`;

const AVATAR_THINKING = `
<g>
  <circle cx="200" cy="200" r="190" fill="#A7F3D0"/>
  <!-- Shoulders -->
  <path d="M 60 380 Q 200 200 340 380 Z" fill="#059669"/>
  <!-- Neck -->
  <rect x="175" y="260" width="50" height="50" rx="10" fill="#FCA5A5"/>
  <!-- Head -->
  <circle cx="200" cy="180" r="100" fill="#FCA5A5"/>
  <!-- Eyes looking up -->
  <circle cx="165" cy="150" r="12" fill="#1e1b4b"/>
  <circle cx="245" cy="150" r="12" fill="#1e1b4b"/>
  <!-- Thinking mouth -->
  <circle cx="200" cy="220" r="10" fill="#1e1b4b"/>
  <!-- Hair -->
  <circle cx="200" cy="90" r="60" fill="#1e1b4b"/>
  <circle cx="150" cy="110" r="50" fill="#1e1b4b"/>
  <circle cx="250" cy="110" r="50" fill="#1e1b4b"/>
</g>`;

const DOODLE_WAVING = `
<g stroke="#1e1b4b" stroke-width="8" stroke-linecap="round" stroke-linejoin="round" fill="none">
  <!-- Body outline -->
  <rect x="120" y="200" width="160" height="200" rx="40" fill="#C4B5FD"/>
  <!-- Head -->
  <circle cx="200" cy="120" r="60" fill="#FCD34D"/>
  <!-- Face -->
  <path d="M 175 110 L 185 110" stroke-width="12"/>
  <path d="M 215 110 L 225 110" stroke-width="12"/>
  <path d="M 180 140 Q 200 160 220 140"/>
  <!-- Waving arm -->
  <path d="M 280 250 Q 350 200 320 120" fill="none"/>
  <circle cx="320" cy="120" r="20" fill="#FCD34D"/>
  <!-- Left arm -->
  <path d="M 120 250 Q 50 300 80 380"/>
  <!-- Legs -->
  <path d="M 160 400 L 160 480"/>
  <path d="M 240 400 L 240 480"/>
</g>`;

// ─── Character Database ───────────────────────────────────────────────────────



const BASE_CHARACTERS: Character[] = [
  {
    id: "alex",
    name: "Alex",
    category: "happy",
    library: "Open Peeps",
    description: "Friendly and approachable",
    poses: [
      {
        id: "standing",
        name: "Standing",
        svg: STANDING_HAPPY,
        viewBox: "0 0 400 500",
      },
    ],
  },
  {
    id: "maya",
    name: "Maya",
    category: "waving",
    library: "Open Peeps",
    description: "Cheerful and energetic",
    poses: [
      {
        id: "waving",
        name: "Waving",
        svg: WAVING_HAPPY,
        viewBox: "0 0 400 500",
      },
    ],
  },
  {
    id: "dev",
    name: "Dev",
    category: "working",
    library: "Open Peeps",
    description: "Focused developer at laptop",
    poses: [
      {
        id: "working",
        name: "Working",
        svg: SITTING_WORKING,
        viewBox: "0 0 400 460",
      },
    ],
  },
  {
    id: "celebrate",
    name: "Celebrate",
    category: "celebrating",
    library: "Open Peeps",
    description: "Victory pose with confetti",
    poses: [
      {
        id: "celebrating",
        name: "Celebrating",
        svg: CELEBRATING,
        viewBox: "0 0 400 500",
      },
    ],
  },
  {
    id: "thinker",
    name: "Thinker",
    category: "thinking",
    library: "Open Peeps",
    description: "Deep in thought",
    poses: [
      {
        id: "thinking",
        name: "Thinking",
        svg: THINKING,
        viewBox: "0 0 400 500",
      },
    ],
  },
  {
    id: "undraw-tech",
    name: "Modern Tech",
    category: "working",
    library: "Open Peeps",
    description: "Flat unDraw style illustration",
    poses: [
      {
        id: "working",
        name: "Working",
        svg: UNDRAW_STYLE,
        viewBox: "0 0 400 500",
      },
    ],
  },
  {
    id: "humaaan-casual",
    name: "Casual",
    category: "standing",
    library: "Open Peeps",
    description: "Humaaans style illustration",
    poses: [
      {
        id: "standing",
        name: "Standing",
        svg: HUMAAANS_STYLE,
        viewBox: "0 0 400 500",
      },
    ],
  },
  {
    id: "avataaar-happy",
    name: "Happy Portrait",
    category: "happy",
    description: "Avataaars style portrait",
    library: "Avataaars",
    poses: [
      {
        id: "standing",
        name: "Standing",
        svg: AVATAR_HAPPY_1,
        viewBox: "0 0 400 400",
      },
    ],
  },
  {
    id: "avataaar-thinking",
    name: "Thinking Portrait",
    category: "thinking",
    description: "Avataaars style thinking portrait",
    library: "Avataaars",
    poses: [
      {
        id: "thinking",
        name: "Thinking",
        svg: AVATAR_THINKING,
        viewBox: "0 0 400 400",
      },
    ],
  },
  {
    id: "doodle-waving",
    name: "Waving Doodle",
    category: "waving",
    description: "Hand-drawn doodle style",
    library: "Doodles & Sketches",
    poses: [
      {
        id: "waving",
        name: "Waving",
        svg: DOODLE_WAVING,
        viewBox: "0 0 400 500",
      },
    ],
  },
  {
    id: "saly-3d",
    name: "Saly 3D Character",
    category: "happy",
    description: "Vibrant 3D style character",
    library: "Open Peeps",
    poses: [
      {
        id: "standing",
        name: "Standing",
        svg: SALY_3D_STYLE,
        viewBox: "0 0 400 500",
      },
    ],
  },
];

const generatedCharacters: Character[] = [];

// 1. 3D Robots & Mascots (Bottts)
const ROBOT_NAMES = [
  "Optimus", "Bumblebee", "Titan", "Bolt", "Sparky", "Vortex", "Aura", "Nexus",
  "Echo", "Quantum", "Pulse", "Astro", "Zenith", "Cosmo", "Gizmo", "Volt",
  "Cyber", "Omega", "Atlas", "Vector", "Circuit", "Helix", "Nova", "Shadow"
];
ROBOT_NAMES.forEach((name, i) => {
  generatedCharacters.push({
    id: `bottts-${name.toLowerCase()}`,
    name: `${name} Bot`,
    category: i % 3 === 0 ? "happy" : i % 3 === 1 ? "celebrating" : "working",
    description: "3D Robot Mascot",
    library: "3D Mascots & Robots",
    poses: [{
      id: "bot",
      name: "Robot",
      svg: `https://api.dicebear.com/9.x/bottts/svg?seed=${name}&textureChance=100`,
      viewBox: "0 0 400 400"
    }]
  });
});

// 2. 3D Emojis & Expressions (Fun Emoji)
const EMOJI_NAMES = [
  "Joy", "Cool", "Surprise", "Love", "Wink", "Smile", "Party", "Rocket",
  "Star", "Fire", "Magic", "Glow", "Cheer", "Sun", "Dream", "Laugh",
  "Hero", "Cute", "Sparkle", "Zest", "Sunny", "Bliss", "Vibe", "Charm"
];
EMOJI_NAMES.forEach((name, i) => {
  generatedCharacters.push({
    id: `emoji-${name.toLowerCase()}`,
    name: `${name} Emoji`,
    category: i % 2 === 0 ? "happy" : "celebrating",
    description: "3D Fun Emoji Character",
    library: "3D Emojis",
    poses: [{
      id: "emoji",
      name: "Emoji",
      svg: `https://api.dicebear.com/9.x/fun-emoji/svg?seed=${name}`,
      viewBox: "0 0 400 400"
    }]
  });
});

// 3. 3D & Modern Avatars (Lorelei)
const AVATAR_NAMES = [
  "Mia", "Leo", "Sophia", "Lucas", "Emma", "Oliver", "Ava", "Ethan",
  "Isabella", "Liam", "Amelia", "Noah", "Harper", "Aiden", "Evelyn", "Jack",
  "Scarlett", "Henry", "Ella", "Benjamin", "Charlotte", "Mason", "Chloe", "Logan"
];
AVATAR_NAMES.forEach((name, i) => {
  generatedCharacters.push({
    id: `lorelei-${name.toLowerCase()}`,
    name,
    category: i % 4 === 0 ? "happy" : i % 4 === 1 ? "thinking" : i % 4 === 2 ? "standing" : "waving",
    description: "Modern Illustrated Avatar",
    library: "3D & Modern Avatars",
    poses: [{
      id: "avatar",
      name: "Avatar",
      svg: `https://api.dicebear.com/9.x/lorelei/svg?seed=${name}`,
      viewBox: "0 0 400 400"
    }]
  });
});

// 4. Avataaars
const AVATAAAR_NAMES = [
  "Alex", "Sam", "Jordan", "Taylor", "Morgan", "Riley", "Casey", "Cameron",
  "Dakota", "Reese", "Avery", "Quinn", "Skyler", "Jamie", "Rowan", "Kendall",
  "Payton", "Sage", "River", "Finley", "Hayden", "Emerson", "Peyton", "Adrian"
];
AVATAAAR_NAMES.forEach((name, i) => {
  generatedCharacters.push({
    id: `avataaar-${name.toLowerCase()}`,
    name,
    category: i % 3 === 0 ? "happy" : i % 3 === 1 ? "thinking" : "standing",
    description: "Avataaars style portrait",
    library: "Avataaars",
    poses: [{
      id: "portrait",
      name: "Portrait",
      svg: `https://api.dicebear.com/9.x/avataaars/svg?seed=${name}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffdfbf,ffd5dc`,
      viewBox: "0 0 400 400"
    }]
  });
});

// 5. Open Peeps
const PEEPS_NAMES = [
  "Felix", "Jasper", "Max", "Finn", "Milo", "Kai", "Nico", "Theo",
  "Ezra", "Silas", "Atticus", "Miles", "August", "Jonah", "Jude", "Declan",
  "Sawyer", "Emmett", "Rowen", "Arthur", "Oscar", "Felix", "Hugo", "Arlo"
];
PEEPS_NAMES.forEach((name, i) => {
  generatedCharacters.push({
    id: `open-peeps-${name.toLowerCase()}-${i}`,
    name,
    category: i % 4 === 0 ? "standing" : i % 4 === 1 ? "sitting" : i % 4 === 2 ? "waving" : "happy",
    description: "Hand-drawn Open Peeps style",
    library: "Open Peeps",
    poses: [{
      id: "peep",
      name: "Peep",
      svg: `https://api.dicebear.com/9.x/open-peeps/svg?seed=${name}`,
      viewBox: "0 0 400 500"
    }]
  });
});

// 6. Doodles & Sketches (Micah)
const DOODLE_NAMES = [
  "Aura", "Nova", "Pixel", "Prism", "Blaze", "Shadow", "Comet", "Orion",
  "Zen", "Vibe", "Matrix", "Echo", "Rhythm", "Solar", "Lunar", "Cosmos",
  "Flora", "Drift", "Spark", "Wave", "Flash", "Aero", "Glitch", "Pulse"
];
DOODLE_NAMES.forEach((name, i) => {
  generatedCharacters.push({
    id: `doodle-${name.toLowerCase()}`,
    name,
    category: i % 3 === 0 ? "happy" : i % 3 === 1 ? "celebrating" : "waving",
    description: "Modern vibrant doodle",
    library: "Doodles & Sketches",
    poses: [{
      id: "doodle",
      name: "Doodle",
      svg: `https://api.dicebear.com/9.x/micah/svg?seed=${name}&backgroundColor=f8f9fa,e9ecef,dee2e6`,
      viewBox: "0 0 400 400"
    }]
  });
});

export const CHARACTERS: Character[] = [
  ...BASE_CHARACTERS,
  ...generatedCharacters
];

/** Get character SVG as a full SVG string for rendering/export */
export function getCharacterSvgString(characterId: string, poseId: string): string {
  const char = CHARACTERS.find((c) => c.id === characterId);
  if (!char) return "";
  const pose = char.poses.find((p) => p.id === poseId);
  if (!pose) return "";
  if (pose.svg.startsWith("http")) return pose.svg;
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${pose.viewBox}" width="400" height="500">${pose.svg}</svg>`;
}

/** Get character as a data URL for use in canvas */
export async function getCharacterDataUrl(characterId: string, poseId: string): Promise<string> {
  let svgStr = getCharacterSvgString(characterId, poseId);
  if (!svgStr) return "";
  
  if (svgStr.startsWith("http")) {
    try {
      const res = await fetch(svgStr);
      svgStr = await res.text();
    } catch (e) {
      console.error(e);
      return "";
    }
  }

  const blob = new Blob([svgStr], { type: "image/svg+xml" });
  return URL.createObjectURL(blob);
}
