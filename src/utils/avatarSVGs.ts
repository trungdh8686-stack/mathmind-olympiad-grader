// High quality inline SVGs for Ruby, Lisa, Chip, Tony, and Admin
// Thiết kế đúng yêu cầu của Sếp:
// - Ruby: Bé gái, tóc đuôi gà (ponytail), da tự nhiên
// - Lisa: Bé gái, tóc buộc 2 bên / bím gọn gàng, da tự nhiên
// - Chip: Bé gái, thả tóc dài tự nhiên, da tự nhiên
// - Tony: Bé trai, tóc ngắn năng động, da tự nhiên
// - Không ai da đen, màu da tự nhiên ấm áp, tươi tắn.

function encodeSvg(svg: string): string {
  return `data:image/svg+xml;utf8,${encodeURIComponent(svg)}`;
}

// 1. Ruby - Bé gái tóc đuôi gà (Ponytail)
export const RUBY_AVATAR = encodeSvg(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="120" height="120">
  <defs>
    <linearGradient id="bgRuby" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#FFE4E6"/>
      <stop offset="100%" stop-color="#FBCFE8"/>
    </linearGradient>
    <linearGradient id="skin" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#FDE2D0"/>
      <stop offset="100%" stop-color="#F8CBB0"/>
    </linearGradient>
    <linearGradient id="hairDark" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#3A2820"/>
      <stop offset="100%" stop-color="#241711"/>
    </linearGradient>
  </defs>
  <rect width="120" height="120" rx="32" fill="url(#bgRuby)"/>
  
  <!-- Ponytail (Tóc đuôi gà vểnh cao sang phải) -->
  <path d="M72 42 C88 28, 102 36, 102 54 C102 68, 86 78, 76 74 C80 62, 78 50, 72 42 Z" fill="url(#hairDark)"/>
  <!-- Nơ buộc tóc màu hồng -->
  <circle cx="76" cy="45" r="6" fill="#F43F5E"/>
  <polygon points="76,45 84,40 82,50" fill="#FB7185"/>

  <!-- Thân áo -->
  <path d="M36 104 C36 86, 84 86, 84 104 Z" fill="#FB7185"/>
  <path d="M50 86 L60 96 L70 86 Z" fill="#FFF"/>

  <!-- Cổ & Khuôn mặt -->
  <rect x="54" y="74" width="12" height="14" fill="url(#skin)" rx="3"/>
  <ellipse cx="60" cy="58" rx="22" ry="24" fill="url(#skin)"/>

  <!-- Tóc mái & Tóc ôm mặt -->
  <path d="M38 52 C38 34, 82 34, 82 52 C78 44, 70 42, 60 42 C50 42, 42 46, 38 52 Z" fill="url(#hairDark)"/>
  <path d="M38 50 C36 62, 38 72, 42 76 C40 68, 40 56, 42 50 Z" fill="url(#hairDark)"/>
  <path d="M82 50 C84 62, 82 72, 78 76 C80 68, 80 56, 78 50 Z" fill="url(#hairDark)"/>

  <!-- Mắt to tròn long lanh -->
  <ellipse cx="50" cy="58" rx="3.5" ry="4.5" fill="#1E293B"/>
  <circle cx="51.5" cy="56.5" r="1.5" fill="#FFF"/>
  <ellipse cx="70" cy="58" rx="3.5" ry="4.5" fill="#1E293B"/>
  <circle cx="71.5" cy="56.5" r="1.5" fill="#FFF"/>

  <!-- Lông mày nhẹ -->
  <path d="M46 51 Q50 49 54 51" stroke="#4A3525" stroke-width="1.5" fill="none" stroke-linecap="round"/>
  <path d="M66 51 Q70 49 74 51" stroke="#4A3525" stroke-width="1.5" fill="none" stroke-linecap="round"/>

  <!-- Má hồng đáng yêu -->
  <circle cx="45" cy="65" r="4.5" fill="#F43F5E" opacity="0.25"/>
  <circle cx="75" cy="65" r="4.5" fill="#F43F5E" opacity="0.25"/>

  <!-- Nụ cười tươi -->
  <path d="M54 67 Q60 73 66 67" stroke="#BE123C" stroke-width="2" fill="none" stroke-linecap="round"/>
</svg>
`);

// 2. Lisa - Bé gái tóc buộc gọn 2 bên (Tied hair / Buns)
export const LISA_AVATAR = encodeSvg(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="120" height="120">
  <defs>
    <linearGradient id="bgLisa" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#E0E7FF"/>
      <stop offset="100%" stop-color="#C7D2FE"/>
    </linearGradient>
    <linearGradient id="skin" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#FDE2D0"/>
      <stop offset="100%" stop-color="#F8CBB0"/>
    </linearGradient>
    <linearGradient id="hairLisa" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#2D2118"/>
      <stop offset="100%" stop-color="#1B130E"/>
    </linearGradient>
  </defs>
  <rect width="120" height="120" rx="32" fill="url(#bgLisa)"/>

  <!-- 2 búi tóc buộc cao 2 bên (Cute twin buns) -->
  <circle cx="34" cy="38" r="11" fill="url(#hairLisa)"/>
  <circle cx="34" cy="46" r="4" fill="#6366F1"/>
  <circle cx="86" cy="38" r="11" fill="url(#hairLisa)"/>
  <circle cx="86" cy="46" r="4" fill="#6366F1"/>

  <!-- Thân áo -->
  <path d="M36 104 C36 86, 84 86, 84 104 Z" fill="#6366F1"/>
  <circle cx="60" cy="94" r="3" fill="#FFF"/>

  <!-- Cổ & Khuôn mặt -->
  <rect x="54" y="74" width="12" height="14" fill="url(#skin)" rx="3"/>
  <ellipse cx="60" cy="58" rx="22" ry="24" fill="url(#skin)"/>

  <!-- Tóc mái ngố nhẹ nhàng -->
  <path d="M38 52 C38 34, 82 34, 82 52 C76 45, 68 44, 60 44 C52 44, 44 45, 38 52 Z" fill="url(#hairLisa)"/>
  <path d="M38 50 C37 60, 40 68, 42 70" stroke="url(#hairLisa)" stroke-width="4" fill="none" stroke-linecap="round"/>
  <path d="M82 50 C83 60, 80 68, 78 70" stroke="url(#hairLisa)" stroke-width="4" fill="none" stroke-linecap="round"/>

  <!-- Mắt thông minh, sáng ngời -->
  <ellipse cx="50" cy="58" rx="3.5" ry="4.5" fill="#1E293B"/>
  <circle cx="51.5" cy="56.5" r="1.5" fill="#FFF"/>
  <ellipse cx="70" cy="58" rx="3.5" ry="4.5" fill="#1E293B"/>
  <circle cx="71.5" cy="56.5" r="1.5" fill="#FFF"/>

  <!-- Lông mày -->
  <path d="M46 51 Q50 49 54 51" stroke="#4A3525" stroke-width="1.5" fill="none" stroke-linecap="round"/>
  <path d="M66 51 Q70 49 74 51" stroke="#4A3525" stroke-width="1.5" fill="none" stroke-linecap="round"/>

  <!-- Má hồng -->
  <circle cx="45" cy="65" r="4" fill="#F43F5E" opacity="0.25"/>
  <circle cx="75" cy="65" r="4" fill="#F43F5E" opacity="0.25"/>

  <!-- Nụ cười mỉm duyên dáng -->
  <path d="M54 68 Q60 73 66 68" stroke="#4338CA" stroke-width="2" fill="none" stroke-linecap="round"/>
</svg>
`);

