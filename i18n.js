"use strict";
const translations = {
  vi: {
    skip: "Đến nội dung chính",
    "loading.message": "Một chút chờ đợi, một ngày thật thương.",
    "loading.status": "Đang chuẩn bị thiệp mời…",
    "nav.invitation": "Lời mời",
    "nav.timeline": "Ngày hôm ấy",
    "nav.gallery": "Khoảnh khắc",
    "nav.venue": "Địa điểm",
    "nav.rsvp":
      'Xác nhận tham dự <span><svg class="inline-icon" aria-hidden="true" focusable="false"><use href="#arrow-up-right"></use></svg></span>',
    "nav.rsvpMobile": "Xác nhận tham dự",
    "hero.tagline": "Một ngày chung đôi.<br>\n            Một đời bên nhau.",
    "date.saturday": "THỨ BẢY",
    "hero.date": "07 <i>·</i> 11 <i>·</i> 2026",
    "hero.invite":
      'Trân trọng kính mời\n            <svg class="icon"><use href="#arrow"></use></svg>',
    "hero.scroll":
      '<span><svg class="inline-icon" aria-hidden="true" focusable="false"><use href="#arrow-down"></use></svg></span> MỘT LỜI MỜI, GỬI TỪ TRÁI TIM',
    "ribbon.lifetime": "MỘT ĐỜI BÊN NHAU",
    "invitation.title": "Một lời mời,<br><em>thật nhiều thương.</em>",
    "invitation.story":
      "Giữa những ngày bình thường, chúng mình tìm thấy một người để cùng\n              đi qua những điều đặc biệt.",
    "invitation.message":
      "Trân trọng kính mời đến chung vui cùng gia đình chúng tôi. Mong\n              được cùng những người thân yêu lưu lại những kỷ niệm thật đẹp.",
    "family.groom": "NHÀ TRAI",
    "family.bride": "NHÀ GÁI",
    "family.groomNames": "Ông Nguyễn Thành Đô<br>Bà Nguyễn Diệu Hương Ly",
    "family.brideNames": "Ông Nguyễn Mạnh Hùng<br>Bà Nguyễn Thu Hương",
    "invitation.label": "TRÂN TRỌNG KÍNH MỜI",
    "invitation.guest": "Khách quý",
    "invitation.note":
      "Đến chung vui cùng hai gia đình chúng tôi trong ngày cưới của",
    "invitation.date": "07.11.2026",
    "invitation.arrival": "ĐÓN KHÁCH TỪ 17H15",
    "invitation.lunar": "Ngày 29 tháng 09 năm Bính Ngọ",
    "invitation.hotel": "KHÁCH SẠN HÀ NỘI DAEWOO",
    "invitation.address":
      "Khu bể bơi Serenity ngoài trời · Tầng 1<br>360 Kim Mã, Giảng\n                Võ, Hà Nội",
    "countdown.title": "Đếm những ngày <em>được có nhau.</em>",
    "countdown.days": "NGÀY",
    "countdown.hours": "GIỜ",
    "countdown.minutes": "PHÚT",
    "countdown.seconds": "GIÂY",
    "timeline.title": "Ngày hôm ấy<br><em>có gì?</em>",
    "timeline.intro":
      "Một buổi chiều dịu dàng.<br>Một buổi tối đầy yêu thương.",
    "timeline.time1": "15<span>h</span>",
    "timeline.time2": "17<span>h</span>15<small>— 17h30</small>",
    "timeline.time3": "18<span>h</span>",
    "timeline.time4": "19<span>h</span>",
    "timeline.time5": "19<span>h</span>30",
    "timeline.event1": "Lễ thân mật cùng gia đình",
    "timeline.event2": "Đón khách tiệc cưới",
    "timeline.event3": "Nghi lễ đính hôn",
    "timeline.event4": "Cô dâu chú rể khiêu vũ",
    "timeline.event5": "Giao lưu và tung hoa",
    "timeline.detail1": "Khoảnh khắc ấm áp bên những người thân yêu.",
    "timeline.detail2": "Đón khách và cùng lưu lại những khoảnh khắc đẹp.",
    "timeline.detail3": "Cùng chứng kiến lời hẹn ước của chúng mình.",
    "timeline.detail4": "Một điệu nhảy, mở đầu cho những ngày có nhau.",
    "timeline.detail5": "Thêm tiếng cười, thêm một chút may mắn.",
    "gallery.title": "Những ngày <em>có đôi.</em>",
    "gallery.intro": "Có nắng, có gió.<br>Và lúc nào cũng có nhau.",
    "gallery.label1":
      '01 <i>Những ngày xanh</i> <svg class="inline-icon" aria-hidden="true" focusable="false"><use href="#arrow-up-right"></use></svg>',
    "gallery.label2":
      '02 <i>Một lời hẹn</i> <svg class="inline-icon" aria-hidden="true" focusable="false"><use href="#arrow-up-right"></use></svg>',
    "gallery.label3":
      '03 <i>Bình yên là đây</i> <svg class="inline-icon" aria-hidden="true" focusable="false"><use href="#arrow-up-right"></use></svg>',
    "gallery.label4":
      '04 <i>Điều nhỏ bé</i> <svg class="inline-icon" aria-hidden="true" focusable="false"><use href="#arrow-up-right"></use></svg>',
    "gallery.label5":
      '05 <i>Dưới cùng bầu trời</i> <svg class="inline-icon" aria-hidden="true" focusable="false"><use href="#arrow-up-right"></use></svg>',
    "gallery.label6":
      '06 <i>Đường về có nhau</i> <svg class="inline-icon" aria-hidden="true" focusable="false"><use href="#arrow-up-right"></use></svg>',
    "venue.title": "Hẹn gặp tại<br><em>khu vườn hạnh phúc.</em>",
    "venue.hotel": "Hà Nội Daewoo Hotel",
    "venue.space": "Khu bể bơi Serenity ngoài trời · Tầng 1",
    "venue.address":
      '<svg class="icon"><use href="#pin"></use></svg> 360 Kim Mã, Giảng Võ,\n              Hà Nội',
    "venue.time":
      '<svg class="icon"><use href="#calendar"></use></svg> Thứ Bảy,\n              07.11.2026 · Đón khách 17h15–17h30',
    "venue.directions":
      'Chỉ đường đến đây\n                <svg class="icon"><use href="#arrow"></use></svg>',
    "venue.calendar":
      'Lưu ngày vào lịch <span><svg class="inline-icon" aria-hidden="true" focusable="false"><use href="#arrow-up-right"></use></svg></span>',
    "venue.map":
      'Xem sơ đồ lối vào khách sạn <span><svg class="inline-icon" aria-hidden="true" focusable="false"><use href="#arrow-up-right"></use></svg></span>',
    "dress.title":
      "Cùng chung vui,<br>\n            <em>trong sắc màu yêu thương.</em>",
    "dress.description":
      "Trang phục lịch sự. Càng nhiều màu sắc, càng đẹp cho một khu vườn\n            tiệc cưới.",
    "dress.note": "Màu trắng, be và kem xin dành riêng cho cô dâu nhé.",
    "rsvp.title": "Ngày vui trọn vẹn,<br><em>bên người thân yêu.</em>",
    "rsvp.honor":
      "Sự hiện diện của quý vị là niềm vinh hạnh cho gia đình chúng tôi.",
    "rsvp.intro":
      "Mong nhận được lời xác nhận tham dự để gia đình chuẩn bị đón tiếp\n              chu đáo. Trân trọng cảm ơn những tình cảm và lời chúc dành cho Ly\n              &amp; Ngọc.",
    "rsvp.nojs":
      'Mở phiếu xác nhận tham dự <svg class="inline-icon" aria-hidden="true" focusable="false"><use href="#arrow-up-right"></use></svg>',
    "rsvp.eyebrow": "LỜI NHẮN DÀNH CHO CHÚNG MÌNH",
    "rsvp.name": "Họ và tên",
    "rsvp.side": "Bạn là:",
    "rsvp.brideGuest": "Khách nhà gái",
    "rsvp.groomGuest": "Khách nhà trai",
    "rsvp.attendance": "Xác nhận tham dự",
    "rsvp.yes": "Sẽ tham dự",
    "rsvp.no": "Không thể tham dự",
    "rsvp.guests": "Số người tham dự",
    "rsvp.guest1": "01 người",
    "rsvp.guest2": "02 người",
    "rsvp.guest3": "03 người",
    "rsvp.guest4": "04 người",
    "rsvp.guest5": "05 người",
    "rsvp.wish": "Gửi một chút yêu thương",
    "rsvp.submit":
      'Gửi xác nhận <svg class="icon"><use href="#arrow"></use></svg>',
    "rsvp.thanks": "Cảm ơn những tình cảm và lời chúc dành cho Ly &amp; Ngọc.",
    "gifts.title": "Hộp <em>mừng cưới.</em>",
    "gifts.intro": "Trân trọng cảm ơn những tình cảm dành cho Ly &amp; Ngọc.",
    "gifts.bride": "Nhà gái",
    "gifts.groom": "Nhà trai",
    "gifts.openBride": "Xem ảnh QR nhà gái — Nguyễn Hương Ly",
    "gifts.openGroom": "Xem ảnh QR nhà trai — Nguyễn Thế Ngọc",
    "gifts.altBride": "Mã QR mừng cưới nhà gái — Nguyễn Hương Ly, TPBank",
    "gifts.altGroom": "Mã QR mừng cưới nhà trai — Nguyễn Thế Ngọc, TPBank",
    "gifts.saveBride": "Lưu QR nhà gái",
    "gifts.saveGroom": "Lưu QR nhà trai",
    "rsvp.support":
      'Mở biểu mẫu nếu cần hỗ trợ <svg class="inline-icon" aria-hidden="true" focusable="false"><use href="#arrow-up-right"></use></svg>',
    "footer.message":
      "Sự hiện diện của quý vị là niềm vinh hạnh cho gia đình chúng tôi.",
    "credits.open":
      'Ảnh &amp; âm nhạc <svg class="inline-icon" aria-hidden="true" focusable="false"><use href="#arrow-up-right"></use></svg>',
    "credits.title": "Ảnh &amp; âm nhạc",
    "credits.photo": "Ảnh cưới: XOÀI STUDIO · Ly &amp; Ngọc.",
    "credits.music": "Nhạc nền: “Giải cứu thế giới” · Full Demo.",
    "credits.listen":
      'Nghe bản nhạc trên YouTube <svg class="inline-icon" aria-hidden="true" focusable="false"><use href="#arrow-up-right"></use></svg>',
    "credits.art": "Monogram và minh họa: từ thiệp cưới của Ly &amp; Ngọc.",
    "a11y.brand": "Thế Ngọc và Hương Ly, đầu trang",
    "a11y.nav": "Điều hướng chính",
    "a11y.mobileNav": "Điều hướng điện thoại",
    "a11y.hero": "Những khoảnh khắc của Hương Ly và Thế Ngọc",
    "alt.cover": "Thế Ngọc và Hương Ly sánh đôi dưới tán cây",
    "alt.sky": "Hai người nắm tay giữa đồng cỏ dưới bầu trời xanh",
    "alt.hotel": "Hình vẽ khách sạn Hà Nội Daewoo từ thiệp cưới",
    "a11y.countdown": "Thời gian còn lại đến tiệc cưới",
    "alt.venue":
      "Minh họa khu vườn và hồ nước tại Hà Nội Daewoo, lấy từ mockup thiệp",
    "a11y.swatches": "Gợi ý màu xanh navy, xanh lam, xanh olive, hồng và vàng",
    "rsvp.namePlaceholder": "Vui lòng nhập họ và tên",
    "rsvp.wishPlaceholder": "Lời chúc dành cho cô dâu chú rể…",
    "rsvp.receiptTitle": "Kết quả xác nhận tham dự từ Google Forms",
    "alt.closing": "Đồng cỏ dịu nắng, một khoảnh khắc trong album cưới",
    "a11y.lightbox": "Album ảnh cưới",
    "a11y.closePhoto": "Đóng ảnh",
    "a11y.prev": "Ảnh trước",
    "a11y.next": "Ảnh tiếp theo",
    "a11y.map": "Sơ đồ lối vào khách sạn Daewoo",
    "a11y.closeMap": "Đóng sơ đồ",
    "alt.map":
      "Sơ đồ lối vào Hà Nội Daewoo từ đường Kim Mã, vị trí đỗ ô tô và xe máy theo thiệp mời",
    "a11y.closeCredits": "Đóng thông tin",
    "gallery.caption1": "Có nhau, giữa một ngày xanh.",
    "gallery.alt1": "Hương Ly và Thế Ngọc bên nhau dưới khăn voan",
    "gallery.open1": "Xem ảnh Hương Ly và Thế Ngọc dưới khăn voan",
    "gallery.caption2": "Nắm tay nhau, qua những ngày bình thường.",
    "gallery.alt2": "Đôi bàn tay nắm chặt giữa nắng và tán cây",
    "gallery.open2": "Xem ảnh đôi bàn tay",
    "gallery.caption3": "Một chút gió, một đời thương.",
    "gallery.alt3": "Thế Ngọc ôm Hương Ly trong chiếc váy xanh giữa đồng cỏ",
    "gallery.open3": "Xem ảnh hai người ôm nhau trên đồng cỏ",
    "gallery.caption4": "Từng điều nhỏ, đều trở nên đặc biệt.",
    "gallery.alt4": "Cận cảnh bó hoa và trang phục cưới của hai người",
    "gallery.open4": "Xem ảnh bó hoa cưới",
    "gallery.caption5": "Bên nhau, dưới cùng một bầu trời.",
    "gallery.alt5": "Hương Ly và Thế Ngọc nắm tay dưới bầu trời xanh rộng mở",
    "gallery.open5": "Xem ảnh nắm tay dưới bầu trời xanh",
    "gallery.caption6": "Đường về có nhau.",
    "gallery.alt6": "Hương Ly trong váy cưới trên lối vườn ngập nắng",
    "gallery.open6": "Xem ảnh Hương Ly trên lối vườn",
    "page.title": "Thế Ngọc & Hương Ly — 07.11.2026",
    "language.label": "Chọn ngôn ngữ",
    "menu.open": "Mở menu",
    "menu.close": "Đóng menu",
    "music.play": "Bật nhạc Giải cứu thế giới",
    "music.pause": "Tạm dừng nhạc Giải cứu thế giới",
    "music.error": "Nhạc chưa tải được · chạm để thử lại",
    "music.blocked": "Chạm vào thiệp để nhạc vang lên",
    "music.paused": "Đã tạm dừng · chạm để nghe tiếp",
    "countdown.arrived": "Ngày chung đôi đã đến.",
    "calendar.title": "Lễ cưới Thế Ngọc & Hương Ly",
    "calendar.location":
      "Khu bể bơi Serenity, tầng 1, Khách sạn Hà Nội Daewoo, 360 Kim Mã, Giảng Võ, Hà Nội",
    "calendar.description":
      "15h: Lễ thân mật cùng gia đình. 17h15–17h30: Đón khách tiệc cưới. 18h: Nghi lễ đính hôn. 19h: Cô dâu chú rể khiêu vũ. 19h30: Giao lưu và tung hoa.",
    "calendar.reminder": "Ngày mai hẹn gặp Ly và Ngọc!",
    "calendar.saved": "Mở tệp lịch vừa tải để lưu ngày hẹn của chúng mình nhé.",
    "rsvp.unavailable": "Phiếu xác nhận chưa sẵn sàng. Vui lòng thử lại sau.",
    "rsvp.requiredName": "Vui lòng nhập họ và tên.",
    "rsvp.requiredSide": "Vui lòng chọn khách nhà gái hoặc khách nhà trai.",
    "rsvp.offline":
      "Chưa có kết nối mạng. Thông tin vẫn được giữ trong form; vui lòng thử lại khi có mạng.",
    "rsvp.sending": "Đang gửi xác nhận…",
    "rsvp.result": "Vui lòng xem kết quả gửi ở khung bên dưới.",
    "rsvp.timeout":
      "Chưa hiển thị được kết quả. Vui lòng kiểm tra khung bên dưới trước khi gửi lại.",
  },
  en: {
    skip: "Skip to main content",
    "loading.message": "A little moment, a day full of love.",
    "loading.status": "Preparing your invitation…",
    "nav.invitation": "Invitation",
    "nav.timeline": "Our day",
    "nav.gallery": "Our moments",
    "nav.venue": "Venue",
    "nav.rsvp":
      'RSVP <span><svg class="inline-icon" aria-hidden="true" focusable="false"><use href="#arrow-up-right"></use></svg></span>',
    "nav.rsvpMobile": "RSVP",
    "hero.tagline": "One beautiful day.<br /> A lifetime together.",
    "date.saturday": "SATURDAY",
    "hero.date": "07 <i>·</i> NOV <i>·</i> 2026",
    "hero.invite":
      'You are warmly invited <svg class="icon"><use href="#arrow" /></svg>',
    "hero.scroll":
      '<span><svg class="inline-icon" aria-hidden="true" focusable="false"><use href="#arrow-down"></use></svg></span> AN INVITATION FROM THE HEART',
    "ribbon.lifetime": "A LIFETIME TOGETHER",
    "invitation.title": "An invitation,<br /><em>with all our love.</em>",
    "invitation.story":
      "In the midst of ordinary days, we found someone to share life’s extraordinary moments with.",
    "invitation.message":
      "Together with our families, we warmly invite our loved ones to celebrate our wedding and make beautiful memories with us.",
    "family.groom": "GROOM’S FAMILY",
    "family.bride": "BRIDE’S FAMILY",
    "family.groomNames": "Mr. Nguyễn Thành Đô<br />Mrs. Nguyễn Diệu Hương Ly",
    "family.brideNames": "Mr. Nguyễn Mạnh Hùng<br />Mrs. Nguyễn Thu Hương",
    "invitation.label": "TOGETHER WITH OUR FAMILIES",
    "invitation.guest": "Our honoured guests",
    "invitation.note": "Join our two families in celebrating the wedding of",
    "invitation.date": "07 NOV 2026",
    "invitation.arrival": "GUEST ARRIVAL FROM 5:15 PM",
    "invitation.lunar": "29th day of the 9th lunar month · Year of the Horse",
    "invitation.hotel": "HANOI DAEWOO HOTEL",
    "invitation.address":
      "Serenity outdoor pool · Level 1<br />360 Kim Mã, Giảng Võ, Hanoi",
    "countdown.title": "Counting down <em>to forever.</em>",
    "countdown.days": "DAYS",
    "countdown.hours": "HOURS",
    "countdown.minutes": "MINUTES",
    "countdown.seconds": "SECONDS",
    "timeline.title": "A day<br /><em>to remember.</em>",
    "timeline.intro": "A gentle afternoon.<br />An evening filled with love.",
    "timeline.time1": "3<span>PM</span>",
    "timeline.time2": "5:15<span>PM</span><small>— 5:30 PM</small>",
    "timeline.time3": "6<span>PM</span>",
    "timeline.time4": "7<span>PM</span>",
    "timeline.time5": "7:30<span>PM</span>",
    "timeline.event1": "Intimate family ceremony",
    "timeline.event2": "Wedding guest arrival",
    "timeline.event3": "Engagement ceremony",
    "timeline.event4": "The couple’s dance",
    "timeline.event5": "Mingling & bouquet toss",
    "timeline.detail1": "A heartfelt moment with our nearest and dearest.",
    "timeline.detail2": "A warm welcome and beautiful moments together.",
    "timeline.detail3": "Join us as we make our promises to one another.",
    "timeline.detail4": "A dance to begin our life together.",
    "timeline.detail5": "More laughter, and a little luck.",
    "gallery.title": "Life is better <em>together.</em>",
    "gallery.intro": "Through sunshine and breezes.<br />Always, side by side.",
    "gallery.label1":
      '01 <i>Days of green</i> <svg class="inline-icon" aria-hidden="true" focusable="false"><use href="#arrow-up-right"></use></svg>',
    "gallery.label2":
      '02 <i>A promise</i> <svg class="inline-icon" aria-hidden="true" focusable="false"><use href="#arrow-up-right"></use></svg>',
    "gallery.label3":
      '03 <i>Our little haven</i> <svg class="inline-icon" aria-hidden="true" focusable="false"><use href="#arrow-up-right"></use></svg>',
    "gallery.label4":
      '04 <i>The little things</i> <svg class="inline-icon" aria-hidden="true" focusable="false"><use href="#arrow-up-right"></use></svg>',
    "gallery.label5":
      '05 <i>Under the same sky</i> <svg class="inline-icon" aria-hidden="true" focusable="false"><use href="#arrow-up-right"></use></svg>',
    "gallery.label6":
      '06 <i>Home, together</i> <svg class="inline-icon" aria-hidden="true" focusable="false"><use href="#arrow-up-right"></use></svg>',
    "venue.title": "Meet us in<br /><em>our garden of joy.</em>",
    "venue.hotel": "Hanoi Daewoo Hotel",
    "venue.space": "Serenity outdoor pool · Level 1",
    "venue.address":
      '<svg class="icon"><use href="#pin" /></svg> 360 Kim Mã, Giảng Võ, Hanoi',
    "venue.time":
      '<svg class="icon"><use href="#calendar" /></svg> Saturday, 7 November 2026 · Arrival 5:15–5:30 PM',
    "venue.directions":
      'Get directions <svg class="icon"><use href="#arrow" /></svg>',
    "venue.calendar":
      'Add to calendar <span><svg class="inline-icon" aria-hidden="true" focusable="false"><use href="#arrow-up-right"></use></svg></span>',
    "venue.map":
      'View hotel entrance map <span><svg class="inline-icon" aria-hidden="true" focusable="false"><use href="#arrow-up-right"></use></svg></span>',
    "dress.title": "Celebrate with us,<br /> <em>in beautiful colours.</em>",
    "dress.description":
      "Please wear elegant attire. Colourful outfits are welcome at our garden celebration.",
    "dress.note": "Please reserve white, beige and cream for the bride.",
    "rsvp.title": "Our day is complete,<br /><em>with our loved ones.</em>",
    "rsvp.honor": "Your presence would be a great honour to our families.",
    "rsvp.intro":
      "Please let us know if you can join us so our families can prepare a warm welcome. Thank you for all your love and wishes for Ly & Ngọc.",
    "rsvp.nojs":
      'Open the RSVP form <svg class="inline-icon" aria-hidden="true" focusable="false"><use href="#arrow-up-right"></use></svg>',
    "rsvp.eyebrow": "A NOTE FOR THE TWO OF US",
    "rsvp.name": "Full name",
    "rsvp.side": "You are:",
    "rsvp.brideGuest": "A guest of the bride’s family",
    "rsvp.groomGuest": "A guest of the groom’s family",
    "rsvp.attendance": "Will you be joining us?",
    "rsvp.yes": "Joyfully accepts",
    "rsvp.no": "Regretfully declines",
    "rsvp.guests": "Number of guests, including yourself",
    "rsvp.guest1": "1 guest",
    "rsvp.guest2": "2 guests",
    "rsvp.guest3": "3 guests",
    "rsvp.guest4": "4 guests",
    "rsvp.guest5": "5 guests",
    "rsvp.wish": "A little love for the happy couple",
    "rsvp.submit": 'Send RSVP <svg class="icon"><use href="#arrow" /></svg>',
    "rsvp.thanks": "Thank you for your love and warm wishes for Ly & Ngọc.",
    "gifts.title": "Wedding <em>gifts.</em>",
    "gifts.intro": "With heartfelt thanks for all your love for Ly & Ngọc.",
    "gifts.bride": "Bride’s family",
    "gifts.groom": "Groom’s family",
    "gifts.openBride": "View the bride’s QR image — Nguyễn Hương Ly",
    "gifts.openGroom": "View the groom’s QR image — Nguyễn Thế Ngọc",
    "gifts.altBride":
      "Wedding gift QR for the bride’s family — Nguyễn Hương Ly, TPBank",
    "gifts.altGroom":
      "Wedding gift QR for the groom’s family — Nguyễn Thế Ngọc, TPBank",
    "gifts.saveBride": "Save bride’s QR",
    "gifts.saveGroom": "Save groom’s QR",
    "rsvp.support":
      'Open the form if you need help <svg class="inline-icon" aria-hidden="true" focusable="false"><use href="#arrow-up-right"></use></svg>',
    "footer.message": "Your presence is an honour for our families.",
    "credits.open":
      'Photos & music <svg class="inline-icon" aria-hidden="true" focusable="false"><use href="#arrow-up-right"></use></svg>',
    "credits.title": "Photos & music",
    "credits.photo": "Wedding photography: XOÀI STUDIO · Ly & Ngọc.",
    "credits.music": "Background music: “Giải cứu thế giới” · Full Demo.",
    "credits.listen":
      'Listen on YouTube <svg class="inline-icon" aria-hidden="true" focusable="false"><use href="#arrow-up-right"></use></svg>',
    "credits.art":
      "Monogram and illustrations from Ly & Ngọc’s wedding stationery.",
    "a11y.brand": "Thế Ngọc and Hương Ly, back to top",
    "a11y.nav": "Main navigation",
    "a11y.mobileNav": "Mobile navigation",
    "a11y.hero": "Moments shared by Hương Ly and Thế Ngọc",
    "alt.cover": "Thế Ngọc and Hương Ly standing together beneath the trees",
    "alt.sky": "The couple holding hands in a meadow under a blue sky",
    "alt.hotel":
      "Illustration of Hanoi Daewoo Hotel from the wedding invitation",
    "a11y.countdown": "Time until the wedding reception",
    "alt.venue": "Illustration of the garden and pool at Hanoi Daewoo Hotel",
    "a11y.swatches":
      "Suggested colours: navy, light blue, olive, pink and gold",
    "rsvp.namePlaceholder": "Please enter your full name",
    "rsvp.wishPlaceholder": "Your wishes for the happy couple…",
    "rsvp.receiptTitle": "RSVP submission result from Google Forms",
    "alt.closing": "A sunlit meadow from the couple’s wedding album",
    "a11y.lightbox": "Wedding photo gallery",
    "a11y.closePhoto": "Close photo",
    "a11y.prev": "Previous photo",
    "a11y.next": "Next photo",
    "a11y.map": "Hanoi Daewoo Hotel entrance map",
    "a11y.closeMap": "Close map",
    "alt.map":
      "Entrance from Kim Mã, with car and motorbike parking marked on the wedding invitation map",
    "a11y.closeCredits": "Close credits",
    "gallery.caption1": "Together on a day of green.",
    "gallery.alt1": "Hương Ly and Thế Ngọc together beneath a wedding veil",
    "gallery.open1":
      "View photo 1: Hương Ly and Thế Ngọc together beneath a wedding veil",
    "gallery.caption2": "Hand in hand, through the everyday.",
    "gallery.alt2": "The couple holding hands in the warm garden light",
    "gallery.open2":
      "View photo 2: The couple holding hands in the warm garden light",
    "gallery.caption3": "A gentle breeze, a lifetime of love.",
    "gallery.alt3": "Thế Ngọc embracing Hương Ly in her blue dress in a meadow",
    "gallery.open3":
      "View photo 3: Thế Ngọc embracing Hương Ly in her blue dress in a meadow",
    "gallery.caption4": "Every little thing becomes special.",
    "gallery.alt4":
      "A close-up of the wedding bouquet and the couple’s outfits",
    "gallery.open4":
      "View photo 4: A close-up of the wedding bouquet and the couple’s outfits",
    "gallery.caption5": "Together, under the same sky.",
    "gallery.alt5":
      "Hương Ly and Thế Ngọc holding hands beneath a wide blue sky",
    "gallery.open5":
      "View photo 5: Hương Ly and Thế Ngọc holding hands beneath a wide blue sky",
    "gallery.caption6": "Finding our way home, together.",
    "gallery.alt6": "Hương Ly in her wedding dress along a sunlit garden path",
    "gallery.open6":
      "View photo 6: Hương Ly in her wedding dress along a sunlit garden path",
    "page.title": "Thế Ngọc & Hương Ly — 7 November 2026",
    "language.label": "Choose language",
    "menu.open": "Open menu",
    "menu.close": "Close menu",
    "music.play": "Play Giải cứu thế giới",
    "music.pause": "Pause Giải cứu thế giới",
    "music.error": "Music could not load · tap to retry",
    "music.blocked": "Tap the invitation to enjoy the music",
    "music.paused": "Paused · tap to listen",
    "countdown.arrived": "Our wedding day is here.",
    "calendar.title": "The wedding of Thế Ngọc & Hương Ly",
    "calendar.location":
      "Serenity outdoor pool, Level 1, Hanoi Daewoo Hotel, 360 Kim Mã, Giảng Võ, Hanoi, Vietnam",
    "calendar.description":
      "3:00 PM: Intimate family ceremony. 5:15–5:30 PM: Wedding guest arrival. 6:00 PM: Engagement ceremony. 7:00 PM: The couple’s dance. 7:30 PM: Mingling and bouquet toss. All times are Vietnam time (UTC+7).",
    "calendar.reminder": "Celebrate with Ly & Ngọc tomorrow!",
    "calendar.saved":
      "Open the downloaded calendar file to save our wedding date.",
    "rsvp.unavailable":
      "RSVP is currently unavailable. Please try again later.",
    "rsvp.requiredName": "Please enter your full name.",
    "rsvp.requiredSide":
      "Please select the bride’s family or the groom’s family.",
    "rsvp.offline":
      "You are offline. Your details are still in the form; please try again when you are connected.",
    "rsvp.sending": "Sending your RSVP…",
    "rsvp.result":
      "Please check the result below. Google’s message “Lời xác nhận tham dự đã được ghi nhận” means “Your RSVP has been received.”",
    "rsvp.timeout":
      "The result is taking longer to load. Please check the panel below before submitting again.",
  },
};
(function () {
  "use strict";
  const languageKey = "ly-ngoc-language-v1";
  const query = new URLSearchParams(location.search);
  let saved;
  try {
    saved = localStorage.getItem(languageKey);
  } catch {
    /* Private browsing. */
  }
  const valid = (value) => value === "vi" || value === "en";
  let current = valid(query.get("lang"))
    ? query.get("lang")
    : valid(saved)
      ? saved
      : "vi";
  const translate = (key) =>
    translations[current][key] ?? translations.vi[key] ?? key;
  const attributes = [
    "aria-label",
    "alt",
    "placeholder",
    "title",
    "data-caption",
  ];
  function applyLanguage(language, persist = true) {
    if (!valid(language)) return;
    current = language;
    document.documentElement.lang = current;
    document.title = translate("page.title");
    document.querySelectorAll("[data-i18n]").forEach((element) => {
      if (element.dataset.personalized === "true") return;
      // Only bundled, trusted translations are inserted as HTML. Guest input is never interpolated here.
      const value = translate(element.dataset.i18n);
      if (element.innerHTML !== value) element.innerHTML = value;
    });
    for (const attribute of attributes) {
      document
        .querySelectorAll("[data-i18n-" + attribute + "]")
        .forEach((element) => {
          element.setAttribute(
            attribute,
            translate(element.getAttribute("data-i18n-" + attribute)),
          );
        });
    }
    document.querySelectorAll("[data-language]").forEach((button) => {
      button.setAttribute(
        "aria-pressed",
        String(button.dataset.language === current),
      );
    });
    if (persist) {
      try {
        localStorage.setItem(languageKey, current);
      } catch {
        /* The switch still works without storage. */
      }
      try {
        const url = new URL(location.href);
        url.searchParams.set("lang", current);
        history.replaceState(null, "", url);
      } catch {
        /* Language selection also works in restricted embedded previews. */
      }
    }
    document.dispatchEvent(
      new CustomEvent("wedding:languagechange", {
        detail: { language: current },
      }),
    );
  }
  window.WEDDING_I18N = Object.freeze({
    get language() {
      return current;
    },
    t: translate,
    setLanguage: applyLanguage,
  });
  document.querySelectorAll("[data-language]").forEach((button) => {
    button.addEventListener("click", () =>
      applyLanguage(button.dataset.language),
    );
  });
  applyLanguage(current, false);
})();
