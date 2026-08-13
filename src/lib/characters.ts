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

// ─── Character Library ─────────────────────────────────────────────────────────

export const CHARACTERS: Character[] = [
  {
    id: "alex",
    name: "Alex",
    category: "happy",
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
];

/** Get character SVG as a full SVG string for rendering/export */
export function getCharacterSvgString(characterId: string, poseId: string): string {
  const char = CHARACTERS.find((c) => c.id === characterId);
  if (!char) return "";
  const pose = char.poses.find((p) => p.id === poseId);
  if (!pose) return "";
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${pose.viewBox}" width="400" height="500">${pose.svg}</svg>`;
}

/** Get character as a data URL for use in canvas */
export async function getCharacterDataUrl(characterId: string, poseId: string): Promise<string> {
  const svgStr = getCharacterSvgString(characterId, poseId);
  if (!svgStr) return "";
  const blob = new Blob([svgStr], { type: "image/svg+xml" });
  return URL.createObjectURL(blob);
}