// 3. Chip - Bé gái tóc dài buông xõa tự nhiên (Loose long hair)
export const CHIP_AVATAR = encodeSvg(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="120" height="120">
  <defs>
    <linearGradient id="bgChip" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#FEF3C7"/>
      <stop offset="100%" stop-color="#FDE68A"/>
    </linearGradient>
    <linearGradient id="skin" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#FDE2D0"/>
      <stop offset="100%" stop-color="#F8CBB0"/>
    </linearGradient>
    <linearGradient id="hairChip" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#362217"/>
      <stop offset="100%" stop-color="#1F120B"/>
    </linearGradient>
  </defs>
  <rect width="120" height="120" rx="32" fill="url(#bgChip)"/>

  <!-- Tóc dài buông xõa hai bên vai phía sau -->
  <path d="M34 50 C30 70, 30 88, 38 104 C44 94, 46 80, 44 65 Z" fill="url(#hairChip)"/>
  <path d="M86 50 C90 70, 90 88, 82 104 C76 94, 74 80, 76 65 Z" fill="url(#hairChip)"/>

  <!-- Thân áo điệu đà -->
  <path d="M36 104 C36 86, 84 86, 84 104 Z" fill="#F59E0B"/>
  <circle cx="60" cy="95" r="3" fill="#FFF"/>

  <!-- Cổ & Khuôn mặt -->
  <rect x="54" y="74" width="12" height="14" fill="url(#skin)" rx="3"/>
  <ellipse cx="60" cy="58" rx="22" ry="24" fill="url(#skin)"/>

  <!-- Tóc bồng bềnh thả tự nhiên phía trước -->
  <path d="M38 52 C38 34, 82 34, 82 52 C84 66, 84 82, 80 94 C76 80, 78 60, 76 52 C68 44, 52 44, 44 52 C42 60, 44 80, 40 94 C36 82, 36 66, 38 52 Z" fill="url(#hairChip)"/>

  <!-- Cài tóc hình ngôi sao nhỏ -->
  <polygon points="44,40 46,44 50,44 47,47 48,51 44,48 40,51 41,47 38,44 42,44" fill="#FBBF24"/>

  <!-- Mắt trong veo đáng yêu -->
  <ellipse cx="50" cy="58" rx="3.5" ry="4.5" fill="#1E293B"/>
  <circle cx="51.5" cy="56.5" r="1.5" fill="#FFF"/>
  <ellipse cx="70" cy="58" rx="3.5" ry="4.5" fill="#1E293B"/>
  <circle cx="71.5" cy="56.5" r="1.5" fill="#FFF"/>

  <!-- Má hồng cam đào -->
  <circle cx="45" cy="65" r="4.5" fill="#F59E0B" opacity="0.3"/>
  <circle cx="75" cy="65" r="4.5" fill="#F59E0B" opacity="0.3"/>

  <!-- Miệng cười chúm chím -->
  <path d="M55 67 Q60 72 65 67" stroke="#D97706" stroke-width="2" fill="none" stroke-linecap="round"/>
</svg>
`);

// 4. Tony - Bé trai tóc ngắn năng động (Short hair boy)
export const TONY_AVATAR = encodeSvg(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="120" height="120">
  <defs>
    <linearGradient id="bgTony" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#DBEAFE"/>
      <stop offset="100%" stop-color="#BFDBFE"/>
    </linearGradient>
    <linearGradient id="skin" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#FDE2D0"/>
      <stop offset="100%" stop-color="#F8CBB0"/>
    </linearGradient>
    <linearGradient id="hairTony" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#262626"/>
      <stop offset="100%" stop-color="#171717"/>
    </linearGradient>
  </defs>
  <rect width="120" height="120" rx="32" fill="url(#bgTony)"/>

  <!-- Thân áo hoodie / polo nam tính -->
  <path d="M34 104 C34 84, 86 84, 86 104 Z" fill="#2563EB"/>
  <path d="M52 86 L60 98 L68 86 Z" fill="#93C5FD"/>

  <!-- Cổ & Khuôn mặt bé trai tròn trĩnh khỏe khoắn -->
  <rect x="54" y="74" width="12" height="14" fill="url(#skin)" rx="3"/>
  <ellipse cx="60" cy="58" rx="22" ry="24" fill="url(#skin)"/>

  <!-- Tai bé trai -->
  <circle cx="37" cy="58" r="5" fill="url(#skin)"/>
  <circle cx="83" cy="58" r="5" fill="url(#skin)"/>

  <!-- Tóc ngắn vuốt nhẹ năng động phía trước -->
  <path d="M37 54 C36 34, 84 34, 83 54 C80 44, 76 38, 68 36 C64 32, 56 32, 52 36 C44 38, 40 44, 37 54 Z" fill="url(#hairTony)"/>
  <path d="M42 46 L48 40 L54 44 L60 38 L66 44 L72 40 L78 46" fill="url(#hairTony)"/>

  <!-- Mắt lanh lợi, sáng sủa -->
  <ellipse cx="50" cy="58" rx="3.5" ry="4.5" fill="#1E293B"/>
  <circle cx="51.5" cy="56.5" r="1.5" fill="#FFF"/>
  <ellipse cx="70" cy="58" rx="3.5" ry="4.5" fill="#1E293B"/>
  <circle cx="71.5" cy="56.5" r="1.5" fill="#FFF"/>

  <!-- Lông mày khỏe khoắn -->
  <path d="M45 50 Q50 48 55 51" stroke="#262626" stroke-width="2" fill="none" stroke-linecap="round"/>
  <path d="M65 51 Q70 48 75 50" stroke="#262626" stroke-width="2" fill="none" stroke-linecap="round"/>

  <!-- Nụ cười tự tin rạng rỡ -->
  <path d="M52 68 Q60 75 68 68" stroke="#1D4ED8" stroke-width="2.5" fill="none" stroke-linecap="round"/>
</svg>
`);

// 5. Admin - Quản trị viên Sếp
export const ADMIN_AVATAR = encodeSvg(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 120 120" width="120" height="120">
  <defs>
    <linearGradient id="bgAdmin" x1="0" y1="0" x2="1" y2="1">
      <stop offset="0%" stop-color="#1E1B4B"/>
      <stop offset="100%" stop-color="#312E81"/>
    </linearGradient>
    <linearGradient id="skin" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0%" stop-color="#FDE2D0"/>
      <stop offset="100%" stop-color="#F8CBB0"/>
    </linearGradient>
  </defs>
  <rect width="120" height="120" rx="32" fill="url(#bgAdmin)"/>

  <!-- Thân áo vest lịch lãm -->
  <path d="M34 104 C34 84, 86 84, 86 104 Z" fill="#0F172A"/>
  <polygon points="60,86 52,104 68,104" fill="#FFF"/>
  <polygon points="58,92 62,92 60,102" fill="#E11D48"/>

  <!-- Cổ & Mặt -->
  <rect x="54" y="72" width="12" height="16" fill="url(#skin)" rx="3"/>
  <ellipse cx="60" cy="56" rx="21" ry="23" fill="url(#skin)"/>

  <!-- Tóc rẽ ngôi lịch sự -->
  <path d="M38 50 C37 32, 83 32, 82 50 C80 40, 72 36, 60 36 C48 36, 40 40, 38 50 Z" fill="#1F2937"/>

  <!-- Vương miện nhỏ màu vàng tượng trưng Admin tối cao -->
  <polygon points="52,32 55,24 60,29 65,24 68,32" fill="#FBBF24"/>
  <circle cx="60" cy="23" r="1.5" fill="#F59E0B"/>

  <!-- Mắt & Kính tri thức -->
  <circle cx="50" cy="56" r="3" fill="#1E293B"/>
  <circle cx="70" cy="56" r="3" fill="#1E293B"/>
  <rect x="44" y="50" width="13" height="11" rx="3" stroke="#475569" stroke-width="1.5" fill="none"/>
  <rect x="63" y="50" width="13" height="11" rx="3" stroke="#475569" stroke-width="1.5" fill="none"/>
  <line x1="57" y1="55" x2="63" y2="55" stroke="#475569" stroke-width="1.5"/>

  <!-- Nụ cười đĩnh đạc -->
  <path d="M54 67 Q60 71 66 67" stroke="#334155" stroke-width="2" fill="none" stroke-linecap="round"/>
</svg>
`);
